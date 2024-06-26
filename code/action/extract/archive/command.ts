import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command.js'
import {
  ExtractWith7Z,
  ExtractWithUnarchiver,
} from '~/code/type/shared/index.js'

// check if corrupted
// zip -T filename.zip
// 7z t file.zip

export function buildCommandToExtractWith7z(input: ExtractWith7Z) {
  const cmd = getCommand(`7z`)
  cmd.link.push(
    `x`,
    `"${input.input.path}"`,
    `-o`,
    `"${input.output.file.path}"`,
  )
  return buildCommandSequence(cmd)
}

export function buildCommandToExtractWithUnarchiver(
  input: ExtractWithUnarchiver,
) {
  const cmd = getCommand(`unar`)
  cmd.link.push(
    `${input.input.file.path}`,
    `-o`,
    `${input.output.directory.path}`,
  )

  cmd.link.push('--quiet')

  if (input.output.overwrite) {
    cmd.link.push(`-f`)
  }

  if (input.input.password) {
    cmd.link.push(`-p`, input.input.password)
  }

  return buildCommandSequence(cmd)
}

// https://github.com/ashang/unar/blob/master/README.md
