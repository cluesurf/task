import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const listAttackConsole: CommandModule = {
  command: 'attack',
  describe: 'Cloudflare firewall events (attacks, blocks, challenges)',
  builder: y =>
    cfCommonFlags(y)
      .option('filter', { type: 'string', describe: 'e.g. "type:ddos"' })
      .option('limit', { type: 'number', default: 100 }),
  handler: async argv => {
    const { listAttacks } = await import('~/code/tool/node/cloudflare')
    printJson(
      await listAttacks(await resolveCfZone(argv.zone as string | undefined), {
        filter: argv.filter as string | undefined,
        range: await resolveCfRange(argv.range as string | undefined),
      }),
    )
  },
}
