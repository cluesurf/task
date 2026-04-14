import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task copy environment',
  describe: 'Copy the value of an environment variable to the clipboard',
  options: [
    { long: 'file', describe: 'Read from a .env file instead of process env' },
  ],
  examples: [
    { comment: 'copy from live env', command: 'task copy environment HOME' },
    { comment: 'copy from .env file', command: 'task copy environment API_KEY --file .env.prod' },
  ],
})

export const copyEnvironmentConsole: CommandModule = {
  command: 'environment <name>',
  describe: 'Copy the value of an environment variable to the clipboard',
  builder: y =>
    y
      .positional('name', { type: 'string', describe: 'Variable name' })
      .option('file', { type: 'string' }),
  handler: async argv => {
    const { copyEnvironmentNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      name: argv.name as string,
      file: argv.file as string | undefined,
    }
    await runAction({
      action: 'copy',
      input: input as unknown as Record<string, unknown>,
      run: () => copyEnvironmentNode(input),
    })
  },
}
