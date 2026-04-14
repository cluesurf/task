import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const loadEnvironmentConsole = buildActionCommand({
  command: 'environment',
  describe: 'Upsert a KEY=VALUE entry in a .env-style file',
  path: ['load', 'environment'],
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'load_environment',
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
