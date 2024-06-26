import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { IOPath } from '~/code/type'
import {
  ConvertMp4ToGifWithFfmpegParser,
  ConvertVideoWithFfmpegCommandInput,
  FfmpegCodecAudio,
} from '~/code/type/shared/parser'

// ffmpeg -filters
// https://ffmpeg.org/ffmpeg-filters.html
// https://opensource.com/article/17/6/ffmpeg-convert-media-file-formats
// -ss 00:01:00 (HOURS:MM:SS.MILLISECONDS)
// You can also use the -an and -sn flags in the same manner to strip out audio and subtitle streams.
// https://img.ly/blog/ultimate-guide-to-ffmpeg/#example-material
// https://ottverse.com/change-resolution-resize-scale-video-using-ffmpeg/
// https://creatomate.com/blog/how-to-change-the-resolution-of-a-video-using-ffmpeg
// https://creatomate.com/blog/use-nodejs-to-generate-instagram-youtube-or-tiktok-videos
// -q:a
// wav to mp3
// ffmpeg -i audio.wav -acodec libmp3lame audio.mp3
// ogg to mp3
// ffmpeg -i audio.ogg -acodec libmp3lame audio.mp3
// ac3 to mp3
// ffmpeg -i audio.ac3 -acodec libmp3lame audio.mp3
// aac to mp3
// ffmpeg -i audio.aac -acodec libmp3lame audio.mp3
// crop: -filter:v "crop=w:h:x:y"
// add audio to video:
// ffmpeg -i audio.mp3 -i video.mp4 video_audio_mix.mkv
// concat videos
// ffmpeg -f concat -i file-list.txt -c copy output.mp4
// speed up video
// ffmpeg -i input.mp4 -vf "setpts=0.5*PTS" output.mp4
// compress video
// ffmpeg -i input.mp4 -vf scale=1280:-1 -c:v libx264 -preset veryslow -crf 24 output.mp4
// zoom in:
// "scale=2*iw:-1, crop=iw/2:ih/2"
// loop
// Use -1 for an infinite loop.
// ffmpeg -stream_loop 2 -i input.mp4 -c copy output.mp4
// copy metadata
// ffmpeg -i input.mov -map_metadata 0 -movflags use_metadata_tags output.mp4
// add subtitles
// convert image to video
// ffmpeg -loop 1 -i input.png -c:v libx264 -t 30 -pix_fmt yuv420p video.mp4
// change volume
// ffmpeg -i input.mp3 -af 'volume=0.5' output.mp3
// increase audio tempo
// ffmpeg -i input.mp3 -filter:a "atempo=2.0" -vn output.mp3
// add image to audio
// ffmpeg -loop 1 -i image.jpg -i input.mp3 -c:v libx264 -c:a aac -strict experimental -b:a 192k -shortest output.mp4
// encode for iphone
// ffmpeg -i source_video.avi input -acodec aac -ab 128kb -vcodec mpeg4 -b 1200kb -mbd 2 -flags +4mv+trell -aic 2 -cmp 2 -subcmp 2 -s 320x180 -title X final_video.mp4
// extract sound from video
// ffmpeg -i source_video.avi -vn -ar 44100 -ac 2 -ab 192k -f mp3 sound.mp3
// https://catswhocode.com/ffmpeg-commands/
export async function buildCommandToConvertVideoWithFfmpeg(
  input: ConvertVideoWithFfmpegCommandInput,
) {
  let {
    input: i,
    output,
    audioCodec,
    videoCodec,
    audioBitRate,
    videoBitRate,
    frameRate,
    startTime,
    endTime,
    strict,
    scaleWidth,
    scaleHeight,
    audioChannels,
    audioSamplingFrequency,
    subtitleCodec,
    duration,
    rotation,
    overwrite,
    progress,
  } = input

  const cmd = getCommand(`ffmpeg`)

  cmd.link.push(`-loglevel`, 'error', `-hide_banner`)

  if (overwrite) {
    cmd.link.push(`-y`)
  } else {
    cmd.link.push(`-n`, `-nostdin`)
  }

  if (progress) {
    cmd.link.push(`-stats`, `-progress`, `-`)
  }

  cmd.link.push(`-i`, `${i.file.path}`)

  if (startTime) {
    cmd.link.push(`-ss`, `${startTime}`)
  }

  if (endTime) {
    cmd.link.push(`-to`, `${endTime}`)
  }

  if (duration) {
    cmd.link.push(`-t`, `${duration}`)
  }

  if (strict) {
    cmd.link.push(`-strict`, `${strict}`)
  }

  if (audioChannels) {
    cmd.link.push(`-ac`, `${audioChannels}`)
  }

  if (audioSamplingFrequency) {
    cmd.link.push(`-ar`, `${audioSamplingFrequency}`)
  }

  if (scaleWidth) {
    if (scaleHeight) {
      cmd.link.push(`-filter:v`, `"scale=${scaleWidth}:${scaleHeight}"`)
    } else {
      cmd.link.push(`-filter:v`, `"scale=${scaleWidth}:-1"`)
    }
  } else if (scaleHeight) {
    cmd.link.push(`-filter:v`, `"scale=-1:${scaleHeight}"`)
  } else if (rotation) {
    cmd.link.push(`-filter:v`, `"rotate=${rotation}`)
  }

  if (audioBitRate) {
    cmd.link.push(`-b:a`, `${audioBitRate}`)
  }

  if (videoBitRate) {
    cmd.link.push(`-b:v`, `${videoBitRate}`)
  }

  if (frameRate) {
    cmd.link.push(`-r`, `${frameRate}`)
  }

  if (videoCodec) {
    cmd.link.push(`-c:v`, `${videoCodec}`)
  }

  if (audioCodec) {
    cmd.link.push(`-c:a`, `${audioCodec}`)
  }

  if (subtitleCodec) {
    cmd.link.push(`-s:a`, `${subtitleCodec}`)
  }

  cmd.link.push(`${output.file.path}`)

  return buildCommandSequence(cmd)
}

