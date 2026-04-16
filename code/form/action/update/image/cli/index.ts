import { LocalPath } from '~/code/form/object/file'

export type UpdateImageCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file?: LocalPath
  }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}
