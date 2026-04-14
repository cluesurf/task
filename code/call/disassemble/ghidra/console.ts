import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

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

export const disassembleGhidraConsole: CommandModule = {
  command: 'ghidra <file>',
  describe: 'Headless Ghidra analyze + export',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output',       { alias: 'o', type: 'string' })
      .option('profile',      { type: 'string', choices: ['functions','calls','imports','exports','strings'] as const })
      .option('script',       { type: 'string' })
      .option('ghidra-home',  { type: 'string' })
      .option('project-dir',  { type: 'string' })
      .option('project-name', { type: 'string' })
      .option('keep-project', { type: 'boolean' })
      .option('verbose',      { type: 'boolean' })
      .option('quiet',        { alias: 'q', type: 'boolean' }),
  handler: async argv => {
    const { disassembleGhidraNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
      profile: argv.profile as 'functions' | 'calls' | 'imports' | 'exports' | 'strings' | undefined,
      script: argv.script as string | undefined,
      ghidraHome: argv['ghidra-home'] as string | undefined,
      projectDir: argv['project-dir'] as string | undefined,
      projectName: argv['project-name'] as string | undefined,
      keepProject: argv['keep-project'] as boolean | undefined,
      verbose: argv.verbose as boolean | undefined,
      quiet: argv.quiet as boolean | undefined,
    }
    await runAction({
      action: 'disassemble',
      input: input as unknown as Record<string, unknown>,
      run: () => disassembleGhidraNode(input),
    })
  },
}
