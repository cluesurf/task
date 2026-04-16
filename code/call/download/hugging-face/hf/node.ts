/**
 * Execute `hf download` by spawning the CLI. Uses the argv
 * assembled in `./command.ts`.
 *
 * Requires the user to have authenticated (`hf auth login`) or
 * have `HF_TOKEN` set in the environment.
 */

import { spawnSync } from 'node:child_process'
import {
  BuildHfDownloadInput,
  buildCommandToDownloadHf,
} from './command'

function runHfDownload(input: BuildHfDownloadInput): void {
  const argv = buildCommandToDownloadHf(input)
  const [cmd, ...args] = argv
  if (!cmd) return
  const result = spawnSync(cmd, args, { stdio: 'inherit' })
  if (result.status !== 0) {
    throw new Error(
      `hf download failed with exit code ${result.status ?? 'unknown'}`,
    )
  }
}

export default runHfDownload
export { runHfDownload }
