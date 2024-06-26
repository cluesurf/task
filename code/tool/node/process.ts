import child_process from 'child_process'
import { CustomError } from 'ts-custom-error'

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
  const command = list[0] as string
  const args = list.slice(1)

  return new Promise(function (resolve, reject) {
    const child = child_process.spawn(command, args, { shell: true })

    const stdout: Array<string> = []
    child.stdout.setEncoding('utf-8')
    child.stdout.on('data', data => {
      stdout.push(data)
    })

    const stderr: Array<string> = []
    child.stderr.setEncoding('utf-8')
    child.stderr.on('data', data => {
      stderr.push(data)
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

    child.on('close', () => {
      resolve({
        stdout: stdout.join('').trim(),
        stderr: stderr.join('').trim(),
      })
    })
  })
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
  const command = args.shift() as string
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
