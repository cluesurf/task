import { Form } from '@termsurf/form'
import { buildConvertForms } from '~/code/tool/shared/source.js'

export const convert_video_to_audio_with_ffmpeg: Form = {
  form: 'form',
  link: {
    inputPath: { like: 'string' },
    outputPath: { like: 'string' },
  },
}

export const convert_video_with_ffmpeg_base: Form = {
  form: 'form',
  link: {
    audioCodec: { like: 'ffmpeg_codec_audio', need: false },
    videoCodec: { like: 'ffmpeg_codec_video', need: false },
    audioBitRate: { like: 'integer', need: false },
    videoBitRate: { like: 'integer', need: false },
    frameRate: { like: 'integer', need: false },
    startTime: {
      need: false,
      case: [
        { like: 'integer', test: 'test_time_integer' },
        { like: 'string', test: 'test_time_string' },
      ],
    },
    endTime: {
      need: false,
      case: [
        { like: 'integer', test: 'test_time_integer' },
        { like: 'string', test: 'test_time_string' },
      ],
    },
    strict: {
      like: 'ffmpeg_strict_option',
      fall: 'strict',
      need: false,
    },
    overwrite: {
      like: 'boolean',
      need: false,
      fall: false,
      name: { mark: 'f' },
    },
    progress: {
      like: 'boolean',
      need: false,
      fall: false,
      name: { mark: 'p' },
    },
    scaleWidth: { like: 'integer', need: false },
    scaleHeight: { like: 'integer', need: false },
    audioChannels: { like: 'integer', need: false },
    audioSamplingFrequency: { like: 'integer', need: false },
    subtitleCodec: { like: 'ffmpeg_codec_subtitle', need: false },
    duration: {
      need: false,
      case: [
        { like: 'integer', test: 'test_time_integer' },
        { like: 'string', test: 'test_time_string' },
      ],
    },
    rotation: { like: 'decimal', need: false },
  },
}

const convert_video_with_ffmpeg_forms = buildConvertForms(
  'convert_video_with_ffmpeg',
  'ffmpeg_format',
  'ffmpeg_format',
  convert_video_with_ffmpeg_base.link,
)

export const convert_video_with_ffmpeg_command_input =
  convert_video_with_ffmpeg_forms.command_input

export const convert_video_with_ffmpeg_node_input =
  convert_video_with_ffmpeg_forms.node_input

export const convert_video_with_ffmpeg_node_remote_input =
  convert_video_with_ffmpeg_forms.node_remote_input

export const convert_video_with_ffmpeg_node_external_input =
  convert_video_with_ffmpeg_forms.node_external_input

export const convert_video_with_ffmpeg_node_client_input =
  convert_video_with_ffmpeg_forms.node_client_input

export const convert_video_with_ffmpeg_node_local_external_input =
  convert_video_with_ffmpeg_forms.node_local_external_input

export const convert_video_with_ffmpeg_node_local_internal_input =
  convert_video_with_ffmpeg_forms.node_local_internal_input

export const convert_video_with_ffmpeg_node_local_input =
  convert_video_with_ffmpeg_forms.node_local_input

export const convert_video_with_ffmpeg_node_output =
  convert_video_with_ffmpeg_forms.node_output

export const convert_video_with_ffmpeg_browser_input =
  convert_video_with_ffmpeg_forms.browser_input

export const convert_video_with_ffmpeg_browser_remote_input =
  convert_video_with_ffmpeg_forms.browser_remote_input

export const convert_video_with_ffmpeg_browser_local_input =
  convert_video_with_ffmpeg_forms.browser_local_input

export const convert_video_with_ffmpeg_browser_output =
  convert_video_with_ffmpeg_forms.browser_output

export const convert_mp4_to_gif_with_ffmpeg: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'i' } },
          },
        },
      },
    },
    output: {
      link: {
        format: { like: 'string', name: { mark: 'O' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'o' } },
          },
        },
      },
    },
    fps: { like: 'integer' },
    width: { like: 'integer' },
    startTime: {
      case: [
        { like: 'integer', test: 'test_time_integer' },
        { like: 'string', test: 'test_time_string' },
      ],
    },
    endTime: {
      case: [
        { like: 'integer', test: 'test_time_integer' },
        { like: 'string', test: 'test_time_string' },
      ],
    },
    duration: {
      case: [
        { like: 'integer', test: 'test_time_integer' },
        { like: 'string', test: 'test_time_string' },
      ],
    },
  },
}

export const remove_audio_from_video_with_ffmpeg: Form = {
  form: 'form',
  link: {
    inputPath: { like: 'string' },
    outputPath: { like: 'string' },
  },
}

export const add_audio_to_video_with_ffmpeg: Form = {
  form: 'form',
  link: {
    inputVideoPath: { like: 'string' },
    inputAudioPath: { like: 'string' },
    outputPath: { like: 'string' },
    audioCodec: { like: 'string', base: 'aac' },
    fit: { like: 'boolean' },
  },
}

export const compress_mp4_with_ffmpeg: Form = {
  form: 'form',
  link: {
    input: {
      link: {
        format: { like: 'string', name: { mark: 'I' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'i' } },
          },
        },
      },
    },
    output: {
      link: {
        format: { like: 'string', name: { mark: 'O' } },
        file: {
          link: {
            path: { like: 'string', name: { mark: 'o' } },
          },
        },
      },
    },
    audioCodec: {
      like: 'ffmpeg_codec_audio',
      fall: 'aac',
      need: false,
    },
    videoCodec: {
      like: 'ffmpeg_codec_video',
      fall: 'h264',
      need: false,
    },
  },
}
