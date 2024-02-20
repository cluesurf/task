import { getCommand } from '~/code/tool/shared/command'
import { RemoveImageMetadata } from '~/code/type/index'

export function buildCommandToRemoveImageMetadata(
  input: RemoveImageMetadata,
) {
  const cmd = getCommand(`exiftool`)
  cmd.link.push(`-all=`, `"${input.input.file.path}"`)
  return [cmd]
}
