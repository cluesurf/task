import { Archive } from '~/code/form/action/archive/index'

// https://superuser.com/questions/190053/universal-command-line-unarchiving-tool-on-a-mac
// atool
// .tar.gz, .tgz, .tar.bz, .tbz, .tar.bz2, .tbz2, .tar.Z, .tZ, .tar.lzo, .tzo, .tar.lz, .tlz, .tar.xz, .txz, .tar.7z, .t7z, .tar, .zip, .jar, .war, .rar, .lha, .lzh, .7z, .alz, .ace, .a, .arj, .arc, .rpm, .deb, .cab, .gz, .bz, .bz2, .gz, .bz, .bz2, .Z, .lzma, .lzo, .lz, .xz, .rz, .lrz, .7z, .cpio
// https://linux.die.net/man/1/apack

export function buildCommandToArchiveWithZip(input: Archive): { bin: string; args: string[] } {
  const bin = 'zip'
  const args: string[] = ['-r', input.output.file!.path, input.input.path]
  return { bin, args }
}

export function buildCommandToArchiveWithRar(input: Archive): { bin: string; args: string[] } {
  // doesn't work on mac.
  const bin = 'rar'
  const args: string[] = [
    'a',
    input.output.file!.path,
    input.input.path,
  ]
  return { bin, args }
}
