export function buildCommandToDisassembleJvm(input: {
  inputPath: string
  level?: string
  verbose?: boolean
  constants?: boolean
  lineNumbers?: boolean
  classpath?: string
  className?: string
}): { bin: 'javap'; args: string[] } {
  const args: string[] = []
  switch (input.level) {
    case 'public':
      args.push('-public')
      break
    case 'protected':
      args.push('-protected')
      break
    case 'package':
      args.push('-package')
      break
    default:
      args.push('-p')
      break
  }
  if (input.verbose) args.push('-v')
  if (input.constants) args.push('-constants')
  if (input.lineNumbers) args.push('-l')
  if (input.classpath) args.push('-classpath', input.classpath)
  if (input.className) args.push(input.className)
  else args.push(input.inputPath)
  return { bin: 'javap', args }
}
