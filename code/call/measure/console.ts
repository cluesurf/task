import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task measure',
  describe: 'Measure HTTP latency to a URL (DNS / connect / TTFB / total)',
  options: [],
  examples: [
    { comment: 'simple GET', command: 'task measure https://example.com' },
  ],
})

export const measureConsole: CommandModule = {
  command: 'measure <url>',
  describe: 'Measure HTTP latency to a URL',
  builder: y => y.positional('url', { type: 'string', describe: 'Target URL' }),
  handler: async argv => {
    const { measureNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { url: argv.url as string }
    await runAction({
      action: 'measure',
      input: input as unknown as Record<string, unknown>,
      run: () => measureNode(input),
    })
  },
}
