/**
 * CLI input for downloading a HuggingFace repo (dataset, model, or
 * space) to a local directory. Shells out to the `hf` CLI.
 */

export type HuggingFaceRepoType = 'dataset' | 'model' | 'space'

export type DownloadHuggingFaceCommandInput = {
  /** `<org>/<name>` slug, e.g. `cluesurf/leipzig-frequency`. */
  repo: string
  repoType?: HuggingFaceRepoType
  /** Local directory the repo is mirrored into. Created if missing. */
  directory: {
    path: string
  }
  /** Glob patterns to include. Empty = everything. */
  include?: string[]
  /** Glob patterns to exclude. */
  exclude?: string[]
  /** Pin to a specific revision / branch / tag. */
  revision?: string
  help?: boolean
}
