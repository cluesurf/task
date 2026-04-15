// Cross-platform service control. Dispatches to `systemctl` on
// Linux and `launchctl` on macOS. Every public function takes
// `{ name }` (or no arg for list) and returns stdout as a string.

import { exec } from '~/code/tool/node/process'

const IS_MAC = process.platform === 'darwin'

export type ServiceAction = 'start' | 'stop' | 'restart' | 'enable' | 'disable'

export async function listServices({
  failed,
}: { failed?: boolean } = {}): Promise<string> {
  if (IS_MAC) {
    const { stdout } = await exec(['launchctl', 'list'])
    return stdout
  }
  const argv = failed
    ? ['systemctl', '--failed', '--no-legend', '--no-pager']
    : ['systemctl', 'list-units', '--type=service', '--no-legend', '--no-pager']
  const { stdout } = await exec(argv)
  return stdout
}

export async function inspectService(name: string): Promise<string> {
  if (IS_MAC) {
    const { stdout } = await exec(['launchctl', 'print', `system/${name}`])
    return stdout
  }
  const { stdout } = await exec(['systemctl', 'status', name, '--no-pager'])
  return stdout
}

export async function serviceLogs(name: string): Promise<string> {
  if (IS_MAC) {
    const { stdout } = await exec(['log', 'show', '--predicate', `subsystem == "${name}"`, '--last', '1h'])
    return stdout
  }
  const { stdout } = await exec(['journalctl', '-u', name, '--no-pager', '-n', '200'])
  return stdout
}

export async function controlService(
  action: ServiceAction,
  name: string,
): Promise<void> {
  if (IS_MAC) {
    // launchctl uses bootstrap/bootout for enable/disable, kickstart
    // for start, kill for stop. restart = kill + kickstart.
    switch (action) {
      case 'start':
        await exec(['launchctl', 'kickstart', `system/${name}`])
        return
      case 'stop':
        await exec(['launchctl', 'kill', 'SIGTERM', `system/${name}`])
        return
      case 'restart':
        await exec(['launchctl', 'kickstart', '-k', `system/${name}`])
        return
      case 'enable':
        await exec(['launchctl', 'enable', `system/${name}`])
        return
      case 'disable':
        await exec(['launchctl', 'disable', `system/${name}`])
        return
    }
  }
  // Linux: systemctl. Needs sudo for system units.
  await exec(['sudo', 'systemctl', action, name])
}
