// Power / session control. sleep, lock, shutdown, restart.
// Cross-platform: macOS uses `pmset`, `shutdown`, and the lock
// keystroke via `osascript`. Linux uses `systemctl`/`loginctl`.

import { spawnAndWait } from '~/code/tool/node/spawn'
import { buildCommandToRunSystem } from './command'
import type { RunSystemAction } from './command'

export type { RunSystemAction }

export type RunSystemNodeInput = {
  action: RunSystemAction
  /** Delay in seconds before shutdown/restart. Default 0 (immediate). */
  delay?: number
}

async function runSystemNode(
  source: RunSystemNodeInput,
): Promise<void> {
  const command = buildCommandToRunSystem({
    action: source.action,
    delay: source.delay,
    platform: process.platform,
  })
  await spawnAndWait({
    verb: 'run system',
    bin: command.bin,
    args: command.args,
  })
}

export default runSystemNode
export { runSystemNode }
