/**
 * Router for `task extract <archive> -o <dir>` — picks the right
 * backend for the input extension. Override with `--tool`.
 *
 * Per-extension default:
 *   .zip                → unzip
 *   .rar                → unar (The Unarchiver). On macOS the
 *                         canonical install is `brew install unar`;
 *                         on Linux/Docker we already ship it via
 *                         `apt install unar`. GNU `unrar` stays
 *                         available as `--tool unrar` for hosts that
 *                         happen to have it.
 *   .7z                 → 7z
 *   .tar(.gz/bz2/xz/...) → tar
 *   anything else       → atool (extension-dispatching fallback)
 *
 * On macOS `brew install unar` is the canonical way to get .rar
 * support — `unrar` isn't in Homebrew. That's why we prefer `unar`
 * there.
 */

import path from 'node:path'
import { runCommandSequence } from '~/code/tool/node/command'
import {
  buildCommandToExtractWith7z,
  buildCommandToExtractWithAtool,
  buildCommandToExtractWithPatool,
  buildCommandToExtractWithTar,
  buildCommandToExtractWithUnarchiver,
  buildCommandToExtractWithUnrar,
  buildCommandToExtractWithUnzip,
  type ExtractInput,
} from './command'

export type ExtractArchiveTool =
  | 'unzip'
  | 'unrar'
  | 'unar'
  | '7z'
  | 'tar'
  | 'atool'
  | 'patool'

export type ExtractArchiveNodeInput = ExtractInput & {
  tool?: ExtractArchiveTool
}

export async function extractArchiveNode(
  source: ExtractArchiveNodeInput,
): Promise<void> {
  const tool = source.tool ?? pickTool(source.input.path)
  const sequence = await buildSequence(tool, source)
  await runCommandSequence(sequence)
}

function pickTool(filePath: string): ExtractArchiveTool {
  const name = path.basename(filePath).toLowerCase()
  if (name.endsWith('.zip')) return 'unzip'
  if (name.endsWith('.rar')) return 'unar'
  if (name.endsWith('.7z')) return '7z'
  if (
    name.endsWith('.tar') ||
    /\.tar\.(gz|bz2|xz|zst|lz|lzma)$/.test(name) ||
    /\.(tgz|tbz2|txz|tzst)$/.test(name)
  ) return 'tar'
  return 'atool'
}

async function buildSequence(
  tool: ExtractArchiveTool,
  source: ExtractArchiveNodeInput,
) {
  switch (tool) {
    case 'unzip':  return buildCommandToExtractWithUnzip(source)
    case 'unrar':  return buildCommandToExtractWithUnrar(source)
    case 'unar':   return buildCommandToExtractWithUnarchiver({
      input: {
        password: source.input.password,
        format: '' as never,
        file: { path: source.input.path },
      },
      output: {
        overwrite: source.output.overwrite ?? false,
        directory: source.output.directory,
      },
    } as never)
    case '7z':     return buildCommandToExtractWith7z({
      input: { format: '' as never, path: source.input.path },
      output: { format: '' as never, file: { path: source.output.directory.path } },
    } as never)
    case 'tar':    return buildCommandToExtractWithTar(source)
    case 'atool':  return buildCommandToExtractWithAtool(source)
    case 'patool': return buildCommandToExtractWithPatool(source)
  }
}
