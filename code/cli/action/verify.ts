import * as MESH from '~/code/source'
import {
  makeLineCallLinkHash,
  makeLineCallLinkList,
  makeLineHash,
  makeLinkHash,
} from '~/code/cli/parse'
import {
  logHelp,
  logVerificationStatus,
  logVerifying,
  setLoggingStyle,
} from '~/code/cli/logging'
import { VERIFY_IMAGE_HINT } from '~/code/cli/hint'
import { CallLinkMesh } from '~/code/cli/type'
import {
  VerifyCliBase,
  VerifyCliBaseParser,
  VerifyImageWithImageMagickParser,
} from '~/code/type/shared/parser'
import { testVerifyImageWithImageMagickNode } from '~/code/action/verify/image/node'
import { Form } from '@termsurf/form'
import { closeAllBrowsers } from '~/code/tool/node/browser'
// import { verify } from '~/code/action/verify/node'
import { exitWithError } from '../process'

export async function verifyCli({
  format,
  link,
}: {
  format?: string
  link: CallLinkMesh
}) {
  const lineCallLinkList = makeLineCallLinkList(
    MESH,
    MESH.verify_cli_base,
  )
  if (format) {
    link['-I'] = [format]
  }
  const lineCallLinkHash = makeLineCallLinkHash(lineCallLinkList)
  const source = makeLineHash(link, lineCallLinkHash)
  const input = VerifyCliBaseParser().parse(source)
  const logFormat = input.log ?? 'pretty'

  setLoggingStyle(logFormat)

  if (testVerifyImageWithImageMagickNode(input)) {
    return await verifyBase({
      hint: VERIFY_IMAGE_HINT,
      form: MESH.verify_image_with_image_magick,
      link,
      input,
      type: 'image',
    })
  }

  return logHelp(VERIFY_IMAGE_HINT, MESH.verify_cli_base, MESH)
}

async function verifyBase({
  link,
  input,
  form,
  hint,
  type,
}: {
  link: CallLinkMesh
  input: VerifyCliBase
  form: Form
  hint: string
  type: string
}) {
  if (input.help) {
    return logHelp(hint, form, MESH)
  }

  let spinner

  try {
    const source = makeLinkHash(link, MESH, form)
    const input = VerifyImageWithImageMagickParser().parse(source)

    spinner = logVerifying({
      type,
      input,
    })
    const isVerified = false // await verify(input as any)
    spinner?.stop()

    logVerificationStatus({
      type,
      input,
      isVerified,
    })
  } catch (e) {
    exitWithError(e)
  } finally {
    await closeAllBrowsers()
  }
}
