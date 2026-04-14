import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task get environment',
  describe: 'Read an environment variable from the process or a .env file',
  options: [
    { long: 'file', describe: 'Read from a specific .env file instead of process env' },
  ],
  examples: [
    { comment: 'read from live env', command: 'task get environment HOME' },
    { comment: 'read from a specific .env', command: 'task get environment API_KEY --file .env.prod' },
  ],
})

export const getEnvironmentConsole: CommandModule = {
  command: 'environment <name>',
  describe: 'Read an environment variable',
  builder: y =>
    y
      .positional('name', { type: 'string', describe: 'Variable name' })
      .option('file', { type: 'string' }),
  handler: async argv => {
    const { getEnvironmentNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      name: argv.name as string,
      file: argv.file as string | undefined,
    }
    await runAction({
      action: 'get',
      input: input as unknown as Record<string, unknown>,
      run: () => getEnvironmentNode(input),
    })
  },
}
