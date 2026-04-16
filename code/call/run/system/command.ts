export type RunSystemAction = 'sleep' | 'lock' | 'shutdown' | 'restart'

export function buildCommandToRunSystem(input: {
  action: RunSystemAction
  delay?: number
  platform: NodeJS.Platform
}): { bin: string; args: string[] } {
  const mac = input.platform === 'darwin'
  switch (input.action) {
    case 'sleep':
      return mac
        ? { bin: 'pmset', args: ['sleepnow'] }
        : { bin: 'systemctl', args: ['suspend'] }
    case 'lock':
      return mac
        ? {
            bin: 'osascript',
            args: [
              '-e',
              'tell application "System Events" to keystroke "q" using {control down, command down}',
            ],
          }
        : { bin: 'loginctl', args: ['lock-session'] }
    case 'shutdown': {
      const d = input.delay ?? 0
      return mac
        ? { bin: 'sudo', args: ['shutdown', '-h', `+${d}`] }
        : {
            bin: 'sudo',
            args: ['shutdown', '-h', `+${Math.ceil(d / 60)}`],
          }
    }
    case 'restart': {
      const d = input.delay ?? 0
      return mac
        ? { bin: 'sudo', args: ['shutdown', '-r', `+${d}`] }
        : {
            bin: 'sudo',
            args: ['shutdown', '-r', `+${Math.ceil(d / 60)}`],
          }
    }
  }
}
