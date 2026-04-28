import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task trust tls',
  describe: 'Install a CA cert into the OS trust store',
  options: [
    { long: 'name', describe: 'Friendly name (Linux filename, keychain label)' },
  ],
  examples: [
    { comment: 'install mkcert\'s local CA on macOS', command: 'sudo task trust tls "$(mkcert -CAROOT)/rootCA.pem"' },
    { comment: 'with a friendly name', command: 'sudo task trust tls ./caddy-root.pem --name caddy-internal' },
  ],
})

export const trustTlsConsole: CommandModule = {
  command: 'tls <ca-path>',
  describe: 'Install a CA cert into the OS trust store',
  builder: y =>
    y
      .positional('ca-path', { type: 'string', demandOption: true })
      .option('name', { type: 'string' }),
  handler: async argv => {
    const { trustTlsNode } = await import('./node')
    await trustTlsNode({
      caPath: argv['ca-path'] as string,
      name: argv.name as string | undefined,
    })
  },
}
