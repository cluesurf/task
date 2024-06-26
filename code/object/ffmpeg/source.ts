import { Form, Hash, List } from '@termsurf/form'
import FFMPEG_CODEC_AUDIO from './ffmpeg.codecs.audio.keys.json' assert { type: 'json' }
import FFMPEG_CODEC_CONTENT from './ffmpeg.codecs.json' assert { type: 'json' }
import FFMPEG_CODEC_SUBTITLE from './ffmpeg.codecs.subtitle.keys.json' assert { type: 'json' }
import FFMPEG_CODEC_VIDEO from './ffmpeg.codecs.video.keys.json' assert { type: 'json' }
import FFMPEG_DECODER_AUDIO from './ffmpeg.decoders.audio.keys.json' assert { type: 'json' }
import FFMPEG_DECODER_CONTENT from './ffmpeg.decoders.json' assert { type: 'json' }
import FFMPEG_DECODER_SUBTITLE from './ffmpeg.decoders.subtitle.keys.json' assert { type: 'json' }
import FFMPEG_DECODER_VIDEO from './ffmpeg.decoders.video.keys.json' assert { type: 'json' }
import FFMPEG_ENCODER_AUDIO from './ffmpeg.encoders.audio.keys.json' assert { type: 'json' }
import FFMPEG_ENCODER_CONTENT from './ffmpeg.encoders.json' assert { type: 'json' }
import FFMPEG_ENCODER_SUBTITLE from './ffmpeg.encoders.subtitle.keys.json' assert { type: 'json' }
import FFMPEG_ENCODER_VIDEO from './ffmpeg.encoders.video.keys.json' assert { type: 'json' }
import FFMPEG_FORMAT_CONTENT from './ffmpeg.formats.json' assert { type: 'json' }
import FFMPEG_FORMAT from './ffmpeg.formats.keys.json' assert { type: 'json' }

export const ffmpeg_codec_audio: List = {
  form: 'list',
  list: FFMPEG_CODEC_AUDIO,
}

export const ffmpeg_codec_data: Form = {
  form: 'form',
  link: {
    label: { like: 'string' },
    type: { like: 'string', need: false },
    supportsDecoding: { like: 'boolean' },
    supportsEncoding: { like: 'boolean' },
    intraFrameOnly: { like: 'boolean' },
    lossy: { like: 'boolean' },
    lossless: { like: 'boolean' },
  },
}

export const ffmpeg_codec_content: Hash = {
  form: 'hash',
  file: 'ffmpeg',
  hash: FFMPEG_CODEC_CONTENT,
  bond: { like: 'ffmpeg_codec_data' },
}

export const ffmpeg_codec_subtitle: List = {
  form: 'list',
  list: FFMPEG_CODEC_SUBTITLE,
}

export const ffmpeg_codec_video: List = {
  form: 'list',
  list: FFMPEG_CODEC_VIDEO,
}

export const ffmpeg_decoder_audio: List = {
  form: 'list',
  list: FFMPEG_DECODER_AUDIO,
}

export const ffmpeg_decoder_data: Form = {
  form: 'form',
  link: {
    label: { like: 'string' },
    type: { like: 'string' },
    frameLevelMultithreading: { like: 'boolean' },
    sliceLevelMultithreading: { like: 'boolean' },
    experimental: { like: 'boolean' },
    supportsDrawHorizontalBand: { like: 'boolean' },
    supportsDirectRenderingMethod1: { like: 'boolean' },
  },
}

export const ffmpeg_decoder_content: Hash = {
  form: 'hash',
  file: 'ffmpeg',
  hash: FFMPEG_DECODER_CONTENT,
  bond: { like: 'ffmpeg_decoder_data' },
}

export const ffmpeg_decoder_subtitle: List = {
  form: 'list',
  list: FFMPEG_DECODER_SUBTITLE,
}

export const ffmpeg_decoder_video: List = {
  form: 'list',
  list: FFMPEG_DECODER_VIDEO,
}

export const ffmpeg_encoder_audio: List = {
  form: 'list',
  list: FFMPEG_ENCODER_AUDIO,
}

export const ffmpeg_encoder_data: Form = {
  form: 'form',
  link: {
    label: { like: 'string' },
    type: { like: 'string' },
    frameLevelMultithreading: { like: 'boolean' },
    sliceLevelMultithreading: { like: 'boolean' },
    experimental: { like: 'boolean' },
    supportsDrawHorizontalBand: { like: 'boolean' },
    supportsDirectRenderingMethod1: { like: 'boolean' },
  },
}

export const ffmpeg_encoder_content: Hash = {
  form: 'hash',
  file: 'ffmpeg',
  hash: FFMPEG_ENCODER_CONTENT,
  bond: { like: 'ffmpeg_encoder_data' },
}

export const ffmpeg_encoder_subtitle: List = {
  form: 'list',
  list: FFMPEG_ENCODER_SUBTITLE,
}

export const ffmpeg_encoder_video: List = {
  form: 'list',
  list: FFMPEG_ENCODER_VIDEO,
}

export const ffmpeg_format_data: Form = {
  form: 'form',
  link: {
    label: { like: 'string' },
    supportsDemuxing: { like: 'boolean' },
    supportsMuxing: { like: 'boolean' },
  },
}

export const ffmpeg_format_content: Hash = {
  form: 'hash',
  file: 'ffmpeg',
  hash: FFMPEG_FORMAT_CONTENT,
  bond: { like: 'ffmpeg_format_data' },
}

export const ffmpeg_format: List = {
  form: 'list',
  list: FFMPEG_FORMAT,
}

export const ffmpeg_strict_option: List = {
  form: 'list',
  list: ['very', 'strict', 'normal', 'unofficial', 'experimental'],
}

export const ffmpeg_strict_option_data: Form = {
  form: 'form',
  link: {
    note: { like: 'string' },
  },
}

export const ffmpeg_strict_option_content: Hash = {
  form: 'hash',
  file: 'ffmpeg',
  link: 'ffmpeg_strict_option',
  bond: { like: 'ffmpeg_strict_option_data' },
  hash: {
    very: {
      note: 'Strictly conform to a older more strict version of the spec or reference software.',
    },
    strict: {
      note: 'Strictly conform to all the things in the spec no matter what consequences.',
    },
    normal: { note: '' },
    unofficial: { note: 'Allow unofficial extensions.' },
    experimental: {
      note: 'Allow non standardized experimental things.',
    },
  },
}
