import child_process from 'child_process'
import { CustomError } from 'ts-custom-error'
import {
  getTrace,
  printTraceLine,
  printTraceOutput,
} from './log/trace'

export type ChildProcessErrorData = {
  error: Error
  stdout?: string
  stderr?: string
}

export class ChildProcessError extends CustomError {
  data: ChildProcessErrorData

  constructor(data: ChildProcessErrorData) {
    super(data.error.message)
    this.data = data
  }
}

export function exec(
  list: Array<string>,
): Promise<{ stdout: string; stderr: string }> {
  const command = list[0]!
  const args = list.slice(1)
  const cleanArgs = args.map(stripWrappingQuotes)
  const trace = getTrace()

  // --explain mode: print the command we'd run and return empty
  // output. Callers that shape return values from stdout won't
  // get real data here — that's the point of a dry run.
  if (trace.mode === 'explain') {
    printTraceLine([command, ...cleanArgs])
    return Promise.resolve({ stdout: '', stderr: '' })
  }

  return new Promise(function (resolve, reject) {
    // No `shell: true`: our commands build argv arrays, so there's
    // nothing to expand. Node 22.12 deprecated the combo because
    // argv isn't shell-escaped; bypassing the shell is safer AND
    // silences DEP0190.
    //
    // Legacy command builders sometimes wrap arg values in literal
    // double or single quotes (a holdover from the shell-mode era).
    // Strip those off so the wrapped binary doesn't see quote chars
    // in its filenames.
    if (trace.mode === 'log') printTraceLine([command, ...cleanArgs])
    const child = child_process.spawn(command, cleanArgs)

    const stdout: Array<string> = []
    let stdoutCarry = ''
    child.stdout.setEncoding('utf-8')
    child.stdout.on('data', data => {
      stdout.push(data)
      if (trace.mode === 'log') {
        stdoutCarry = flushLines(stdoutCarry + data, printTraceOutput)
      }
    })

    const stderr: Array<string> = []
    let stderrCarry = ''
    child.stderr.setEncoding('utf-8')
    child.stderr.on('data', data => {
      stderr.push(data)
      if (trace.mode === 'log') {
        stderrCarry = flushLines(stderrCarry + data, printTraceOutput)
      }
    })

    child.on('error', error => {
      reject(
        new ChildProcessError({
          error,
          stdout: stdout.join('').trim(),
          stderr: stderr.join('').trim(),
        }),
      )
    })

    child.on('close', code => {
      const stdoutText = stdout.join('').trim()
      const stderrText = stderr.join('').trim()
      if (code !== 0) {
        reject(
          new ChildProcessError({
            error: new Error(
              `Command \`${command}\` exited with code ${code}` +
                (stderrText ? `: ${stderrText}` : ''),
            ),
            stdout: stdoutText,
            stderr: stderrText,
          }),
        )
        return
      }
      resolve({ stdout: stdoutText, stderr: stderrText })
    })
  })
}

/**
 * Stream-aware line splitter for --log mode. Pushes complete
 * lines to `onLine` and returns the unfinished tail so the next
 * chunk can continue it.
 */
function flushLines(buf: string, onLine: (l: string) => void): string {
  const parts = buf.split('\n')
  const tail = parts.pop() ?? ''
  for (const p of parts) onLine(p)
  return tail
}

function stripWrappingQuotes(arg: string): string {
  if (
    arg.length >= 2 &&
    ((arg.startsWith('"') && arg.endsWith('"')) ||
      (arg.startsWith("'") && arg.endsWith("'")))
  ) {
    return arg.slice(1, -1)
  }
  return arg
}

export type Message = {
  form: 'rise' | 'fall'
  text?: string
  link?: Record<string, any>
}

export function spawn(
  args: Array<string>,
  onOutput?: (msg: Message) => void,
) {
  const command = args.shift()!
  return new Promise((res, rej) => {
    const child = child_process.spawn(command, args)
    child.stderr.setEncoding('utf-8')
    let error = false
    child.stderr.on('data', text => {
      error = true
      onOutput?.({ form: 'fall', text })
    })
    child.stdout.setEncoding('utf-8')
    child.stdout.on('data', text => {
      onOutput?.({ form: 'rise', text })
    })

    child.on('error', rej)
    child.on('close', () => {
      if (error) {
        rej(new Error(`Process error.`))
      } else {
        res(undefined)
      }
    })
  })
}
