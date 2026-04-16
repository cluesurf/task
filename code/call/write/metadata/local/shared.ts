import {
  WriteMetadataToImage,
} from '~/code/form/action/resize/image/shared'
import { YYYY_MM_DD_HH_MM_SS, toDayJs } from '~/code/tool/shared/date'

export function buildCommandToWriteMetadataToImage(
  source: WriteMetadataToImage,
) {
  const {
    input,
    copyright,
    creator,
    license,
    keywords,
    artist,
    originalDate,
    allDates,
    creationDate,
    title,
    description,
  } = source
  const args: string[] = []

  if (copyright) {
    args.push(
      `-rights`,
      copyright,
      `-CopyrightNotice`,
      copyright,
    )
  }

  if (artist) {
    args.push(`artist`, artist)
  }

  if (originalDate) {
    const od = YYYY_MM_DD_HH_MM_SS(toDayJs(originalDate))
    // 1986:11:05 12:00:00
    args.push(`-datetimeoriginal`, od)
  }

  if (creationDate) {
    // 1986:11:05 12:00:00
    const od = YYYY_MM_DD_HH_MM_SS(toDayJs(creationDate))
    args.push(`-createdate`, od)
  }

  if (allDates) {
    const d = YYYY_MM_DD_HH_MM_SS(toDayJs(allDates))
    args.push(`-AllDates`, d)
  }

  if (creator) {
    args.push(`-XMP-dc:Creator`, creator)
  }

  if (keywords) {
    args.push(
      `-sep`,
      `, `,
      `-keywords`,
      keywords.join(', '),
    )
    args.push(`XMP-xmp:Keywords`, keywords.join(', '))
  }

  if (license) {
    args.push(
      `-XMP-dc:Rights`,
      license,
      `-xmp:usageterms`,
      license,
    )
  }

  if (title) {
    args.push(`-XMP-dc:Title`, title)
    args.push(`-XMP-xmp:Title`, title)
  }

  if (description) {
    args.push(`-XMP-dc:Description`, description)
    args.push(`-XMP-xmp:Description`, description)
  }

  args.push(input.file.path)

  return { bin: 'exiftool', args }
}
