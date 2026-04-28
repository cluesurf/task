import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task proxy tls',
  describe: 'Reverse-proxy a host over HTTPS via Caddy with auto-issued certs',
  options: [
    { long: 'to', describe: 'Upstream `host:port` to forward to' },
    { long: 'port', short: 'p', describe: 'Listener port (default 443)' },
    { long: 'internal', describe: "Use Caddy's internal CA (default true)" },
    { long: 'change-host', describe: 'Rewrite Host: header to the upstream' },
    { long: 'log', describe: 'Stream access logs' },
  ],
  examples: [
    { comment: 'one-command local HTTPS for a dev server', command: 'task proxy tls app.dev --to localhost:3000' },
    { comment: 'wildcard host on a non-default port', command: 'task proxy tls api.dev --to localhost:8080 -p 8443' },
  ],
})

export const proxyTlsConsole: CommandModule = {
  command: 'tls <from>',
  describe: 'Reverse-proxy a host over HTTPS via Caddy',
  builder: y =>
    y
      .positional('from', { type: 'string', demandOption: true })
      .option('to', { type: 'string', demandOption: true })
      .option('port', { alias: 'p', type: 'number' })
      .option('internal', { type: 'boolean', default: true })
      .option('change-host', { type: 'boolean', default: false })
      .option('log', { type: 'boolean', default: false }),
  handler: async argv => {
    const { proxyTlsNode } = await import('./node')
    await proxyTlsNode({
      from: argv.from as string,
      to: argv.to as string,
      port: argv.port as number | undefined,
      internal: argv.internal as boolean,
      changeHost: argv['change-host'] as boolean,
      log: argv.log as boolean,
    })
  },
}
