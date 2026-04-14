import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task highlight log',
  describe: 'Color-highlight a log file by level / pattern as you read it',
  options: [
    { long: 'level', short: 'l', describe: 'Filter to rows at or above this level (error|warn|info|debug|trace)' },
    { long: 'text', short: 't', describe: 'Filter to rows whose message matches this substring' },
  ],
  examples: [
    { comment: 'errors only',     command: 'task highlight log app.log --level error' },
    { comment: 'warn and above',  command: 'task highlight log app.log -l warn' },
    { comment: 'grep for a word', command: 'task highlight log app.log -t timeout' },
  ],
})

export const highlightLogConsole: CommandModule = {
  command: 'log <file>',
  describe: 'Color-highlight a log file by level / pattern',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('level', { alias: 'l', type: 'string' })
      .option('text', { alias: 't', type: 'string' }),
  handler: async argv => {
    const { highlightLogNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      file: argv.file as string,
      level: argv.level as string | undefined,
      text: argv.text as string | undefined,
    }
    await runAction({
      action: 'highlight',
      input: input as unknown as Record<string, unknown>,
      run: () => highlightLogNode(input),
    })
  },
}
