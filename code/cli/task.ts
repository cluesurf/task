/* eslint-disable react-hooks/rules-of-hooks */
import kink from '~/code/tool/shared/kink'
import { convertCli } from './action/convert'
import { Call } from './type'
import { logGenericTaskHelp } from './logging'
import { verifyCli } from './action/verify'
import { formatCli } from './action/format'
import { compileCli } from './action/compile'

import '~/code/tool/node/bootstrap'

// --verbose logging
// task <Downloading ${url}>
//   load <10%> (white)
//   note <Done.> (green)
// task <Uploading ${path}>
//   load <100%>
// task <Executing {command}>
// task <Processing>
// task <Requesting GET /path>
//   note <Success.> (green)
//   note <Error message.> (red)

// [spinner]
// ✓ task <Verifying ${type}>
// ✓ task <Verified ${type}>
// ✓ task <Converting ${type}>
// ✓ task <Converted ${type}>

export async function call(call: Call) {
  switch (call.task) {
    case 'convert':
      return await convertCli({
        inputFormat: call.base[0],
        outputFormat: call.base[1],
        link: call.link,
      })
    case 'format':
      return await formatCli({
        format: call.base[0],
        inputFile: call.base[1],
        outputFile: call.base[2] ?? call.base[1],
        link: call.link,
      })
    case 'compile':
      return await compileCli({
        format: call.base[0],
        inputFile: call.base[1],
        outputFile: call.base[2] ?? call.base[1],
        link: call.link,
      })
    case 'slice': {
      // if (await testSplitPdf('slice', source)) {
      //   return await slicePdf(source)
      // }
      break
    }
    // case 'format': {
    //   switch (source.object[0]) {
    //     case 'rust': {
    //       await formatRust(
    //         FormatRustParser().parse(
    //           _.merge(makeLineHash(source, FORMAT_KEY), {
    //             input: {
    //               format: 'rust',
    //             },
    //           }),
    //         ),
    //       )
    //       return
    //     }
    //   }
    //   break
    // }
    // case 'compress': {
    //   break
    // }
    // case 'decompress': {
    //   break
    // }
    case 'verify':
      return await verifyCli({
        format: call.base[0],
        link: call.link,
      })
    // case 'inspect': {
    //   const thing = source.object[0] as string
    //   if (thing === 'system') {
    //     const info = await inspectSystem()
    //     logTree(info)
    //     return
    //   }
    //   break
    // }
    // case 'compile': {
    //   const base = BuildFormatInputOutputParser().parse(
    //     _.merge(makeLineHash(source, CONVERT_KEY), {
    //       input: {
    //         format: source.object[0],
    //       },
    //     }),
    //   )
    //   await compileInternal(base)
    //   return
    // }
  }

  if (call.link['-h'] || call.link['--help']) {
    return logGenericTaskHelp()
  }

  throw kink('task_not_implemented', { task: call.task })
}
