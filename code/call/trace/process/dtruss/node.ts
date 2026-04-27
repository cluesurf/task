import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToTraceProcessDtruss,
  type TraceProcessDtrussCommandInput,
} from './command'

export type TraceProcessDtrussNodeInput = TraceProcessDtrussCommandInput

async function traceProcessDtrussNode(
  source: TraceProcessDtrussNodeInput,
): Promise<void> {
  const command = buildCommandToTraceProcessDtruss(source)
  await spawnAndWait({
    verb: 'trace process',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })
}

export default traceProcessDtrussNode
export { traceProcessDtrussNode }
