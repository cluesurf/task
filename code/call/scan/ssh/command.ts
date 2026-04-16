export function buildCommandToScanSsh(input: {
  host: string
  type?: string
}): { bin: 'ssh-keyscan'; args: string[] } {
  const args: string[] = []
  if (input.type) args.push('-t', input.type)
  args.push(input.host)
  return { bin: 'ssh-keyscan', args }
}
