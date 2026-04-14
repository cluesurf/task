import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task disassemble jvm',
  describe: 'JVM .class / .jar entry → bytecode listing (javap)',
  options: [
    { long: 'output',      short: 'o', describe: 'Write to file (default: stdout)' },
    { long: 'level',                   describe: 'public | protected | package | private (default: private)' },
    { long: 'verbose',                 describe: 'Verbose listing (stack / locals / args)' },
    { long: 'constants',               describe: 'Show static final constants' },
    { long: 'line-numbers',            describe: 'Include line number + local variable tables' },
    { long: 'classpath',               describe: 'Java classpath (for class-name input)' },
    { long: 'class-name',              describe: 'Fully-qualified class name (instead of file)' },
  ],
  examples: [
    { comment: 'disassemble a .class', command: 'task disassemble jvm Main.class' },
    { comment: 'verbose + line numbers', command: 'task disassemble jvm Main.class --verbose --line-numbers' },
    { comment: 'by class name', command: 'task disassemble jvm --class-name com.example.App --classpath lib.jar' },
  ],
})

export const disassembleJvmConsole: CommandModule = {
  command: 'jvm <file>',
  describe: 'JVM .class / .jar → bytecode listing',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output',       { alias: 'o', type: 'string' })
      .option('level',        { type: 'string', choices: ['public','protected','package','private'] as const })
      .option('verbose',      { type: 'boolean' })
      .option('constants',    { type: 'boolean' })
      .option('line-numbers', { type: 'boolean' })
      .option('classpath',    { type: 'string' })
      .option('class-name',   { type: 'string' }),
  handler: async argv => {
    const { disassembleJvmNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
      level: argv.level as 'public' | 'protected' | 'package' | 'private' | undefined,
      verbose: argv.verbose as boolean | undefined,
      constants: argv.constants as boolean | undefined,
      lineNumbers: argv['line-numbers'] as boolean | undefined,
      classpath: argv.classpath as string | undefined,
      className: argv['class-name'] as string | undefined,
    }
    await runAction({
      action: 'disassemble',
      input: input as unknown as Record<string, unknown>,
      run: () => disassembleJvmNode(input),
    })
  },
}
