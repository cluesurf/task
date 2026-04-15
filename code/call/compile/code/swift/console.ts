import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/compile/code/swift/console/options'

export const compileSwiftConsole = buildActionCommand({
  command: 'swift',
  describe: 'Compile Swift source to a binary artifact',
  options,
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'compile a Swift file to a binary',
      command:
        'task compile swift -i hello.swift -o hello -O binary',
    },
  ],
})
