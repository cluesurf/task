import * as MESH from '~/code/source.js'
import {
  makeLineCallLinkHash,
  makeLineCallLinkList,
  makeLineHash,
  makeLinkHash,
} from '~/code/cli/parse.js'
import {
  logCompiled,
  logCompiling,
  logHelp,
  setLoggingStyle,
} from '~/code/cli/logging.js'
import { closeAllBrowsers } from '~/code/tool/node/browser.js'
import { CallLinkMesh } from '../type.js'
import { Form } from '@termsurf/form'
import { exitWithError } from '../process.js'
// import { compile } from '~/code/action/compile/code/node'
import { COMPILE_CODE_HINT } from '../hint.js'
import {
  CompileCliBase,
  CompileCliBaseParser,
} from '~/code/type/shared/parser.js'

export async function compileCli({
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
    MESH.compile_cli_base,
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
  const input = CompileCliBaseParser().parse(source)
  const logFormat = input.log ?? 'pretty'

  setLoggingStyle(logFormat)

  switch (input.input.format) {
    case 'c':
      return await compileBase({
        hint: COMPILE_CODE_HINT,
        form: MESH.compile_c_node_input,
        link,
        input,
      })
    case 'cpp':
      return await compileBase({
        hint: COMPILE_CODE_HINT,
        form: MESH.compile_cpp_node_input,
        link,
        input,
      })
    case 'rust':
      return await compileBase({
        hint: COMPILE_CODE_HINT,
        form: MESH.compile_rust_node_input,
        link,
        input,
      })
    case 'swift':
      return await compileBase({
        hint: COMPILE_CODE_HINT,
        form: MESH.compile_swift_node_input,
        link,
        input,
      })
  }

  return logHelp(COMPILE_CODE_HINT, MESH.compile_cli_base, MESH)
}

async function compileBase({
  link,
  input,
  form,
  hint,
}: {
  link: CallLinkMesh
  input: CompileCliBase
  form: Form
  hint: string
}) {
  if (input.help) {
    return logHelp(hint, form, MESH)
  }

  let spinner

  try {
    const input = makeLinkHash(link, MESH, form)
    spinner = logCompiling({ input })
    const out = {} as any // await compile(input as any)
    spinner?.stop()

    logCompiled({
      input,
      path: out.file.path,
    })
  } catch (e) {
    exitWithError(e)
  } finally {
    await closeAllBrowsers()
  }
}
