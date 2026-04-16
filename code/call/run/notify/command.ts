export type NotifyPlatform = 'darwin' | 'linux'

export function buildCommandToNotifyDarwin(input: {
  message: string
  title?: string
  sound?: boolean
}): { bin: 'osascript'; args: string[] } {
  const title = input.title ?? 'task'
  const soundPart = input.sound ? ' sound name "Glass"' : ''
  const script = `display notification "${esc(input.message)}" with title "${esc(title)}"${soundPart}`
  return { bin: 'osascript', args: ['-e', script] }
}

export function buildCommandToNotifyLinux(input: {
  message: string
  title?: string
  urgency?: 'low' | 'normal' | 'critical'
}): { bin: 'notify-send'; args: string[] } {
  const args: string[] = []
  if (input.urgency) args.push('-u', input.urgency)
  if (input.title) args.push(input.title)
  args.push(input.message)
  return { bin: 'notify-send', args }
}

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}
