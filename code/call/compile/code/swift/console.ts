import * as MESH from '~/code/base'
import { buildActionCommand } from '~/code/tool/shared/cli'

export const compileSwiftConsole = buildActionCommand({
  command: 'swift',
  describe: 'Compile Swift source to a binary artifact',
  mesh: MESH as unknown as Record<string, unknown>,
  formName: 'compile_swift_command_input',
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'compile a Swift file to a binary',
      command:
        'task compile swift -i hello.swift -o hello -O binary',
    },
  ],
})
