import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command.js'
import { Archive } from '~/code/type/shared/index.js'

// https://superuser.com/questions/190053/universal-command-line-unarchiving-tool-on-a-mac
// atool
// .tar.gz, .tgz, .tar.bz, .tbz, .tar.bz2, .tbz2, .tar.Z, .tZ, .tar.lzo, .tzo, .tar.lz, .tlz, .tar.xz, .txz, .tar.7z, .t7z, .tar, .zip, .jar, .war, .rar, .lha, .lzh, .7z, .alz, .ace, .a, .arj, .arc, .rpm, .deb, .cab, .gz, .bz, .bz2, .gz, .bz, .bz2, .Z, .lzma, .lzo, .lz, .xz, .rz, .lrz, .7z, .cpio
// https://linux.die.net/man/1/apack

export function buildCommandToArchiveWithZip(input: Archive) {
  const cmd = getCommand(`zip`)
  cmd.link.push('-r', input.output.file.path, input.input.path)
  return buildCommandSequence(cmd)
}

export function buildCommandToArchiveWithRar(input: Archive) {
  // doesn't work on mac.
  const cmd = getCommand(`rar`)
  cmd.link.push(
    `a`,
    `"${input.output.file.path}"`,
    `"${input.input.path}"`,
  )
  return buildCommandSequence(cmd)
}
