import * as MESH from '~/code/source.js'
import {
  makeLineCallLinkHash,
  makeLineCallLinkList,
  makeLineHash,
  makeLinkHash,
} from '~/code/cli/parse.js'
import {
  logConverted,
  logConverting,
  logHelp,
  setLoggingStyle,
} from '~/code/cli/logging.js'
import {
  ConvertCliBase,
  ConvertCliBaseParser,
} from '~/code/type/shared/parser.js'
// import { convert } from '~/code/action/node'
import {
  testConvertDocumentWithCalibreNode,
  testConvertDocumentWithLibreOfficeNode,
  testConvertDocumentWithPandocNode,
  testConvertMarkdownWithPuppeteerNode,
  testConvertTxtWithPuppeteerNode,
} from '~/code/action/convert/document/node.js'
import {
  CONVERT_ARCHIVE_HINT,
  CONVERT_DOCUMENT_PANDOC_HINT,
  CONVERT_FONT_HINT,
  CONVERT_HINT,
  CONVERT_IMAGE_HINT,
  CONVERT_UNIT_HINT,
  CONVERT_VIDEO_HINT,
} from '../hint.js'
import { closeAllBrowsers } from '~/code/tool/node/browser.js'
import { CallLinkMesh } from '../type'
import { Form } from '@termsurf/form'
import { testConvertFontWithFontForgeNode } from '~/code/action/convert/font/node.js'
import { testConvertImageWithImageMagickNode } from '~/code/action/convert/image/imagemagick/node.js'
import { testConvertImageWithInkscapeNode } from '~/code/action/convert/image/inkscape/node.js'
import { testConvertVideoWithFfmpegNode } from '~/code/action/convert/video/ffmpeg/node.js'
import { testConvertArchiveNode } from '~/code/action/convert/archive/node.js'
import { exitWithError } from '../process.js'
import { testConvertUnit } from '~/code/action/convert/unit/shared.js'

export async function convertCli({
  inputFormat,
  outputFormat,
  link,
}: {
  inputFormat?: string
  outputFormat?: string
  link: CallLinkMesh
}) {
  const convert_lineCallLinkList = makeLineCallLinkList(
    MESH,
    MESH.convert_cli_base,
  )
  const convert_lineCallLinkHash = makeLineCallLinkHash(
    convert_lineCallLinkList,
  )
  if (inputFormat) {
    link['-I'] = [inputFormat]
  }
  if (outputFormat) {
    link['-O'] = [outputFormat]
  }
  const source = makeLineHash(link, convert_lineCallLinkHash)
  const input = ConvertCliBaseParser().parse(source)
  const logFormat = input.log ?? 'pretty'

  setLoggingStyle(logFormat)

  if (testConvertTxtWithPuppeteerNode(input)) {
    return await convertBase({
      hint: CONVERT_HINT,
      form: MESH.convert_txt_with_puppeteer_node_input,
      link,
      input,
      type: 'document',
    })
  }

  if (testConvertMarkdownWithPuppeteerNode(input)) {
    return await convertBase({
      hint: CONVERT_HINT,
      form: MESH.convert_markdown_with_puppeteer_node_input,
      link,
      input,
      type: 'document',
    })
  }

  if (testConvertDocumentWithPandocNode(input)) {
    return await convertBase({
      hint: CONVERT_DOCUMENT_PANDOC_HINT,
      form: MESH.convert_document_with_pandoc_node_input,
      link,
      input,
      type: 'document',
    })
  }

  if (testConvertDocumentWithLibreOfficeNode(input)) {
    return await convertBase({
      hint: CONVERT_HINT,
      form: MESH.convert_document_with_libre_office_node_input,
      link,
      input,
      type: 'document',
    })
  }

  if (testConvertDocumentWithCalibreNode(input)) {
    return await convertBase({
      hint: CONVERT_DOCUMENT_PANDOC_HINT,
      form: MESH.convert_document_with_calibre_node_input,
      link,
      input,
      type: 'document',
    })
  }

  if (testConvertFontWithFontForgeNode(input)) {
    return await convertBase({
      hint: CONVERT_FONT_HINT,
      form: MESH.convert_font_with_font_forge_node_input,
      link,
      input,
      type: 'font',
    })
  }

  if (testConvertImageWithInkscapeNode(input)) {
    return await convertBase({
      hint: CONVERT_IMAGE_HINT,
      form: MESH.convert_image_with_inkscape_node_input,
      link,
      input,
      type: 'image',
    })
  }

  if (testConvertImageWithImageMagickNode(input)) {
    return await convertBase({
      hint: CONVERT_IMAGE_HINT,
      form: MESH.convert_image_with_image_magick_node_input,
      link,
      input,
      type: 'image',
    })
  }

  if (testConvertVideoWithFfmpegNode(input)) {
    return await convertBase({
      hint: CONVERT_VIDEO_HINT,
      form: MESH.convert_video_with_ffmpeg_node_input,
      link,
      input,
      type: 'video',
    })
  }

  if (testConvertArchiveNode(input)) {
    return await convertBase({
      hint: CONVERT_ARCHIVE_HINT,
      form: MESH.convert_archive_node_input,
      link,
      input,
      type: 'archive',
    })
  }

  if (testConvertUnit(input)) {
    return await convertBase({
      hint: CONVERT_UNIT_HINT,
      form: MESH.convert_unit,
      link,
      input,
      type: 'unit',
    })
  }

  return logHelp(CONVERT_HINT, MESH.convert_cli_base, MESH)
}

async function convertBase({
  link,
  input,
  form,
  hint,
  type,
}: {
  link: CallLinkMesh
  input: ConvertCliBase
  form: Form
  hint: string
  type: string
}) {
  if (input.help) {
    return logHelp(hint, form, MESH)
  }

  let spinner

  try {
    const input = makeLinkHash(link, MESH, form)
    spinner = logConverting({ type, input })
    const out = {} as any //await convert(input as any)
    spinner?.stop()

    logConverted({
      type,
      input,
      path: out.file.path,
    })
  } catch (e) {
    exitWithError(e)
  } finally {
    await closeAllBrowsers()
  }
}
