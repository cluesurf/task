import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildCommandToTrimAudio(input: {
  inputPath: string
  outputPath: string
  start?: string
  end?: string
  duration?: string
}) {
  const cmd = getCommand('ffmpeg')
  cmd.link.push('-y', '-i', input.inputPath)
  if (input.start) cmd.link.push('-ss', input.start)
  if (input.end) cmd.link.push('-to', input.end)
  if (input.duration && !input.end)
    cmd.link.push('-t', input.duration)
  cmd.link.push('-c', 'copy', input.outputPath)
  return buildCommandSequence(cmd)
}
