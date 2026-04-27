/**
 * `task download video <url>` — pull a video (or audio-only) off
 * any site yt-dlp supports. Spawns yt-dlp with a piped stdio so
 * progress shows live in the user's terminal.
 */

import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToDownloadVideoYtDlp,
  type DownloadVideoYtDlpCommandInput,
} from './command'

export type DownloadVideoYtDlpNodeInput = DownloadVideoYtDlpCommandInput

async function downloadVideoYtDlpNode(
  source: DownloadVideoYtDlpNodeInput,
): Promise<void> {
  const command = buildCommandToDownloadVideoYtDlp(source)
  await spawnAndWait({
    verb: 'download video',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })
}

export default downloadVideoYtDlpNode
export { downloadVideoYtDlpNode }
