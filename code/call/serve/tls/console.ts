import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task serve tls',
  describe: 'Serve a folder over HTTPS via Caddy with auto-issued certs',
  options: [
    { long: 'for', describe: 'Host(s) to serve (repeat for SAN)' },
    { long: 'port', short: 'p', describe: 'TCP port (default 443)' },
    { long: 'internal', describe: "Use Caddy's internal CA (skip ACME)" },
    { long: 'browse', describe: 'Show directory listings' },
  ],
  examples: [
    { comment: 'serve ./public on https://app.dev', command: 'task serve tls ./public --for app.dev --internal' },
    { comment: 'two hosts, custom port', command: 'task serve tls ./public --for app.dev --for api.dev -p 8443 --internal' },
  ],
})

export const serveTlsConsole: CommandModule = {
  command: 'tls <dir>',
  describe: 'Serve a folder over HTTPS via Caddy with auto-issued certs',
  builder: y =>
    y
      .positional('dir', { type: 'string', demandOption: true })
      .option('for', { type: 'array', string: true, demandOption: true })
      .option('port', { alias: 'p', type: 'number' })
      .option('internal', { type: 'boolean', default: true })
      .option('browse', { type: 'boolean', default: false }),
  handler: async argv => {
    const { serveTlsNode } = await import('./node')
    await serveTlsNode({
      dir: argv.dir as string,
      hosts: argv.for as string[],
      port: argv.port as number | undefined,
      internal: argv.internal as boolean,
      browse: argv.browse as boolean,
    })
  },
}
