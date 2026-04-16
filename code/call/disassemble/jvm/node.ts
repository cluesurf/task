/**
 * `task disassemble jvm` — `.class` / `.jar` entry → bytecode
 * listing via `javap`. JDK ships it; just route.
 */

import type { DisassembleJvmNodeLocalInput } from '~/code/form/action/disassemble/jvm/node'
import {
  DisassembleJvmNodeInputParser,
  DisassembleJvmNodeLocalInputParser,
  DisassembleJvmNodeOutputParser,
} from '~/code/form/action/disassemble/jvm/node/take'
import { writeOutputOrStdout } from '~/code/tool/node/file'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndCapture } from '~/code/tool/node/spawn'
import { buildCommandToDisassembleJvm } from './command'

async function runLocal(input: DisassembleJvmNodeLocalInput) {
  const command = buildCommandToDisassembleJvm({
    inputPath: input.input.file.path,
    level: input.level,
    verbose: input.verbose,
    constants: input.constants,
    lineNumbers: input.lineNumbers,
    classpath: input.classpath,
    className: input.className,
  })
  const text = await spawnAndCapture({
    verb: 'disassemble jvm',
    bin: command.bin,
    args: command.args,
  })
  return writeOutputOrStdout({
    text,
    outputPath: input.output?.file?.path,
  })
}

const [disassembleJvmNode, testDisassembleJvmNode] =
  createNodeHandler({
    parsers: {
      input: DisassembleJvmNodeInputParser,
      local: DisassembleJvmNodeLocalInputParser,
      output: DisassembleJvmNodeOutputParser,
    },
    resolvers: {
      external: resolveExternalInput,
      internal: resolveInternalInput,
    },
    runLocal,
  })

export { disassembleJvmNode, testDisassembleJvmNode }
