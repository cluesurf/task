import type { CommandModule } from 'yargs'

export const measureUrlConsole: CommandModule = {
  command: 'url <url>',
  describe: 'Measure HTTP latency to a URL (DNS / connect / TTFB / total)',
  builder: y => y.positional('url', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { measureNode } = await import('../node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = { url: argv.url as string }
    await runAction({
      action: 'measure url',
      input: input as unknown as Record<string, unknown>,
      run: () => measureNode(input),
    })
  },
}
