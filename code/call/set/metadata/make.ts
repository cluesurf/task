import { Form } from '@cluesurf/form'

/**
 * Action input for `task set metadata` — embeds ID3 / container
 * metadata into an audio file. Three-step flow internally:
 *
 *   1. ffmpeg writes base ID3v2.3 + cover-art stream.
 *   2. id3v2 removes any existing USLT (lyrics) frames.
 *   3. eyeD3 writes UTF-16 lyrics in a v2.3-compliant frame
 *      (Apple Music compatibility).
 *
 * Inspired by `deck/etch/scripts/audio/song-meta.sh`. The
 * cover and lyrics inputs are optional; omitting them skips the
 * matching step.
 */

export const set_metadata: Form = {
  form: 'form',
  save: '~/code/form/action/set/metadata',
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
    title: { like: 'string', need: false },
    artist: { like: 'string', need: false },
    album: { like: 'string', need: false },
    albumArtist: { like: 'string', need: false },
    composer: { like: 'string', need: false },
    track: { like: 'string', need: false },
    disc: { like: 'string', need: false, fall: '1/1' },
    genre: { like: 'string', need: false },
    year: { like: 'string', need: false },
    publisher: { like: 'string', need: false },
    website: { like: 'string', need: false },
    comment: { like: 'string', need: false },
    cover: {
      need: false,
      link: {
        file: {
          link: { path: { like: 'string' } },
        },
      },
    },
    lyrics: {
      need: false,
      link: {
        file: {
          link: { path: { like: 'string' } },
        },
        language: { like: 'string', need: false, fall: 'eng' },
      },
    },
  },
}
