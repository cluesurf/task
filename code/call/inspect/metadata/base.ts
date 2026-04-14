import { Form } from '@cluesurf/form'

/**
 * `task inspect metadata <path>` — shells out to exiftool and
 * renders every non-trivial tag. Covers EXIF / XMP / IPTC / ID3
 * / PDF info / plenty more — whatever exiftool can read.
 */
export const inspect_metadata: Form = {
  form: 'form',
  save: '~/code/form/action/inspect/metadata',
  link: {
    input: {
      link: {
        file: {
          link: { path: { like: 'string', name: { mark: 'i' } } },
        },
      },
    },
  },
}

export const inspect_metadata_from_image: Form = {
  form: 'form',
  save: '~/code/form/action/inspect/metadata/shared',
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
    copyright: { like: 'string', need: false },
    creator: { like: 'string', need: false },
    license: { like: 'string', need: false },
    keywords: { like: 'string', list: true, need: false },
    artist: { like: 'string', need: false },
    originalDate: { like: 'date', need: false },
    allDates: { like: 'date', need: false },
    creationDate: { like: 'date', need: false },
    title: { like: 'string', need: false },
    description: { like: 'string', need: false },
  },
}
