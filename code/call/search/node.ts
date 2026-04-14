/**
 * `task search` — wraps ripgrep (content) and fd (filenames)
 * behind a single CLI surface. Streams the underlying tool's
 * stdout straight through (no JSON wrapping, no per-line
 * mutation) so output stays compatible with the shell pipelines
 * users already have.
 *
 * Returns nothing on stdout itself when matches exist (the child
 * already wrote them); throws when the child exits non-zero with
 * a real error. ripgrep / fd both exit with `1` for "no
 * matches", which is the expected no-result case — so we
 * tolerate that exit code.
 */

import child_process from 'node:child_process'
import {
  buildFdCommand,
  buildRgCommand,
  type SearchInput,
} from './command'

export type SearchNodeInput = SearchInput

export type SearchNodeOutput = {
  tool: 'rg' | 'fd'
  matched: boolean
}

export async function searchNode(
  source: SearchNodeInput,
): Promise<SearchNodeOutput> {
  if (source.name === true && !source.pattern && !source.path) {
    // `task search --name` with no pattern lists everything fd
    // would walk in `.`. Make that explicit so fd doesn't error.
    source = { ...source, path: source.path ?? '.' }
  }

  const wantsFilenameSearch = source.name === true
  const sequence = wantsFilenameSearch
    ? buildFdCommand(source)
    : buildRgCommand(source)
  const cmd = sequence.call[0]!

  const exitCode = await runStreaming(cmd.link)

  // ripgrep + fd both exit 1 to mean "no matches". Keep the
  // task action successful in that case so JSON / pretty status
  // doesn't read as a failure for an empty search.
  if (exitCode !== 0 && exitCode !== 1) {
    throw new Error(
      `\`${cmd.link[0]}\` exited with code ${exitCode}`,
    )
  }

  return {
    tool: wantsFilenameSearch ? 'fd' : 'rg',
    matched: exitCode === 0,
  }
}

function runStreaming(argv: string[]): Promise<number> {
  return new Promise((resolve, reject) => {
    const [bin, ...rest] = argv
    if (!bin) {
      reject(new Error('search command had no binary'))
      return
    }
    const child = child_process.spawn(bin, rest, {
      stdio: ['ignore', 'inherit', 'inherit'],
    })
    child.on('error', reject)
    child.on('close', code => resolve(code ?? 0))
  })
}
