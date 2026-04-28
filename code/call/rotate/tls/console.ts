import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task rotate tls',
  describe: 'Rotate the local CA, reissue host certs, clean stale CAs',
  options: [
    { long: 'ca', describe: 'CA backend to rotate (default local / mkcert)' },
    { long: 'reissue', describe: 'Hosts to reissue after rotation (repeat or comma-separate)' },
  ],
  examples: [
    { comment: 'fresh local CA, reissue two hosts', command: 'task rotate tls --ca local --reissue app.dev --reissue api.dev' },
  ],
})

export const rotateTlsConsole: CommandModule = {
  command: 'tls',
  describe: 'Rotate the local CA + reissue host certs',
  builder: y =>
    y
      .option('ca', {
        type: 'string',
        choices: ['local'] as const,
        default: 'local',
      })
      .option('reissue', { type: 'array', string: true, default: [] }),
  handler: async argv => {
    const { rotateTlsNode } = await import('./node')
    const result = await rotateTlsNode({
      ca: argv.ca as 'local',
      reissue: argv.reissue as string[],
    })
    process.stdout.write(JSON.stringify(result, null, 2) + '\n')
  },
}
