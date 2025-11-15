import fs from 'fs/promises'
// import { slicePdfWithData } from '../../validate/document/shared'

// export async function slicePdf(input: SlicePdf) {
//   const inputBuffer = await fs.readFile(input.input.file.path as string)
//   const outputBuffer = await slicePdfWithData(
//     _.merge(input, {
//       input: {
//         file: {
//           data: inputBuffer,
//         },
//       },
//     }),
//   )
//   await fs.writeFile(input.output.file.path as string, outputBuffer)
// }

export const slice = true
