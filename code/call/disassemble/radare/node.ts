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
import { writeOutputOrStdout } from '~/code/tool/node/file'
import { spawnAndCapture } from '~/code/tool/node/spawn'
import { buildCommandToDisassembleRadare } from './command'
import {
  RADARE_PROFILES,
  parseDisassembleRadareNode,
  testDisassembleRadareNode,
  type DisassembleRadareNodeInput,
  type DisassembleRadareNodeOutput,
} from './shared'

export type {
  DisassembleRadareNodeInput,
  DisassembleRadareNodeOutput,
}
export { testDisassembleRadareNode }

export async function disassembleRadareNode(
  source: DisassembleRadareNodeInput,
): Promise<DisassembleRadareNodeOutput> {
  const src = parseDisassembleRadareNode(source)
  const commands = src.script
    ? (await fs.readFile(src.script, 'utf8'))
        .split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('#'))
    : src.commands && src.commands.length
      ? src.commands
      : RADARE_PROFILES[src.profile ?? 'full']

  const command = buildCommandToDisassembleRadare(src, commands)
  const text = await spawnAndCapture({
    verb: 'disassemble radare',
    bin: command.bin,
    args: command.args,
  })

  return writeOutputOrStdout({ text, outputPath: src.output })
}
