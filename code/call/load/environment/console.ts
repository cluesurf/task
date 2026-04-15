import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/load/environment/console/options'

export const loadEnvironmentConsole = buildActionCommand({
  command: 'environment',
  describe: 'Upsert a KEY=VALUE entry in a .env-style file',
  options,
  path: ['load', 'environment'],
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'set DATABASE_URL in .env',
      command:
        'task load environment --key DATABASE_URL --value postgres://localhost/app',
    },
    {
      comment: 'write to a custom env file',
      command:
        'task load environment -k API_KEY -v sk-... -f .env.production',
    },
  ],
})
