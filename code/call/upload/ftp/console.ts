import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const uploadFtpConsole = buildTransportConsole({
  protocol: 'ftp',
  direction: 'put',
  describe: 'Upload to an FTP / FTPS server (curl)',
  examples: [
    { comment: 'auth', command: 'task upload ftp ./file.zip ftp://host/incoming/file.zip --user me --password secret' },
  ],
})
