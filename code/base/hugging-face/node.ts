/**
 * Thin wrapper around the HuggingFace `hf` CLI.
 *
 * Requires the user to have authenticated (`hf auth login`) or
 * have `HF_TOKEN` set in the environment.
 */

import { execSync } from 'node:child_process'

export type HfDownloadInput = {
  repo: string
  repoType?: 'dataset' | 'model' | 'space'
  localDir: string
  include?: string[]
  exclude?: string[]
  revision?: string
}

export function runHfDownload(input: HfDownloadInput): void {
  const parts = ['hf', 'download', shellQuote(input.repo)]
  if (input.repoType) {
    parts.push('--repo-type', input.repoType)
  }
  parts.push('--local-dir', shellQuote(input.localDir))
  if (input.revision) {
    parts.push('--revision', shellQuote(input.revision))
  }
  for (const g of input.include ?? []) {
    parts.push('--include', shellQuote(g))
  }
  for (const g of input.exclude ?? []) {
    parts.push('--exclude', shellQuote(g))
  }

  execSync(parts.join(' '), { stdio: 'inherit' })
}

function shellQuote(s: string): string {
  return `'${s.replace(/'/g, `'\\''`)}'`
}
