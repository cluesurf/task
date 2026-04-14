import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const uploadSftpConsole = buildTransportConsole({
  protocol: 'sftp',
  direction: 'put',
  describe: 'Upload to SSH / SFTP (scp)',
  examples: [
    { comment: 'single file', command: 'task upload sftp ./file user@host:/path/file' },
    { comment: 'recursive',   command: 'task upload sftp ./dir user@host:/path/dir -r' },
  ],
})