export async function buildCommandToCompressVideoWithFfmpeg() {}

export async function buildCommandToConvertMP4ToGifWithFfmpeg(source) {
  const input = ConvertMp4ToGifWithFfmpegParser().parse(source)

  const { fps, width, startTime, endTime, duration } = input

  let cmd = [
    `ffmpeg`,
    `-y`,
    `-loglevel`,
    `error`,
    `-hide_banner`,
    `-nostats`,
    `-i`,
    `"${input.input.file.path}"`,
  ]

  if (startTime) {
    cmd.push(`-ss`, `${startTime}`)
  }

  if (endTime) {
    cmd.push(`-to`, `${endTime}`)
  }

  if (duration) {
    cmd.push(`-t`, `${duration}`)
  }

  cmd.push(
    `-vf`,
    `"fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"`,
    `-loop`,
    `0`,
    `"${input.output.file.path}"`,
  )

  return [cmd]
}

// convert gif into video
// ffmpeg -stream_loop 100 -i fire.gif -movflags faststart -pix_fmt yuv420p fire.mp4

export async function addAudioToVideoWithFfmpeg({
  inputVideoPath,
  inputAudioPath,
  outputPath,
  audioCodec = 'aac',
  fit,
}: {
  inputVideoPath: string
  inputAudioPath: string
  outputPath: string
  fit?: boolean
  audioCodec?: FfmpegCodecAudio
}) {
  return [
    `ffmpeg -y -loglevel error -hide_banner -nostats -i "${inputVideoPath}" -i "${inputAudioPath}" ${
      fit ? '-shortest ' : ''
    } -c:v copy -c:a ${audioCodec} "${outputPath}"`,
  ]
}

export async function convertVideoToAudioWithFfmpeg({
  inputPath,
  outputPath,
}: IOPath) {
  // output.mp3
  return [`ffmpeg -i "${inputPath}" -vn ${outputPath}`]
}

export async function removeAudioFromVideoWithFfmpeg({
  inputPath,
  outputPath,
}: IOPath) {
  // output.mp3
  return [`ffmpeg -i "${inputPath}" -c copy -an ${outputPath}`]
}

// export async function compressMP4WithFfmpeg(source) {
//   return CompressMp4WithFfmpegParser().parse(source)
// }
