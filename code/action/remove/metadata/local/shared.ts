import { getCommand } from '~/code/tool/shared/command.js'
import { RemoveImageMetadata } from '~/code/type/shared/index.js'

export function buildCommandToRemoveImageMetadata(
  input: RemoveImageMetadata,
) {
  const cmd = getCommand(`exiftool`)
  cmd.link.push(`-all=`, `"${input.input.file.path}"`)
  return [cmd]
}
