/**
 * `task disassemble jvm` — `.class` / `.jar` entry → bytecode
 * listing via `javap`. JDK ships it; just route.
 */

import { writeOutputOrStdout } from '~/code/tool/node/file'
import { spawnAndCapture } from '~/code/tool/node/spawn'
import { buildCommandToDisassembleJvm } from './command'
import {
  parseDisassembleJvmNode,
  testDisassembleJvmNode,
  type DisassembleJvmNodeInput,
  type DisassembleJvmNodeOutput,
} from './shared'

export type { DisassembleJvmNodeInput, DisassembleJvmNodeOutput }
export { testDisassembleJvmNode }

export async function disassembleJvmNode(
  source: DisassembleJvmNodeInput,
): Promise<DisassembleJvmNodeOutput> {
  const src = parseDisassembleJvmNode(source)
  const command = buildCommandToDisassembleJvm(src)
  const text = await spawnAndCapture({
    verb: 'disassemble jvm',
    bin: command.bin,
    args: command.args,
  })

  return writeOutputOrStdout({ text, outputPath: src.output })
}
