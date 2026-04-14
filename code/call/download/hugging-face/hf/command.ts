/**
 * Build the `hf download` argv for a HuggingFace repo fetch.
 * Pure function — execution lives alongside in `./node.ts`.
 */

export type BuildHfDownloadInput = {
  repo: string
  repoType?: 'dataset' | 'model' | 'space'
  localDir: string
  include?: string[]
  exclude?: string[]
  revision?: string
}

export function buildCommandToDownloadHf(
  input: BuildHfDownloadInput,
): string[] {
  const parts: string[] = ['hf', 'download', input.repo]
  if (input.repoType) {
    parts.push('--repo-type', input.repoType)
  }
  parts.push('--local-dir', input.localDir)
  if (input.revision) {
    parts.push('--revision', input.revision)
  }
  for (const g of input.include ?? []) {
    parts.push('--include', g)
  }
  for (const g of input.exclude ?? []) {
    parts.push('--exclude', g)
  }
  return parts
}
