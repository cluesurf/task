// Desktop notification. macOS uses `osascript display notification`,
// Linux uses `notify-send` (libnotify). Silent no-op on other OSes.

import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToNotifyDarwin,
  buildCommandToNotifyLinux,
} from './command'

export type RunNotifyNodeInput = {
  message: string
  title?: string
  /** Play a system sound with the notification. */
  sound?: boolean
  /** Urgency (Linux only). */
  urgency?: 'low' | 'normal' | 'critical'
}

async function runNotifyNode(
  source: RunNotifyNodeInput,
): Promise<void> {
  if (process.platform === 'darwin') {
    const command = buildCommandToNotifyDarwin({
      message: source.message,
      title: source.title,
      sound: source.sound,
    })
    await spawnAndWait({
      verb: 'run notify',
      bin: command.bin,
      args: command.args,
    })
    return
  }
  if (process.platform === 'linux') {
    const command = buildCommandToNotifyLinux({
      message: source.message,
      title: source.title,
      urgency: source.urgency,
    })
    await spawnAndWait({
      verb: 'run notify',
      bin: command.bin,
      args: command.args,
    })
    return
  }
}

export default runNotifyNode
export { runNotifyNode }
