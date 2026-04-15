import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task record terminal',
  describe: 'Record a terminal session via asciinema (.cast)',
  options: [
    { long: 'output',    short: 'o', describe: 'Output .cast file' },
    { long: 'command',   short: 'c', describe: 'Command to run (default $SHELL)' },
    { long: 'title',                 describe: 'Cast title (asciinema metadata)' },
    { long: 'idle-limit',            describe: 'Compress idle pauses to N seconds' },
    { long: 'overwrite',             describe: 'Replace output file if it exists' },
  ],
  examples: [
    { comment: 'record current shell',     command: 'task record terminal -o demo.cast' },
    { comment: 'record one command',       command: 'task record terminal -o build.cast -c "pnpm make"' },
    { comment: 'compress dead air to 2s',  command: 'task record terminal -o slow.cast --idle-limit 2' },
  ],
})

export const recordTerminalConsole: CommandModule = {
  command: 'terminal',
  describe: 'Record a terminal session (asciinema .cast)',
  builder: y => y
    .option('output',     { alias: 'o', type: 'string', demandOption: true })
    .option('command',    { alias: 'c', type: 'string' })
    .option('title',      { type: 'string' })
    .option('idle-limit', { type: 'number' })
    .option('overwrite',  { type: 'boolean' }),
  handler: async argv => {
    const { runRecordTerminal } = await import('~/code/tool/node/record/base')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      output: argv.output as string,
      command: argv.command as string | undefined,
      title: argv.title as string | undefined,
      idleLimit: argv['idle-limit'] as number | undefined,
      overwrite: argv.overwrite as boolean | undefined,
    }
    await runAction({
      action: 'record',
      input: input as unknown as Record<string, unknown>,
      run: () => runRecordTerminal(input),
    })
  },
}
