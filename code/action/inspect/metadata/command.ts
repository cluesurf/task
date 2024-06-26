import camelCase from 'lodash/camelCase'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { InspectMetadataFromImage } from '~/code/type/node/parser'

export function buildCommandToInspectMetadataFromImage(
  input: InspectMetadataFromImage,
) {
  const cmd = getCommand('exiftool')
  cmd.link.push(`"${input.input.file.path}"`)
  return buildCommandSequence(cmd)
}

export type ExifMetadata = { name: string; bond: string | number }

export function parseImageMetadataFromExifTool(lines: Array<string>) {
  const metadata: Array<ExifMetadata> = []
  lines.forEach(line => {
    const pieces = line.split(': ')
    //Is this a line with a meta data pair on it?
    if (pieces.length == 2) {
      const name = camelCase((pieces[0] as string).trim())
      let bond: string | number = (pieces[1] as string).trim()
      const number = parseFloat(bond)
      if (!Number.isNaN(number)) {
        bond = number
      }
      metadata.push({ name, bond })
    }
  })
  return metadata
}
