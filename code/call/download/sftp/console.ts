import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const downloadSftpConsole = buildTransportConsole({
  protocol: 'sftp',
  direction: 'get',
  describe: 'Download from SSH / SFTP (scp)',
  examples: [
    { comment: 'single file', command: 'task download sftp user@host:/path/file ./file' },
    { comment: 'recursive',   command: 'task download sftp user@host:/dir ./dir -r' },
    { comment: 'with key',    command: 'task download sftp user@host:/path ./out -i ~/.ssh/prod' },
  ],
})
