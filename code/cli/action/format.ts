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
  logFormatted,
  logFormatting,
  logHelp,
  setLoggingStyle,
} from '~/code/cli/logging.js'
import {
  ConvertCliBase,
  ConvertCliBaseParser,
  FormatCliBase,
  FormatCliBaseParser,
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
  CONVERT_VIDEO_HINT,
  FORMAT_CODE_HINT,
  FORMAT_C_CODE_HINT,
} from '../hint.js'
import { closeAllBrowsers } from '~/code/tool/node/browser.js'
import { CallLinkMesh } from '../type.js'
import { Form } from '@termsurf/form'
import { exitWithError } from '../process.js'
// import { format } from '~/code/action/format/node'

export async function formatCli({
  format,
  inputFile,
  outputFile,
  link,
}: {
  format?: string
  inputFile?: string
  outputFile?: string
  link: CallLinkMesh
}) {
  const lineCallLinkList = makeLineCallLinkList(
    MESH,
    MESH.format_cli_base,
  )
  const lineCallLinkHash = makeLineCallLinkHash(lineCallLinkList)
  if (format) {
    link['-I'] = [format]
  }
  if (!link['-i'] && inputFile) {
    link['-i'] = [inputFile]
  }
  if (!link['-o'] && outputFile) {
    link['-o'] = [outputFile]
  }
  const source = makeLineHash(link, lineCallLinkHash)
  const input = FormatCliBaseParser().parse(source)
  const logFormat = input.log ?? 'pretty'

  setLoggingStyle(logFormat)

  switch (input.format) {
    case 'c':
    case 'cpp':
      return await formatBase({
        hint: FORMAT_C_CODE_HINT,
        form: MESH.format_code_with_clang_format_node_input,
        link,
        input,
        type: 'code',
      })
    case 'assembly':
      return await formatBase({
        hint: FORMAT_C_CODE_HINT,
        form: MESH.format_code_with_clang_format_node_input,
        link,
        input,
        type: 'code',
      })
    case 'rust':
      return await formatBase({
        hint: FORMAT_C_CODE_HINT,
        form: MESH.format_code_with_clang_format_node_input,
        link,
        input,
        type: 'code',
      })
    case 'swift':
      return await formatBase({
        hint: FORMAT_C_CODE_HINT,
        form: MESH.format_code_with_clang_format_node_input,
        link,
        input,
        type: 'code',
      })
    case 'kotlin':
      return await formatBase({
        hint: FORMAT_C_CODE_HINT,
        form: MESH.format_code_with_clang_format_node_input,
        link,
        input,
        type: 'code',
      })
    case 'python':
      return await formatBase({
        hint: FORMAT_C_CODE_HINT,
        form: MESH.format_code_with_clang_format_node_input,
        link,
        input,
        type: 'code',
      })
  }

  return logHelp(FORMAT_CODE_HINT, MESH.format_cli_base, MESH)
}

async function formatBase({
  link,
  input,
  form,
  hint,
  type,
}: {
  link: CallLinkMesh
  input: FormatCliBase
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
    spinner = logFormatting({ type, input })
    const out = {} as any // await format(input as any)
    spinner?.stop()

    logFormatted({
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
