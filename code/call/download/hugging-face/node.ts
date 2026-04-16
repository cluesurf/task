/**
 * High-level HuggingFace repo download.
 *
 * Types are generated from `./base.ts` into
 * `~/code/form/action/download/hugging-face/*` via `pnpm make:type`.
 */

import fs from 'node:fs'
import { runHfDownload } from './hf/node'

export type DownloadHuggingFaceNodeInput = {
  repo: string
  repoType?: 'dataset' | 'model' | 'space'
  directory: { path: string }
  include?: string[]
  exclude?: string[]
  revision?: string
}

async function downloadHuggingFaceNode(
  input: DownloadHuggingFaceNodeInput,
): Promise<{ directory: string }> {
  fs.mkdirSync(input.directory.path, { recursive: true })

  runHfDownload({
    repo: input.repo,
    repoType: input.repoType ?? 'dataset',
    localDir: input.directory.path,
    include: input.include,
    exclude: input.exclude,
    revision: input.revision,
  })

  return { directory: input.directory.path }
}

export default downloadHuggingFaceNode
export { downloadHuggingFaceNode }
