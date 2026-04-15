import { buildFormatConsole } from '~/code/tool/node/format/console'
import { buildStyluaCommand } from '~/code/tool/shared/format/command'

export const formatLuaConsole = buildFormatConsole({
  language: 'lua',
  describe: 'Format Lua source (stylua)',
  builder: buildStyluaCommand,
  examples: [
    { comment: 'in-place', command: 'task format lua main.lua' },
    { comment: 'check',    command: 'task format lua main.lua --check' },
  ],
})
