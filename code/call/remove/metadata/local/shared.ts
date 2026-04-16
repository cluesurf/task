import {
  RemoveImageMetadata,
} from '~/code/form/action/remove/metadata/shared'

export function buildCommandToRemoveImageMetadata(
  input: RemoveImageMetadata,
) {
  return { bin: 'exiftool', args: ['-all=', input.input.file.path] }
}
