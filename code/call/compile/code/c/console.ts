import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/compile/code/c/console/options'

export const compileCConsole = buildActionCommand({
  command: 'c',
  describe: 'Compile C source to a binary artifact',
  options,
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'compile a C file to a binary',
      command:
        'task compile c -i hello.c -o hello -O binary',
    },
  ],
})
