import { AudioPadFormat } from '~/code/form/object/audio'

export type Pad = {
  input: {
    format?: AudioPadFormat
    file: {
      path: string
    }
  }
  output: {
    format?: AudioPadFormat
    file: {
      path: string
    }
  }
  to: string
  sampleRate?: number
  channels?: number
}
