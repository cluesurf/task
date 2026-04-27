import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task check secret',
  describe: 'List secrets in a store with last-set / expiry info',
  options: [
    { long: 'store', describe: 'Backend store (default dotenv)' },
    { long: 'store-path', describe: 'Path to the store file (default ./.env)' },
    { long: 'reveal', describe: 'Print plain values too (off by default)' },
  ],
  examples: [
    { comment: 'list keys in .env (redacted)', command: 'task check secret' },
    { comment: 'inspect a different env file', command: 'task check secret --store-path .env.prod' },
    { comment: 'reveal values', command: 'task check secret --reveal' },
  ],
})

export const checkSecretConsole: CommandModule = {
  command: 'secret',
  describe: 'List secrets in a store with last-set info',
  builder: y =>
    y
      .option('store', {
        type: 'string',
        choices: ['dotenv'] as const,
      })
      .option('store-path', { type: 'string' })
      .option('reveal', { type: 'boolean', default: false }),
  handler: async argv => {
    const { checkSecretNode } = await import('./node')
    const result = await checkSecretNode({
      store: argv.store as 'dotenv' | undefined,
      storePath: argv['store-path'] as string | undefined,
      redact: !argv.reveal,
    })
    process.stdout.write(JSON.stringify(result, null, 2) + '\n')
  },
}
