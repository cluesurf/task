import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildTerraformFmtCommand } from '~/code/tool/shared/format/command'

export const formatTerraformConsole = buildFormatConsole({
  language: 'terraform',
  describe: 'Format Terraform / HCL (terraform fmt)',
  builder: buildTerraformFmtCommand,
  examples: [
    { comment: 'in-place', command: 'task format terraform main.tf' },
    { comment: 'check',    command: 'task format terraform main.tf --check' },
    { comment: 'whole dir',command: 'task format terraform .' },
  ],
})
