import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const downloadFtpConsole = buildTransportConsole({
  protocol: 'ftp',
  direction: 'get',
  describe: 'Download from an FTP / FTPS server (curl)',
  examples: [
    { comment: 'anonymous', command: 'task download ftp ftp://example.com/pub/file.zip ./file.zip' },
    { comment: 'auth',      command: 'task download ftp ftp://host/path ./out --user me --password secret' },
  ],
})
