/**
 * Pure argv builders for `task search`. Two backends:
 *
 *   - `buildRgCommand`  — content search via ripgrep
 *   - `buildFdCommand`  — filename search via fd
 *
 * Both take the same `SearchInput` shape; the node runner picks
 * which to call based on `input.name`.
 */

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

export function buildRgCommand(input: SearchInput): { bin: string; args: string[] } {
  const bin = 'rg'
  const args: string[] = []

  if (input.fixed) args.push('-F')
  if (input.ignoreCase) args.push('-i')
  if (input.hidden) {
    args.push('--hidden', '--no-ignore')
  }
  if (input.files) args.push('-l')
  if (input.count) args.push('-c')
  if (input.type) args.push('-g', `*.${input.type}`)
  if (typeof input.maxCount === 'number') {
    args.push('-m', String(input.maxCount))
  }

  if (input.pattern !== undefined) args.push(input.pattern)
  if (input.path) args.push(input.path)

  return { bin, args }
}

export function buildFdCommand(input: SearchInput): { bin: string; args: string[] } {
  const bin = 'fd'
  const args: string[] = []

  if (input.fixed) args.push('--fixed-strings')
  if (input.ignoreCase) args.push('--ignore-case')
  if (input.hidden) {
    args.push('--hidden', '--no-ignore')
  }
  if (input.type) args.push('-e', input.type)
  if (typeof input.maxCount === 'number') {
    args.push('--max-results', String(input.maxCount))
  }

  if (input.pattern !== undefined) args.push(input.pattern)
  if (input.path) args.push(input.path)

  return { bin, args }
}
