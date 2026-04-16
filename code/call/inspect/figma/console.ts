import type { CommandModule } from 'yargs'
import { resolveFileKey } from '~/code/tool/node/figma'

export const inspectFigmaConsole: CommandModule = {
  command: 'figma <url>',
  describe: 'Summarize a Figma file (pages, frames, components, version)',
  builder: y =>
    y
      .positional('url', {
        type: 'string',
        demandOption: true,
        describe: 'figma.com/file/... URL or bare file key',
      })
      .option('show', {
        choices: ['overview', 'pages', 'components'] as const,
        default: 'overview',
      }),
  handler: async argv => {
    const { inspectFigmaNode } = await import('./node')
    await inspectFigmaNode({
      fileKey: resolveFileKey(argv.url as string),
      show: argv.show as 'overview' | 'pages' | 'components',
    })
  },
}
