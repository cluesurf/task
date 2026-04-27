import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToTraceProcessProcmon,
  type TraceProcessProcmonCommandInput,
} from './command'

export type TraceProcessProcmonNodeInput = TraceProcessProcmonCommandInput

async function traceProcessProcmonNode(
  source: TraceProcessProcmonNodeInput,
): Promise<void> {
  const command = buildCommandToTraceProcessProcmon(source)
  await spawnAndWait({
    verb: 'trace process',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })
}

export default traceProcessProcmonNode
export { traceProcessProcmonNode }
