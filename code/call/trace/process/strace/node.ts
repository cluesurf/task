import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToTraceProcessStrace,
  type TraceProcessStraceCommandInput,
} from './command'

export type TraceProcessStraceNodeInput = TraceProcessStraceCommandInput

async function traceProcessStraceNode(
  source: TraceProcessStraceNodeInput,
): Promise<void> {
  const command = buildCommandToTraceProcessStrace(source)
  await spawnAndWait({
    verb: 'trace process',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })
}

export default traceProcessStraceNode
export { traceProcessStraceNode }
