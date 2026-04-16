import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task container size',
  describe: 'Layer-by-layer size breakdown via dive',
  options: [
    { long: 'ci',                       describe: 'Non-interactive: pass/fail by layer waste threshold' },
    { long: 'highest-wasted',           describe: 'Max %% of allowed waste in any layer (default 10)' },
  ],
  examples: [
    { comment: 'interactive TUI',         command: 'task container size myapp:latest' },
    { comment: 'CI gate, fail above 5%',  command: 'task container size myapp:1.0 --ci --highest-wasted 5' },
  ],
})

export const containerSizeConsole: CommandModule = {
  command: 'size <image>',
  describe: 'Layer-by-layer size breakdown',
  builder: y => y
    .positional('image', { type: 'string' })
    .option('ci',             { type: 'boolean' })
    .option('highest-wasted', { type: 'number' }),
  handler: async argv => {
    const { runSize } = await import('~/code/tool/node/container/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      image: argv.image as string,
      ci: argv.ci as boolean | undefined,
      highestWasted: argv['highest-wasted'] as number | undefined,
    }
    await runAction({
      action: 'inspect',
      input: input as unknown as Record<string, unknown>,
      run: () => runSize(input),
    })
  },
}
