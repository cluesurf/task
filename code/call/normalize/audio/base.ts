import { Form } from '@cluesurf/form'

/**
 * `task normalize audio` — run the file through ffmpeg's
 * `loudnorm` filter targeting EBU R128 defaults (−16 LUFS / −1
 * dB TP / 11 LU range). Overrides are flat flags so users with
 * specific targets don't need a custom filter string.
 */
export const normalize_audio: Form = {
  form: 'form',
  save: '~/code/form/action/normalize/audio',
  link: {
    input: { link: { file: { link: { path: { like: 'string', name: { mark: 'i' } } } } } },
    output: { link: { file: { link: { path: { like: 'string', name: { mark: 'o' } } } } } },
    target: { like: 'string', need: false, note: 'Integrated loudness target in LUFS (default −16)' },
    peak: { like: 'string', need: false, note: 'True-peak ceiling in dBTP (default −1)' },
    range: { like: 'string', need: false, note: 'Loudness range target in LU (default 11)' },
  },
}
