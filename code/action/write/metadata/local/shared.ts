import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command.js'
import { WriteMetadataToImage } from '~/code/type/shared/index.js'
import {
  YYYY_MM_DD_HH_MM_SS,
  toDayJs,
} from '~/code/tool/shared/date.js'

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
  const cmd = getCommand('exiftool')

  if (copyright) {
    cmd.link.push(
      `-rights`,
      `"${copyright}"`,
      `-CopyrightNotice`,
      `"${copyright}"`,
    )
  }

  if (artist) {
    cmd.link.push(`artist`, `"${artist}"`)
  }

  if (originalDate) {
    const od = YYYY_MM_DD_HH_MM_SS(toDayJs(originalDate))
    // 1986:11:05 12:00:00
    cmd.link.push(`-datetimeoriginal`, `"${od}"`)
  }

  if (creationDate) {
    // 1986:11:05 12:00:00
    const od = YYYY_MM_DD_HH_MM_SS(toDayJs(creationDate))
    cmd.link.push(`-createdate`, `"${od}"`)
  }

  if (allDates) {
    const d = YYYY_MM_DD_HH_MM_SS(toDayJs(allDates))
    cmd.link.push(`-AllDates`, d)
  }

  if (creator) {
    cmd.link.push(`-XMP-dc:Creator`, `"${creator}"`)
  }

  if (keywords) {
    cmd.link.push(
      `-sep`,
      `", "`,
      `-keywords`,
      `"${keywords.join(', ')}"`,
    )
    cmd.link.push(`XMP-xmp:Keywords`, `"${keywords.join(', ')}"`)
  }

  if (license) {
    cmd.link.push(
      `-XMP-dc:Rights`,
      `"${license}"`,
      `-xmp:usageterms`,
      `"${license}"`,
    )
  }

  if (title) {
    cmd.link.push(`-XMP-dc:Title`, `"${title}"`)
    cmd.link.push(`-XMP-xmp:Title`, `"${title}"`)
  }

  if (description) {
    cmd.link.push(`-XMP-dc:Description`, `"${description}"`)
    cmd.link.push(`-XMP-xmp:Description`, `"${description}"`)
  }

  cmd.link.push(`"${input.file.path}"`)

  return buildCommandSequence(cmd)
}
