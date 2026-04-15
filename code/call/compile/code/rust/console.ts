import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/compile/code/rust/console/options'

export const compileRustConsole = buildActionCommand({
  command: 'rust',
  describe: 'Compile Rust source to a binary artifact',
  options,
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'compile a Rust file to a binary',
      command:
        'task compile rust -i main.rs -o main -O binary',
    },
    {
      comment: 'compile a Rust file to assembly',
      command:
        'task compile rust -i main.rs -o main.asm -O assembly',
    },
  ],
})
