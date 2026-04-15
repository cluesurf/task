// Power / session control. sleep, lock, shutdown, restart.
// Cross-platform: macOS uses `pmset`, `shutdown`, and the lock
// keystroke via `osascript`. Linux uses `systemctl`/`loginctl`.

import { exec } from '~/code/tool/node/process'

export type RunSystemAction = 'sleep' | 'lock' | 'shutdown' | 'restart'

export type RunSystemNodeInput = {
  action: RunSystemAction
  /** Delay in seconds before shutdown/restart. Default 0 (immediate). */
  delay?: number
}

export async function runSystemNode(source: RunSystemNodeInput): Promise<void> {
  const mac = process.platform === 'darwin'
  switch (source.action) {
    case 'sleep':
      await exec(mac ? ['pmset', 'sleepnow'] : ['systemctl', 'suspend'])
      return
    case 'lock':
      await exec(
        mac
          ? ['osascript', '-e', 'tell application "System Events" to keystroke "q" using {control down, command down}']
          : ['loginctl', 'lock-session'],
      )
      return
    case 'shutdown':
      await exec(
        mac
          ? ['sudo', 'shutdown', '-h', `+${source.delay ?? 0}`]
          : ['sudo', 'shutdown', '-h', `+${Math.ceil((source.delay ?? 0) / 60)}`],
      )
      return
    case 'restart':
      await exec(
        mac
          ? ['sudo', 'shutdown', '-r', `+${source.delay ?? 0}`]
          : ['sudo', 'shutdown', '-r', `+${Math.ceil((source.delay ?? 0) / 60)}`],
      )
      return
  }
}
