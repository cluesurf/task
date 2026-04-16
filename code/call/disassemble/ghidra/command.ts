import type { DisassembleGhidraNodeInput } from './shared'

export function buildCommandToDisassembleGhidra(input: {
  source: DisassembleGhidraNodeInput
  headlessBin: string
  projectDir: string
  projectName: string
  scriptDir: string
  scriptName: string
}): { bin: string; args: string[] } {
  const { source } = input
  const args = [
    input.projectDir,
    input.projectName,
    '-import',
    source.input,
    '-overwrite',
    // Tear down the project after we're done unless the caller opts
    // in to keeping it around for GUI inspection.
    '-deleteProject',
    '-scriptPath',
    input.scriptDir,
    '-postScript',
    input.scriptName,
  ]
  if (source.quiet) args.push('-log', '/dev/null')

  if (source.keepProject) {
    const i = args.indexOf('-deleteProject')
    if (i >= 0) args.splice(i, 1)
  }

  return { bin: input.headlessBin, args }
}
