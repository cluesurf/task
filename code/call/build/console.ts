/**
 * `task build` — dual-mode top-level verb:
 *
 *   task build code [opts]    → zero-config project build
 *                                (alias for `task project build`)
 *   task build <file> [-o]    → single-file compile, language
 *                                inferred from extension
 *
 * Anything else falls through to a yargs error so users get a
 * clear "specify code or a file" message.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp, registerHelp } from '~/code/tool/node/log/registry'
import { buildCodeConsole } from './code/console'
import { langFromFile } from '~/code/tool/node/runner/extension'

registerGroupHelp({
  command: 'task build',
  describe: 'Build a project (zero-config) or compile a single file',
  commands: [
    { name: 'code',      describe: 'Project mode — infer ecosystem and run its build' },
    { name: '<file>',    describe: 'Single-file mode — compile by extension (.c .rs .go .hs ...)' },
  ],
})

registerHelp({
  command: 'task build <file>',
  describe: 'Compile a single source file (extension → compiler)',
  options: [
    { long: 'output', short: 'o', describe: 'Output path (default: sibling without extension)' },
    { long: 'lang',   short: 'l', describe: 'Force a language (override extension detection)' },
  ],
  examples: [
    { comment: 'C → binary',    command: 'task build foo.c' },
    { comment: 'Rust',          command: 'task build foo.rs -o foo' },
    { comment: 'Go',            command: 'task build foo.go' },
    { comment: 'Haskell',       command: 'task build foo.hs' },
    { comment: 'Coq (.v file)', command: 'task build foo.v' },
    { comment: 'Bend',          command: 'task build main.bend' },
    { comment: 'force language', command: 'task build foo.txt -l c' },
  ],
})

export const buildConsole: CommandModule = {
  command: 'build <thing>',
  describe: 'Build a project or compile a single file',
  builder: y => y
    .command(buildCodeConsole)
    // Catch-all for `task build <file>` — anything that wasn't
    // matched as `code` falls here.
    .command({
      command: '$0 <file>',
      describe: 'Compile a single file (extension → compiler)',
      builder: yy => yy
        .positional('file', { type: 'string' })
        .option('output', { alias: 'o', type: 'string' })
        .option('lang',   { alias: 'l', type: 'string' }),
      handler: async argv => {
        const file = (argv as unknown as { file: string }).file
        const forcedLang = (argv as unknown as { lang?: string }).lang
        const output = (argv as unknown as { output?: string }).output
        const lang = forcedLang ?? langFromFile(file)
        if (!lang) {
          throw new Error(
            `task build: cannot infer language for "${file}". ` +
            `Pass -l <lang> (c / cpp / rust / go / haskell / coq / bend / ...).`,
          )
        }
        // Re-dispatch through the existing `task compile <lang>`.
        // Cheaper than re-inlining each compile command builder.
        const yargs = (await import('yargs')).default
        const args = ['compile', lang as string, file]
        if (output) args.push('-o', output)
        await yargs(args)
          .command((await import('~/code/call/compile/console')).compileConsole)
          .parse()
      },
    })
    .demandCommand(1, 'Specify `code` or a source file'),
  handler: () => {},
}
