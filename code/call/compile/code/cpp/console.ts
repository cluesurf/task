import { buildActionCommand } from '~/code/tool/shared/console'
import { options } from '~/code/form/action/compile/code/cpp/console/options'

export const compileCppConsole = buildActionCommand({
  command: 'cpp',
  describe: 'Compile C++ source to a binary artifact',
  options,
  loadHandler: () => import('./node'),
  examples: [
    {
      comment: 'compile a C++ file to a binary',
      command:
        'task compile cpp -i quicksort.cpp -o quicksort -O binary',
    },
  ],
})
