import type { CommandModule } from 'yargs'
import { cfCommonFlags, printJson, resolveCfRange, resolveCfZone } from '~/code/tool/node/cloudflare-cli'

export const searchRequestConsole: CommandModule = {
  command: 'request <query>',
  describe:
    'Search Cloudflare request logs with simple `key:value` filters (status:500 path:/api method:GET)',
  builder: y =>
    cfCommonFlags(y)
      .positional('query', { type: 'string', demandOption: true })
      .option('limit', { type: 'number', default: 100 }),
  handler: async argv => {
    const { searchRequests } = await import('~/code/tool/node/cloudflare')
    printJson(
      await searchRequests(
        await resolveCfZone(argv.zone as string | undefined),
        argv.query as string,
        {
          range: await resolveCfRange(argv.range as string | undefined),
          limit: argv.limit as number,
        },
      ),
    )
  },
}
