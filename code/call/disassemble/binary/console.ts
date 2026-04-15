import { buildActionCommand } from '~/code/tool/shared/console'

export const disassembleBinaryConsole = buildActionCommand({
  command: 'binary',
  describe: 'Disassemble a binary file to assembly',
  // TODO: form disassemble_binary_command_input missing from MESH — re-link schema
  options: [],
  examples: [
    {
      comment: 'disassemble an ELF binary to assembly',
      command:
        'task disassemble binary -i ./hello -o hello.asm',
    },
  ],
})
