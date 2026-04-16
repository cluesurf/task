import {
  ExtractWith7Z,
  ExtractWithUnarchiver,
} from '~/code/form/action/extract/archive/shared'

export type ExtractInput = {
  input: { path: string; password?: string }
  output: { directory: { path: string }; overwrite?: boolean }
  /** Optional subset of entries to extract. Only honored by tools
   * that support it (tar, unzip, 7z, unar). */
  include?: string[]
}

// check if corrupted
// zip -T filename.zip
// 7z t file.zip

export function buildCommandToExtractWith7z(
  input: ExtractWith7Z,
): { bin: '7z'; args: string[] } {
  const args = [
    'x',
    `"${input.input.path}"`,
    '-o',
    `"${input.output.file!.path}"`,
  ]
  return { bin: '7z', args }
}

export function buildCommandToExtractWithUnarchiver(
  input: ExtractWithUnarchiver,
): { bin: 'unar'; args: string[] } {
  const args: string[] = [
    input.input.file.path,
    '-o',
    input.output.directory.path,
    '--quiet',
  ]

  if (input.output.overwrite) {
    args.push('-f')
  }

  if (input.input.password) {
    args.push('-p', input.input.password)
  }

  return { bin: 'unar', args }
}

// https://github.com/ashang/unar/blob/master/README.md

/**
 * `unzip src.zip -d out/` -- native zip extractor. Preserves
 * permissions, handles passwords with `-P`, and honors `-o` to
 * overwrite without prompting. Falls back to stdin `-` when the
 * caller pipes in the archive.
 */
export function buildCommandToExtractWithUnzip(
  input: ExtractInput,
): { bin: 'unzip'; args: string[] } {
  const args: string[] = []
  if (input.output.overwrite) args.push('-o')
  if (input.input.password) args.push('-P', input.input.password)
  args.push(input.input.path)
  if (input.include?.length) args.push(...input.include)
  args.push('-d', input.output.directory.path)
  return { bin: 'unzip', args }
}

/**
 * `unrar x -o+ src.rar out/` -- canonical rar extractor. `x` keeps
 * the in-archive folder structure (vs `e` which flattens). `-o+`
 * overwrites, `-o-` skips, default prompts. Password via `-p`.
 */
export function buildCommandToExtractWithUnrar(
  input: ExtractInput,
): { bin: 'unrar'; args: string[] } {
  const args: string[] = ['x']
  args.push(input.output.overwrite ? '-o+' : '-o-')
  if (input.input.password) args.push(`-p${input.input.password}`)
  args.push(input.input.path)
  if (input.include?.length) args.push(...input.include)
  // unrar needs a trailing slash on the output dir or it treats it
  // as a file prefix.
  const out = input.output.directory.path.replace(/\/?$/, '/')
  args.push(out)
  return { bin: 'unrar', args }
}

/**
 * `tar -xf src.tar.* -C out/` -- native tar. Compression auto-
 * detected by tar itself (GNU/BSD both auto-probe the stream).
 */
export function buildCommandToExtractWithTar(
  input: ExtractInput,
): { bin: 'tar'; args: string[] } {
  const args: string[] = ['-x', '-f', input.input.path]
  args.push('-C', input.output.directory.path)
  if (input.include?.length) args.push(...input.include)
  return { bin: 'tar', args }
}

/**
 * `atool --extract-to out/ src.*` -- extension-dispatches to the
 * right tool per format. Great fallback when you don't know what
 * the archive is.
 */
export function buildCommandToExtractWithAtool(
  input: ExtractInput,
): { bin: 'atool'; args: string[] } {
  const args: string[] = ['--extract-to', input.output.directory.path]
  if (input.output.overwrite) args.push('--force')
  args.push('--quiet')
  args.push(input.input.path)
  return { bin: 'atool', args }
}

/**
 * `patool extract src.* --outdir out/` -- python equivalent of
 * atool. Same dispatch idea, but ships via pip which makes it
 * available on systems where atool isn't packaged.
 */
export function buildCommandToExtractWithPatool(
  input: ExtractInput,
): { bin: 'patool'; args: string[] } {
  const args: string[] = [
    '--non-interactive',
    'extract',
    '--outdir',
    input.output.directory.path,
    input.input.path,
  ]
  return { bin: 'patool', args }
}
