import camelCase from 'lodash/camelCase'
import {
  InspectMetadataFromImage,
} from '~/code/form/action/inspect/metadata/shared'
export function buildCommandToInspectMetadataFromImage(
  input: InspectMetadataFromImage,
): { bin: string; args: string[] } {
  const bin = 'exiftool'
  const args: string[] = [input.input.file.path]
  return { bin, args }
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
