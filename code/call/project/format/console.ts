import { buildProjectVerbConsole } from '~/code/tool/node/project-verb'
export const projectFormatConsole = buildProjectVerbConsole({
  verb: 'format',
  describe: 'Format the project source tree',
})
