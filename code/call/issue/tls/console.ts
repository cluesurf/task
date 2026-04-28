import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task issue tls',
  describe: 'Mint a TLS cert signed by a locally-installed CA (mkcert)',
  options: [
    { long: 'cert-file', describe: 'Output cert path (default: <host>.pem)' },
    { long: 'key-file', describe: 'Output key path (default: <host>-key.pem)' },
    { long: 'install', describe: 'Install the local CA first (mkcert -install)' },
    { long: 'client', describe: 'Mint a client-auth cert' },
  ],
  examples: [
    { comment: 'first-time setup + mint a cert', command: 'task issue tls app.dev --install' },
    { comment: 'wildcard cert', command: 'task issue tls "*.app.dev" app.dev' },
    { comment: 'custom output paths', command: 'task issue tls app.dev --cert-file tls/app.crt --key-file tls/app.key' },
  ],
})

export const issueTlsConsole: CommandModule = {
  command: 'tls <hosts..>',
  describe: 'Mint a TLS cert signed by a locally-installed CA',
  builder: y =>
    y
      .positional('hosts', { type: 'string', array: true, demandOption: true })
      .option('cert-file', { type: 'string' })
      .option('key-file', { type: 'string' })
      .option('install', { type: 'boolean', default: false })
      .option('client', { type: 'boolean', default: false }),
  handler: async argv => {
    const { issueTlsNode } = await import('./node')
    const result = await issueTlsNode({
      hosts: argv.hosts as string[],
      certFile: argv['cert-file'] as string | undefined,
      keyFile: argv['key-file'] as string | undefined,
      install: argv.install as boolean,
      client: argv.client as boolean,
    })
    process.stdout.write(JSON.stringify(result, null, 2) + '\n')
  },
}
