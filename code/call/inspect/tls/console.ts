import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task inspect tls',
  describe:
    'Fetch and summarize the TLS chain served by a host (subject / issuer / SAN / expiry / fingerprint)',
  options: [
    { long: 'port', short: 'p', describe: 'TCP port (default 443)' },
    { long: 'servername', describe: 'SNI server name (default = host)' },
    {
      long: 'starttls',
      describe:
        'Upgrade a plaintext protocol before TLS — one of smtp/imap/pop3/ftp/xmpp/postgres/mysql/...',
    },
  ],
  examples: [
    { comment: 'inspect a public site', command: 'task inspect tls clue.surf' },
    { comment: 'custom port', command: 'task inspect tls api.example.com -p 8443' },
    { comment: 'starttls upgrade', command: 'task inspect tls smtp.example.com -p 587 --starttls smtp' },
  ],
})

export const inspectTlsConsole: CommandModule = {
  command: 'tls <host>',
  describe: 'Summarize the TLS chain served by a host',
  builder: y =>
    y
      .positional('host', { type: 'string', demandOption: true })
      .option('port', { alias: 'p', type: 'number' })
      .option('servername', { type: 'string' })
      .option('starttls', {
        type: 'string',
        choices: [
          'smtp', 'imap', 'pop3', 'ftp', 'xmpp', 'lmtp', 'nntp',
          'irc', 'postgres', 'mysql',
        ] as const,
      }),
  handler: async argv => {
    const { inspectTlsNode } = await import('./node')
    const result = await inspectTlsNode({
      host: argv.host as string,
      port: argv.port as number | undefined,
      servername: argv.servername as string | undefined,
      starttls: argv.starttls as InspectTlsStartTls | undefined,
    })
    process.stdout.write(JSON.stringify(result, null, 2) + '\n')
  },
}

type InspectTlsStartTls =
  | 'smtp'
  | 'imap'
  | 'pop3'
  | 'ftp'
  | 'xmpp'
  | 'lmtp'
  | 'nntp'
  | 'irc'
  | 'postgres'
  | 'mysql'
