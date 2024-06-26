import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { VerifyImageWithImageMagick } from '~/code/type/node/parser'

export function buildCommandToVerifyImageWithImageMagick(
  input: VerifyImageWithImageMagick,
) {
  const cmd = getCommand(`identify`)
  cmd.link.push(`"${input.file.path}"`)
  return buildCommandSequence(cmd)
}
