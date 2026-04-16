/**
 * `task disassemble radare` — scripted `radare2` / `rizin` session.
 * Preset profiles hide the scripting from users who just want
 * a canned output.
 */

import fs from 'node:fs/promises'
import type { DisassembleRadareNodeLocalInput } from '~/code/form/action/disassemble/radare/node'
import {
  DisassembleRadareNodeInputParser,
  DisassembleRadareNodeLocalInputParser,
  DisassembleRadareNodeOutputParser,
} from '~/code/form/action/disassemble/radare/node/take'
import { writeOutputOrStdout } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndCapture } from '~/code/tool/node/spawn'
import {
  RADARE_PROFILES,
  buildCommandToDisassembleRadare,
  type RadareProfile,
} from './command'

async function runLocal(input: DisassembleRadareNodeLocalInput) {
  const inputPath = input.input.file.path
  const commands = input.script
    ? (await fs.readFile(input.script, 'utf8'))
        .split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('#'))
    : input.commands && input.commands.length
      ? input.commands
      : RADARE_PROFILES[(input.profile ?? 'full') as RadareProfile]

  const command = buildCommandToDisassembleRadare({
    inputPath,
    tool: input.tool,
    commands,
  })
  const text = await spawnAndCapture({
    verb: 'disassemble radare',
    bin: command.bin,
    args: command.args,
  })
  return writeOutputOrStdout({
    text,
    outputPath: input.output?.file?.path,
  })
}

const [disassembleRadareNode, testDisassembleRadareNode] =
  createNodeHandler({
    parsers: {
      input: DisassembleRadareNodeInputParser,
      local: DisassembleRadareNodeLocalInputParser,
      output: DisassembleRadareNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export { disassembleRadareNode, testDisassembleRadareNode }
