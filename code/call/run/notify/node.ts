// Desktop notification. macOS uses `osascript display notification`,
// Linux uses `notify-send` (libnotify). Silent no-op on other OSes.

import { exec } from '~/code/tool/node/process'

export type RunNotifyNodeInput = {
  message: string
  title?: string
  /** Play a system sound with the notification. */
  sound?: boolean
  /** Urgency (Linux only). */
  urgency?: 'low' | 'normal' | 'critical'
}

export async function runNotifyNode(source: RunNotifyNodeInput): Promise<void> {
  if (process.platform === 'darwin') {
    const title = source.title ?? 'task'
    const soundPart = source.sound ? ' sound name "Glass"' : ''
    const script = `display notification "${esc(source.message)}" with title "${esc(title)}"${soundPart}`
    await exec(['osascript', '-e', script])
    return
  }
  if (process.platform === 'linux') {
    const argv = ['notify-send']
    if (source.urgency) argv.push('-u', source.urgency)
    if (source.title) argv.push(source.title)
    argv.push(source.message)
    await exec(argv)
    return
  }
}

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}
