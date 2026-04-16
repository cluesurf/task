export function buildCommandToDisassembleGhidra(input: {
  headlessBin: string
  inputPath: string
  projectDir: string
  projectName: string
  scriptDir: string
  scriptName: string
  keepProject?: boolean
  quiet?: boolean
}): { bin: string; args: string[] } {
  const args = [
    input.projectDir,
    input.projectName,
    '-import',
    input.inputPath,
    '-overwrite',
    '-deleteProject',
    '-scriptPath',
    input.scriptDir,
    '-postScript',
    input.scriptName,
  ]
  if (input.quiet) args.push('-log', '/dev/null')
  if (input.keepProject) {
    const i = args.indexOf('-deleteProject')
    if (i >= 0) args.splice(i, 1)
  }
  return { bin: input.headlessBin, args }
}
