import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const compileRustConsole = buildActionCommand({
  command: 'rust',
  describe: 'Compile Rust source to a binary artifact',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'compile_rust_command_input',
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
