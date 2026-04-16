import { LocalPath } from '~/code/form/object/file'

export type RemoveExifCommandInput = {
  input: {
    file: LocalPath
  }
  output: {
    file: LocalPath
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
