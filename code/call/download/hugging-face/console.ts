/**
 * Yargs subcommand definition for `task download hugging-face`.
 *
 * Options are derived from `download_hugging_face_command_input`
 * (generated from `./base.ts` and `code/base/hugging-face/base.ts`
 * via `pnpm make:type`). Handler lazy-imports `./node` so the
 * `hf` CLI wrapper isn't loaded until the command runs.
 */

import type { CommandModule } from 'yargs'
import {
  applyFormOptions,
  unpackFormArgv,
} from '~/code/tool/shared/console'
import { options } from '~/code/form/action/download/hugging-face/console/options'

export const downloadHuggingFaceConsole: CommandModule = {
  command: 'hugging-face',
  describe: 'Download a HuggingFace repo to a local directory',
  builder: y => applyFormOptions(y, options),
  handler: async argv => {
    const input = unpackFormArgv(
      argv as Record<string, unknown>,
      options,
    )
    const { downloadHuggingFaceNode } = await import('./node')
    await downloadHuggingFaceNode(input as never)
  },
}
