import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task rotate secret',
  describe:
    'Generate a fresh random value for a secret key, write it to a configured store, optionally restart a dependent service',
  options: [
    { long: 'length', short: 'n', describe: 'Random byte length (default 32)' },
    { long: 'kind', short: 'k', describe: 'Encoding: hex / base64 / base64url / alphanumeric / urlsafe (default base64url)' },
    { long: 'store', describe: 'Backend store (default dotenv)' },
    { long: 'store-path', describe: 'Path to the store file (default ./.env)' },
    { long: 'value', describe: 'Use this exact value instead of generating one' },
    { long: 'quiet', short: 'q', describe: 'Suppress printing the new value' },
    { long: 'restart', describe: 'Run this command after the rotation succeeds' },
  ],
  examples: [
    { comment: 'rotate STRIPE_SECRET in .env', command: 'task rotate secret STRIPE_SECRET' },
    { comment: '64-byte hex', command: 'task rotate secret SESSION_KEY -n 64 -k hex' },
    { comment: 'rotate + restart a service', command: 'task rotate secret API_KEY --restart "systemctl restart app"' },
    { comment: 'rotate in a different env file', command: 'task rotate secret DB_PASSWORD --store-path .env.prod' },
  ],
})

export const rotateSecretConsole: CommandModule = {
  command: 'secret <key>',
  describe: 'Generate a fresh value for a secret key',
  builder: y =>
    y
      .positional('key', { type: 'string', demandOption: true })
      .option('length', { alias: 'n', type: 'number' })
      .option('kind', {
        alias: 'k',
        type: 'string',
        choices: ['hex', 'base64', 'base64url', 'alphanumeric', 'urlsafe'] as const,
      })
      .option('store', {
        type: 'string',
        choices: ['dotenv'] as const,
      })
      .option('store-path', { type: 'string' })
      .option('value', { type: 'string' })
      .option('quiet', { alias: 'q', type: 'boolean', default: false })
      .option('restart', { type: 'string' }),
  handler: async argv => {
    const { rotateSecretNode } = await import('./node')
    const restartCmd = argv.restart as string | undefined
    await rotateSecretNode({
      key: argv.key as string,
      length: argv.length as number | undefined,
      format: argv.kind as never,
      store: argv.store as 'dotenv' | undefined,
      storePath: argv['store-path'] as string | undefined,
      value: argv.value as string | undefined,
      quiet: argv.quiet as boolean,
      restart: restartCmd ? restartCmd.split(/\s+/) : undefined,
    })
  },
}
