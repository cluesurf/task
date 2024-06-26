import {
  ConvertFontWithFontForgeCommandInput,
  FontFormat,
} from '~/code/type/shared'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import debug from '~/code/tool/shared/debug'
import { testConvertFileInputOutput } from '../shared'
import { getConfig } from '~/code/tool/shared/config'

export async function buildCommandToConvertFontWithFontForge(
  input: ConvertFontWithFontForgeCommandInput,
) {
  const cmd = getCommand(`fontforge`)

  cmd.link.push(
    `-lang=ff`,
    `-c`,
    `'Open($1); Generate($2)'`,
    `"${input.input.file.path}"`,
    `"${input.output.file.path}"`,
  )

  debug('buildCommandToConvertFontWithFontForge', cmd.link)

  return buildCommandSequence(cmd)
}

export function testConvertFontWithFontForge(input: any) {
  if (!testConvertFileInputOutput(input)) {
    return false
  }

  const {
    input: { format: a },
    output: { format: b },
  } = input

  if (a === b) {
    return false
  }

  const FONT_FORMAT = getConfig('font_format')

  if (!FONT_FORMAT.includes(a as FontFormat)) {
    return false
  }
  if (!FONT_FORMAT.includes(b as FontFormat)) {
    return false
  }
  return true
}
