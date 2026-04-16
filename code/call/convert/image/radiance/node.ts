// HDR <-> TIFF via Radiance's ra_tiff. For .hdr <-> .exr, round-trip
// through TIFF (ra_tiff -> OpenEXR's exrinput/exroutput) or use
// convert/image/pfstools which handles both natively.

import type {
  ConvertImageWithRadianceNodeInput,
  ConvertImageWithRadianceNodeLocalInput,
} from '~/code/form/action/convert/image/radiance/node'
import {
  ConvertImageWithRadianceNodeInputParser,
  ConvertImageWithRadianceNodeLocalInputParser,
  ConvertImageWithRadianceNodeOutputParser,
} from '~/code/form/action/convert/image/radiance/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToConvertImageWithRadiance } from './command'

async function runLocal(
  input: ConvertImageWithRadianceNodeLocalInput,
) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const command = buildCommandToConvertImageWithRadiance({
    inputPath,
    outputPath,
    reverse: input.reverse,
  })
  await spawnAndWait({
    verb: 'convert image',
    bin: command.bin,
    args: command.args,
  })
  return { file: { path: outputPath } }
}

const [
  convertImageWithRadianceNode,
  testConvertImageWithRadianceNode,
] = createNodeHandler({
  parsers: {
    input: ConvertImageWithRadianceNodeInputParser,
    local: ConvertImageWithRadianceNodeLocalInputParser,
    output: ConvertImageWithRadianceNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default convertImageWithRadianceNode
export {
  convertImageWithRadianceNode,
  testConvertImageWithRadianceNode,
}
export type { ConvertImageWithRadianceNodeInput }
