import {
  ConvertDocumentWithCalibreNodeInput,
  ConvertDocumentWithLibreOfficeNodeInput,
  ConvertDocumentWithPandocNodeInput,
  ConvertLatexToPngNodeInput,
  ConvertMarkdownWithPuppeteerNodeInput,
  ConvertTxtWithPuppeteerNodeInput,
} from '~/code/type/node/parser'
import {
  testConvertDocumentWithCalibre,
  testConvertDocumentWithLibreOffice,
  testConvertDocumentWithPandoc,
  testConvertLatexToPng,
  testConvertMarkdownWithPuppeteer,
  testConvertTxtWithPuppeteer,
} from './shared'

export * from './calibre/node'
export * from './libre-office/node'
export * from './pandoc/node'
export * from './pdflatex/node'
export * from './jupyter/node'
export * from './puppeteer/node'

export function testConvertLatexToPngNode(
  input: any,
): input is ConvertLatexToPngNodeInput {
  return testConvertLatexToPng(input)
}

export function testConvertMarkdownWithPuppeteerNode(
  input: any,
): input is ConvertMarkdownWithPuppeteerNodeInput {
  return testConvertMarkdownWithPuppeteer(input)
}

export function testConvertTxtWithPuppeteerNode(
  input: any,
): input is ConvertTxtWithPuppeteerNodeInput {
  return testConvertTxtWithPuppeteer(input)
}

export function testConvertDocumentWithCalibreNode(
  input: any,
): input is ConvertDocumentWithCalibreNodeInput {
  return testConvertDocumentWithCalibre(input)
}

export function testConvertDocumentWithPandocNode(
  input: any,
): input is ConvertDocumentWithPandocNodeInput {
  return testConvertDocumentWithPandoc(input)
}

export function testConvertDocumentWithLibreOfficeNode(
  input: any,
): input is ConvertDocumentWithLibreOfficeNodeInput {
  return testConvertDocumentWithLibreOffice(input)
}

// export async function convertLatexToPng(
//   source: ConvertLatexToPngNodeInput,
// ) {
//   const input = ConvertLatexToPngNodeInputParser().parse(source)

//   if (input.handle === 'remote') {
//     // const remoteInput = await resolveInputForConvertRemoteNode(input)
//     // return await convertDocumentWithPandocRemote(remoteInput)
//     return
//   }

//   const localInput = await resolveInputForConvertLocalNode(input)
//   return await convertLatexToPngLocal(localInput)
// }

// export async function convertLatexToPngLocal(
//   input: ConvertLatexToPngNodeLocalInternalInput,
// ) {
//   const outputDirectory = tmpdir() // TODO make better
//   const pdfLatexInput = _.merge({}, input, {
//     output: {
//       format: 'pdf' as const,
//       directory: {
//         path: outputDirectory,
//       },
//     },
//   })
//   const pdfOutput = await convertLatexWithPdfLatexLocal(pdfLatexInput)

//   const pdfCropInput = _.merge({}, input, {
//     input: {
//       file: {
//         path: pdfOutput.output.file.path,
//       },
//     },
//   })

//   return await cropPdfWithPdfCropNode(pdfCropInput)
// }
