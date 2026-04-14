/**
 * `task disassemble radare` — scripted `radare2` / `rizin` session.
 *
 * `-q -c "<cmd>"` runs a single r2/rz command and exits. We either
 * take a user-supplied `--script` (path to a `.r2` file with one
 * command per line) or fall back to a useful default dump:
 *   `aaa` (analyze all), `afl` (list functions), `pdf` on entry0.
 *
 * Preset profiles (`--profile functions | calls | strings`) hide
 * the scripting from users who just want a canned output.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

export type RadareTool = 'radare2' | 'rizin'
export type DisassembleRadareNodeInput = {
  input: string
  output?: string
  tool?: RadareTool
  script?: string
  profile?: 'functions' | 'calls' | 'strings' | 'full'
  commands?: string[]
}

export type DisassembleRadareNodeOutput = { file?: { path: string } }

const PROFILES: Record<string, string[]> = {
  functions: ['aaa', 'afl'],
  calls:     ['aaa', 'agCd'],                       // call-graph in dot
  strings:   ['aaa', 'izq'],
  full:      ['aaa', 'afl', 'izq', 's entry0', 'pdf'],
}

export async function disassembleRadareNode(
  src: DisassembleRadareNodeInput,
): Promise<DisassembleRadareNodeOutput> {
  const bin = src.tool ?? 'radare2'

  const commands = src.script
    ? (await fs.readFile(src.script, 'utf8'))
        .split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('#'))
    : src.commands && src.commands.length
      ? src.commands
      : PROFILES[src.profile ?? 'full']!

  const joined = commands.join(';') + ';q'
  const args = ['-q', '-c', joined, src.input]

  const text = await runCapture(bin, args)

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
          ? `disassemble radare: \`${cmd}\` not found. Install via \`brew install radare2\` / \`brew install rizin\`.`
          : `disassemble radare: ${cmd} failed — ${err.message}`,
      ))
    })
    child.on('exit', code => {
      if (code === 0) resolve(Buffer.concat(chunks).toString('utf8'))
      else reject(new Error(`disassemble radare: ${cmd} exited with code ${code}`))
    })
  })
}
