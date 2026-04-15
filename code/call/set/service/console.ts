import type { CommandModule } from 'yargs'

export const setServiceConsole: CommandModule = {
  command: 'service <name>',
  describe: 'Enable / disable a system service on boot',
  builder: y =>
    y
      .positional('name', { type: 'string', demandOption: true })
      .option('enable', { type: 'boolean' })
      .option('disable', { type: 'boolean' })
      .conflicts('enable', 'disable'),
  handler: async argv => {
    const { setServiceNode } = await import('./node')
    await setServiceNode({
      name: argv.name as string,
      enable: argv.enable as boolean | undefined,
      disable: argv.disable as boolean | undefined,
    })
  },
}
