import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task verify tls',
  describe: 'Confirm the served TLS chain validates against the local trust store',
  options: [
    { long: 'port', short: 'p', describe: 'TCP port (default 443)' },
    { long: 'servername', describe: 'SNI server name (default = host)' },
    { long: 'timeout', describe: 'Connect timeout in ms (default 10000)' },
    { long: 'insecure', describe: 'Skip trust-store check; just probe the chain' },
  ],
  examples: [
    { comment: 'verify a public host', command: 'task verify tls clue.surf' },
    { comment: 'verify a local mkcert-signed dev server', command: 'task verify tls app.dev' },
    { comment: 'probe an intentionally untrusted chain', command: 'task verify tls self-signed.local --insecure' },
  ],
})

export const verifyTlsConsole: CommandModule = {
  command: 'tls <host>',
  describe: 'Verify the TLS chain validates against the local trust store',
  builder: y =>
    y
      .positional('host', { type: 'string', demandOption: true })
      .option('port', { alias: 'p', type: 'number' })
      .option('servername', { type: 'string' })
      .option('timeout', { type: 'number' })
      .option('insecure', { type: 'boolean', default: false }),
  handler: async argv => {
    const { verifyTlsNode } = await import('./node')
    const result = await verifyTlsNode({
      host: argv.host as string,
      port: argv.port as number | undefined,
      servername: argv.servername as string | undefined,
      timeout: argv.timeout as number | undefined,
      insecure: argv.insecure as boolean,
    })
    process.stdout.write(JSON.stringify(result, null, 2) + '\n')
    if (!result.trusted) process.exitCode = 1
  },
}
