import type { CommandModule } from 'yargs'
import { resolveFileKey, type FigmaImageFormat } from '~/code/tool/node/figma'

export const exportFigmaConsole: CommandModule = {
  command: 'figma <url>',
  describe:
    'Export Figma frames / nodes as SVG / PNG / JPG / PDF (defaults: every top-level frame as SVG)',
  builder: y =>
    y
      .positional('url', {
        type: 'string',
        demandOption: true,
        describe: 'figma.com/file/... URL or bare file key',
      })
      .option('output', {
        alias: 'o',
        type: 'string',
        default: './figma',
        describe: 'Output directory',
      })
      .option('format', {
        choices: ['svg', 'png', 'jpg', 'pdf'] as const,
        default: 'svg',
      })
      .option('node', {
        type: 'string',
        array: true,
        describe: 'Specific node id(s). Omit to export every frame.',
      })
      .option('scale', {
        type: 'number',
        describe: 'Raster scale (png/jpg only). 1–4.',
      }),
  handler: async argv => {
    const { exportFigmaNode } = await import('./node')
    await exportFigmaNode({
      fileKey: resolveFileKey(argv.url as string),
      output: { path: argv.output as string },
      format: argv.format as FigmaImageFormat,
      nodeIds: argv.node as string[] | undefined,
      scale: argv.scale as number | undefined,
    })
  },
}
