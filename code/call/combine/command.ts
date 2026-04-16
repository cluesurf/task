/**
 * Pure ffmpeg argv builder for `task combine`. The `scale`
 * filter rounds odd dimensions down to the nearest even pixel
 * because libx264's `yuv420p` profile requires both axes to be
 * `mod 2` -- without it odd PNG / JPG sources fail with `width
 * not divisible by 2`.
 */

export type BuildCombineCommandInput = {
  image: string
  audio: string
  output: string
  videoCodec?: string
  audioCodec?: string
  audioBitrate?: string
  sampleRate?: number
  pixelFormat?: string
  tune?: string
}

export function buildCommandToCombine({
  image,
  audio,
  output,
  videoCodec = 'libx264',
  audioCodec = 'aac',
  audioBitrate = '256k',
  sampleRate = 48000,
  pixelFormat = 'yuv420p',
  tune = 'stillimage',
}: BuildCombineCommandInput): { bin: 'ffmpeg'; args: string[] } {
  const args = [
    '-nostdin',
    '-y',
    '-loop',
    '1',
    '-i',
    image,
    '-i',
    audio,
    '-c:v',
    videoCodec,
    '-tune',
    tune,
    '-vf',
    'scale=trunc(iw/2)*2:trunc(ih/2)*2',
    '-c:a',
    audioCodec,
    '-b:a',
    audioBitrate,
    '-ar',
    String(sampleRate),
    '-pix_fmt',
    pixelFormat,
    '-shortest',
    output,
  ]
  return { bin: 'ffmpeg', args }
}
