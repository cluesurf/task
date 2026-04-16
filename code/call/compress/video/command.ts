import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildCommandToCompressVideo(input: {
  inputPath: string
  outputPath: string
  crf?: string
  preset?: string
}) {
  const cmd = getCommand('ffmpeg')
  cmd.link.push(
    '-y',
    '-i',
    input.inputPath,
    '-c:v',
    'libx264',
    '-crf',
    input.crf ?? '28',
    '-preset',
    input.preset ?? 'medium',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    input.outputPath,
  )
  return buildCommandSequence(cmd)
}
