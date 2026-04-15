import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildZigCommand } from '~/code/tool/shared/compile/command'

export const compileZigConsole = buildCompileConsole({
  language: 'zig',
  describe: 'Compile a Zig source to a binary (zig build-exe)',
  builder: buildZigCommand,
  examples: [
    { comment: 'basic',          command: 'task compile zig main.zig -o app' },
    { comment: 'release-fast',   command: 'task compile zig main.zig -o app --extra "-OReleaseFast"' },
    { comment: 'cross-compile',  command: 'task compile zig main.zig -o app --extra "-target,x86_64-linux"' },
  ],
})
