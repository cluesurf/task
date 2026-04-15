import type { CommandModule } from 'yargs'
import { resolveFlag } from '~/code/tool/node/context'

export const listDomainRecordConsole: CommandModule = {
  command: 'record <domain>',
  describe: 'List DNS records for a domain (DigitalOcean)',
  builder: y =>
    y
      .positional('domain', { type: 'string', demandOption: true })
      .option('platform', { alias: 'p', type: 'string' }),
  handler: async argv => {
    const { listDomainRecords } = await import('~/code/tool/node/doctl')
    await resolveFlag('platform', argv.platform as string | undefined)   // honored, only DO today
    process.stdout.write(await listDomainRecords(argv.domain as string))
  },
}
