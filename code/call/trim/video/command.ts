import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildCommandToTrimVideo(input: {
  inputPath: string
  outputPath: string
  start?: string
  end?: string
  duration?: string
  reencode?: boolean
}) {
  const cmd = getCommand('ffmpeg')
  cmd.link.push('-y', '-i', input.inputPath)
  if (input.start) cmd.link.push('-ss', input.start)
  if (input.end) cmd.link.push('-to', input.end)
  if (input.duration && !input.end)
    cmd.link.push('-t', input.duration)
  if (!input.reencode) cmd.link.push('-c', 'copy')
  cmd.link.push(input.outputPath)
  return buildCommandSequence(cmd)
}
