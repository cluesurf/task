import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvString, argvStringArray } from '~/code/tool/shared/verb'

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

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output',  { alias: 'o', type: 'string' })
    .option('tool',    { type: 'string', choices: ['radare2', 'rizin'] as const })
    .option('script',  { type: 'string' })
    .option('profile', { type: 'string', choices: ['functions', 'calls', 'strings', 'full'] as const })
    .option('command', { alias: 'C', type: 'array', string: true })
}

async function handler(argv: Record<string, unknown>) {
  const { disassembleRadareNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  const tool = argvString(argv.tool) as 'radare2' | 'rizin' | undefined
  const script = argvString(argv.script)
  const profile = argvString(argv.profile) as
    | 'functions'
    | 'calls'
    | 'strings'
    | 'full'
    | undefined
  const commands = argvStringArray(argv.command)
  await runAction({
    action: 'disassemble',
    input: { file: filePath } as Record<string, unknown>,
    run: () =>
      disassembleRadareNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
        tool,
        script,
        profile,
        commands,
      }),
  })
}

export const disassembleRadareConsole: CommandModule = {
  command: 'radare <file>',
  describe: 'Scripted radare2 / rizin session',
  builder,
  handler,
}
