import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { VerifyImageWithImageMagick } from '~/code/form/action/verify/image/shared'

export function buildCommandToVerifyImageWithImageMagick(
  input: VerifyImageWithImageMagick,
) {
  const cmd = getCommand(`identify`)
  cmd.link.push(`"${input.file.path}"`)
  return buildCommandSequence(cmd)
}
