import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const uploadWebdavConsole = buildTransportConsole({
  protocol: 'webdav',
  direction: 'put',
  describe: 'Upload to a WebDAV endpoint (curl PUT)',
  examples: [
    { comment: 'nextcloud', command: 'task upload webdav ./a.txt https://cloud.example.com/remote.php/dav/files/me/a.txt --user me --password pat' },
  ],
})
