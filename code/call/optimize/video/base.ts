import { Form } from '@cluesurf/form'

/**
 * Action input for `task optimize video` — re-encodes a video at
 * a target quality / size envelope. Defaults match a typical
 * web-friendly recipe:
 *
 *   ffmpeg -i in.mov -vcodec libx264 -crf 20 -preset slow \
 *     -vf "scale=1920:-2" -pix_fmt yuv420p \
 *     -movflags +faststart -acodec aac -b:a 128k out.mp4
 *
 * Every encoder flag is overridable; sensible defaults let
 * `task optimize video -i in.mov -o out.mp4` Just Work.
 */

export const optimize_video: Form = {
  form: 'form',
  save: '~/code/form/action/optimize/video',
  link: {
    input: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
    output: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'o' } } },
        },
      },
    },
    /** Video codec (`libx264`, `libx265`, `libsvtav1`, ...). */
    videoCodec: { like: 'string', need: false, fall: 'libx264' },
    /** Constant Rate Factor — lower = higher quality. 18–28 typical. */
    crf: { like: 'natural_number', need: false, fall: 20 },
    /** x264 preset — `ultrafast` ↔ `placebo`. */
    preset: { like: 'string', need: false, fall: 'slow' },
    /** Target width in pixels. Height auto-scales (`-vf scale=W:-2`). */
    width: { like: 'natural_number', need: false, fall: 1920 },
    /** Pixel format. `yuv420p` for broad compatibility. */
    pixelFormat: { like: 'string', need: false, fall: 'yuv420p' },
    /** Audio codec (`aac`, `libopus`, `copy`, ...). */
    audioCodec: { like: 'string', need: false, fall: 'aac' },
    /** Audio bitrate (`128k`, `192k`, `256k`, ...). */
    audioBitrate: { like: 'string', need: false, fall: '128k' },
    /** Move the moov atom to the front for streaming-friendly output. */
    faststart: { like: 'boolean', need: false, fall: true },
    /** Drop audio entirely (`-an`). */
    silent: { like: 'boolean', need: false, fall: false },
  },
}
