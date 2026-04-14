/**
 * `task disassemble jvm` — `.class` / `.jar` entry → bytecode
 * listing via `javap`. JDK ships it; just route.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

export type DisassembleJvmNodeInput = {
  input: string
  output?: string
  level?: 'public' | 'protected' | 'package' | 'private'
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}

export type DisassembleJvmNodeOutput = { file?: { path: string } }

export async function disassembleJvmNode(
  src: DisassembleJvmNodeInput,
): Promise<DisassembleJvmNodeOutput> {
  const args: string[] = []

  switch (src.level) {
    case 'public':    args.push('-public'); break
    case 'protected': args.push('-protected'); break
    case 'package':   args.push('-package'); break
    case 'private':   args.push('-p'); break
    default:          args.push('-p'); break
  }
  if (src.verbose) args.push('-v')
  if (src.constants) args.push('-constants')
  if (src.lineNumbers) args.push('-l')
  if (src.classpath) args.push('-classpath', src.classpath)

  // Input can be a file path (.class) or a fully-qualified class
  // name. If it looks like a file, pass as-is; otherwise treat as
  // a class name (requires --classpath).
  if (src.className) args.push(src.className)
  else args.push(src.input)

  const text = await runCapture('javap', args)

  if (src.output) {
    await fs.mkdir(path.dirname(src.output), { recursive: true })
    await fs.writeFile(src.output, text, 'utf8')
    return { file: { path: src.output } }
  }
  process.stdout.write(text)
  return {}
}

function runCapture(cmd: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'inherit'] })
    child.stdout!.on('data', (b: Buffer) => chunks.push(b))
    child.on('error', err => {
      reject(new Error(
        (err as NodeJS.ErrnoException).code === 'ENOENT'
          ? `disassemble jvm: \`${cmd}\` not found. Install a JDK (e.g. \`brew install openjdk\`).`
          : `disassemble jvm: ${cmd} failed — ${err.message}`,
      ))
    })
    child.on('exit', code => {
      if (code === 0) resolve(Buffer.concat(chunks).toString('utf8'))
      else reject(new Error(`disassemble jvm: javap exited with code ${code}`))
    })
  })
}
