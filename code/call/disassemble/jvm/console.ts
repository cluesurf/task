import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvBool, argvString } from '~/code/tool/shared/verb'

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

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output',       { alias: 'o', type: 'string' })
    .option('level',        { type: 'string', choices: ['public','protected','package','private'] as const })
    .option('verbose',      { type: 'boolean' })
    .option('constants',    { type: 'boolean' })
    .option('line-numbers', { type: 'boolean' })
    .option('classpath',    { type: 'string' })
    .option('class-name',   { type: 'string' })
}

async function handler(argv: Record<string, unknown>) {
  const { disassembleJvmNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  const level = argvString(argv.level) as
    | 'public'
    | 'protected'
    | 'package'
    | 'private'
    | undefined
  const verbose = argvBool(argv.verbose)
  const constants = argvBool(argv.constants)
  const lineNumbers = argvBool(argv['line-numbers'])
  const classpath = argvString(argv.classpath)
  const className = argvString(argv['class-name'])
  await runAction({
    action: 'disassemble',
    input: { file: filePath } as Record<string, unknown>,
    run: () =>
      disassembleJvmNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
        level,
        verbose,
        constants,
        lineNumbers,
        classpath,
        className,
      }),
  })
}

export const disassembleJvmConsole: CommandModule = {
  command: 'jvm <file>',
  describe: 'JVM .class / .jar → bytecode listing',
  builder,
  handler,
}
