import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvBool, argvString } from '~/code/tool/shared/verb'

registerHelp({
  command: 'task disassemble ghidra',
  describe: 'Headless Ghidra analyze + export (function list, call graph, strings)',
  options: [
    { long: 'output',         short: 'o', describe: 'Output path (default: <input>.<ext>)' },
    { long: 'profile',                    describe: 'functions | calls | imports | exports | strings (default: functions)' },
    { long: 'script',                     describe: 'Path to a custom Jython post-script (overrides profile)' },
    { long: 'ghidra-home',                describe: 'Ghidra install dir (or set GHIDRA_INSTALL_DIR)' },
    { long: 'project-dir',                describe: 'Use this project dir (default: temp)' },
    { long: 'project-name',               describe: 'Project name (default: task-disasm)' },
    { long: 'keep-project',               describe: 'Do not delete the temp project after running' },
    { long: 'verbose',                    describe: 'Detailed logs' },
    { long: 'quiet',          short: 'q', describe: 'Minimal output' },
  ],
  examples: [
    { comment: 'function list',       command: 'task disassemble ghidra ./hello' },
    { comment: 'call graph as DOT',   command: 'task disassemble ghidra ./hello --profile calls -o calls.dot' },
    { comment: 'imports + outputs',   command: 'task disassemble ghidra ./hello --profile imports -o imports.tsv' },
    { comment: 'custom script',       command: 'task disassemble ghidra ./hello --script ./MyExport.py' },
    { comment: 'with explicit home',  command: 'task disassemble ghidra ./hello --ghidra-home /opt/ghidra' },
  ],
})

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output',       { alias: 'o', type: 'string' })
    .option('profile',      { type: 'string', choices: ['functions','calls','imports','exports','strings'] as const })
    .option('script',       { type: 'string' })
    .option('ghidra-home',  { type: 'string' })
    .option('project-dir',  { type: 'string' })
    .option('project-name', { type: 'string' })
    .option('keep-project', { type: 'boolean' })
    .option('verbose',      { type: 'boolean' })
    .option('quiet',        { alias: 'q', type: 'boolean' })
}

async function handler(argv: Record<string, unknown>) {
  const { disassembleGhidraNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  const profile = argvString(argv.profile) as
    | 'functions'
    | 'calls'
    | 'imports'
    | 'exports'
    | 'strings'
    | undefined
  const script = argvString(argv.script)
  const ghidraHome = argvString(argv['ghidra-home'])
  const projectDir = argvString(argv['project-dir'])
  const projectName = argvString(argv['project-name'])
  const keepProject = argvBool(argv['keep-project'])
  const verbose = argvBool(argv.verbose)
  const quiet = argvBool(argv.quiet)
  await runAction({
    action: 'disassemble',
    input: { file: filePath } as Record<string, unknown>,
    run: () =>
      disassembleGhidraNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
        profile,
        script,
        ghidraHome,
        projectDir,
        projectName,
        keepProject,
        verbose,
        quiet,
      }),
  })
}

export const disassembleGhidraConsole: CommandModule = {
  command: 'ghidra <file>',
  describe: 'Headless Ghidra analyze + export',
  builder,
  handler,
}
