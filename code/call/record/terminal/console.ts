import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task record terminal',
  describe: 'Record a terminal session via asciinema (.cast / autoplay .html embed)',
  options: [
    { long: 'output',    short: 'o', describe: 'Output .cast or .html file (.html emits a self-playing embed alongside the .cast)' },
    { long: 'command',   short: 'c', describe: 'Command to run (default $SHELL)' },
    { long: 'title',                 describe: 'Cast title (asciinema metadata)' },
    { long: 'idle-limit',            describe: 'Compress idle pauses to N seconds' },
    { long: 'overwrite',             describe: 'Replace output file if it exists' },
    { long: 'html',                  describe: 'Also write a sidecar HTML page with autoplay asciinema-player (auto when output ends in .html)' },
  ],
  examples: [
    { comment: 'record current shell',     command: 'task record terminal -o demo.cast' },
    { comment: 'record + autoplay embed',  command: 'task record terminal -o demo.html' },
    { comment: 'record one command',       command: 'task record terminal -o build.cast -c "pnpm make"' },
    { comment: 'compress dead air to 2s',  command: 'task record terminal -o slow.cast --idle-limit 2' },
  ],
})

export const recordTerminalConsole: CommandModule = {
  command: 'terminal',
  describe: 'Record a terminal session (asciinema .cast / autoplay .html)',
  builder: y => y
    .option('output',     { alias: 'o', type: 'string', demandOption: true })
    .option('command',    { alias: 'c', type: 'string' })
    .option('title',      { type: 'string' })
    .option('idle-limit', { type: 'number' })
    .option('overwrite',  { type: 'boolean' })
    .option('html',       { type: 'boolean' }),
  handler: async argv => {
    const { runRecordTerminal } = await import('~/code/tool/node/record/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      output: argv.output as string,
      command: argv.command as string | undefined,
      title: argv.title as string | undefined,
      idleLimit: argv['idle-limit'] as number | undefined,
      overwrite: argv.overwrite as boolean | undefined,
      html: argv.html as boolean | undefined,
    }
    await runAction({
      action: 'record',
      input: input as unknown as Record<string, unknown>,
      run: () => runRecordTerminal(input),
    })
  },
}
