import { VerifyImageWithImageMagick } from '~/code/form/action/verify/image/shared'

export function buildCommandToVerifyImageWithImageMagick(
  input: VerifyImageWithImageMagick,
): { bin: string; args: string[] } {
  const bin = 'identify'
  const args: string[] = [input.file.path]
  return { bin, args }
}
