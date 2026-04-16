/**
 * `task get duration <file>` -- ffprobe wrapper that returns the
 * duration of the file's first audio (or video) stream.
 *
 * The CLI spinner consumes the structured return. The formatted
 * value is also written to stdout so shell pipelines work cleanly:
 *
 *   ms=$(task get duration song.mp3)
 *   formatted=$(task get duration song.mp3 --unit clock)
 */

import type { GetDurationNodeLocalInput } from '~/code/form/action/get/duration/node'
import {
  GetDurationNodeInputParser,
  GetDurationNodeLocalInputParser,
  GetDurationNodeOutputParser,
} from '~/code/form/action/get/duration/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndCapture } from '~/code/tool/node/spawn'
import { buildFfprobeDurationCommand } from './command'

async function runLocal(input: GetDurationNodeLocalInput) {
  const filePath = input.input.file.path
  const stream = input.video ? 'v:0' : 'a:0'

  const command = buildFfprobeDurationCommand({
    filePath,
    stream,
  })
  const stdout = await spawnAndCapture({
    verb: 'get duration',
    bin: command.bin,
    args: command.args,
  })
  const seconds = Number.parseFloat(stdout.trim())
  if (!Number.isFinite(seconds)) {
    throw new Error(
      `ffprobe returned no duration for "${filePath}" -- ` +
        `is it a valid ${input.video ? 'video' : 'audio'} file?`,
    )
  }

  const durationMs = Math.round(seconds * 1000)
  const unit = input.unit ?? 'ms'
  const formatted = formatDuration(durationMs, unit)

  process.stdout.write(formatted + '\n')

  return { file: { path: filePath } }
}

function formatDuration(
  ms: number,
  unit: 'ms' | 's' | 'clock',
): string {
  switch (unit) {
    case 'ms':
      return String(ms)
    case 's':
      return (ms / 1000).toFixed(3)
    case 'clock': {
      const totalSeconds = Math.floor(ms / 1000)
      const minutes = Math.floor(totalSeconds / 60)
      const seconds = totalSeconds % 60
      const millis = ms % 1000
      return (
        `${minutes}:` +
        `${String(seconds).padStart(2, '0')}.` +
        `${String(millis).padStart(3, '0')}`
      )
    }
  }
}

const [getDurationNode, testGetDurationNode] = createNodeHandler({
  parsers: {
    input: GetDurationNodeInputParser,
    local: GetDurationNodeLocalInputParser,
    output: GetDurationNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default getDurationNode
export { getDurationNode, testGetDurationNode }
