/**
 * Pure argv builders for `task search`. Two backends:
 *
 *   - `buildRgCommand`  — content search via ripgrep
 *   - `buildFdCommand`  — filename search via fd
 *
 * Both take the same `SearchInput` shape; the node runner picks
 * which to call based on `input.name`.
 */

import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export type SearchInput = {
  pattern?: string
  path?: string
  name?: boolean
  type?: string
  files?: boolean
  count?: boolean
  hidden?: boolean
  ignoreCase?: boolean
  fixed?: boolean
  maxCount?: number
}

export function buildRgCommand(input: SearchInput) {
  const cmd = getCommand('rg')

  if (input.fixed) cmd.link.push('-F')
  if (input.ignoreCase) cmd.link.push('-i')
  if (input.hidden) {
    cmd.link.push('--hidden', '--no-ignore')
  }
  if (input.files) cmd.link.push('-l')
  if (input.count) cmd.link.push('-c')
  if (input.type) cmd.link.push('-g', `*.${input.type}`)
  if (typeof input.maxCount === 'number') {
    cmd.link.push('-m', String(input.maxCount))
  }

  if (input.pattern !== undefined) cmd.link.push(input.pattern)
  if (input.path) cmd.link.push(input.path)

  return buildCommandSequence(cmd)
}

export function buildFdCommand(input: SearchInput) {
  const cmd = getCommand('fd')

  if (input.fixed) cmd.link.push('--fixed-strings')
  if (input.ignoreCase) cmd.link.push('--ignore-case')
  if (input.hidden) {
    cmd.link.push('--hidden', '--no-ignore')
  }
  if (input.type) cmd.link.push('-e', input.type)
  if (typeof input.maxCount === 'number') {
    cmd.link.push('--max-results', String(input.maxCount))
  }

  if (input.pattern !== undefined) cmd.link.push(input.pattern)
  if (input.path) cmd.link.push(input.path)

  return buildCommandSequence(cmd)
}
