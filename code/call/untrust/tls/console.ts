import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task untrust tls',
  describe: 'Remove a CA cert from the OS trust store by SHA-1 fingerprint',
  options: [
    { long: 'name', describe: 'CA filename to remove (Linux only)' },
  ],
  examples: [
    { comment: 'remove a stale CA by fingerprint', command: 'sudo task untrust tls D34DBEEF...' },
    { comment: 'on Linux, also pass --name', command: 'sudo task untrust tls D34DBEEF... --name caddy-internal' },
  ],
})

export const untrustTlsConsole: CommandModule = {
  command: 'tls <sha1>',
  describe: 'Remove a CA cert from the OS trust store',
  builder: y =>
    y
      .positional('sha1', { type: 'string', demandOption: true })
      .option('name', { type: 'string' }),
  handler: async argv => {
    const { untrustTlsNode } = await import('./node')
    await untrustTlsNode({
      sha1: argv.sha1 as string,
      name: argv.name as string | undefined,
    })
  },
}
