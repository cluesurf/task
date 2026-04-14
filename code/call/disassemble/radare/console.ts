import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task disassemble radare',
  describe: 'Scripted radare2 / rizin session (analyze + dump)',
  options: [
    { long: 'output',   short: 'o', describe: 'Write session output to file (default: stdout)' },
    { long: 'tool',                 describe: 'radare2 (default) or rizin' },
    { long: 'script',               describe: 'Path to an r2 script (one command per line)' },
    { long: 'profile',              describe: 'functions | calls | strings | full (default: full)' },
    { long: 'command', short: 'C',  describe: 'Inline r2 command (repeatable)' },
  ],
  examples: [
    { comment: 'full dump',          command: 'task disassemble radare ./hello -o session.txt' },
    { comment: 'just function list', command: 'task disassemble radare ./hello --profile functions' },
    { comment: 'call graph in dot',  command: 'task disassemble radare ./hello --profile calls -o graph.dot' },
    { comment: 'use rizin',          command: 'task disassemble radare ./hello --tool rizin' },
    { comment: 'scripted',           command: 'task disassemble radare ./hello --script probe.r2' },
  ],
})

export const disassembleRadareConsole: CommandModule = {
  command: 'radare <file>',
  describe: 'Scripted radare2 / rizin session',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output',  { alias: 'o', type: 'string' })
      .option('tool',    { type: 'string', choices: ['radare2', 'rizin'] as const })
      .option('script',  { type: 'string' })
      .option('profile', { type: 'string', choices: ['functions', 'calls', 'strings', 'full'] as const })
      .option('command', { alias: 'C', type: 'array', string: true }),
  handler: async argv => {
    const { disassembleRadareNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
      tool: argv.tool as 'radare2' | 'rizin' | undefined,
      script: argv.script as string | undefined,
      profile: argv.profile as 'functions' | 'calls' | 'strings' | 'full' | undefined,
      commands: argv.command as string[] | undefined,
    }
    await runAction({
      action: 'disassemble',
      input: input as unknown as Record<string, unknown>,
      run: () => disassembleRadareNode(input),
    })
  },
}
