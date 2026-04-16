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

import { spawnAndGetExitCode } from '~/code/tool/node/spawn'
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

async function searchNode(
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
  const [bin, ...args] = cmd.link
  if (!bin) throw new Error('search command had no binary')

  const exitCode = await spawnAndGetExitCode({
    verb: 'search',
    bin,
    args,
  })

  // ripgrep + fd both exit 1 to mean "no matches". Keep the
  // task action successful in that case so JSON / pretty status
  // doesn't read as a failure for an empty search.
  if (exitCode !== 0 && exitCode !== 1) {
    throw new Error(`\`${bin}\` exited with code ${exitCode}`)
  }

  return {
    tool: wantsFilenameSearch ? 'fd' : 'rg',
    matched: exitCode === 0,
  }
}

export default searchNode
export { searchNode }
