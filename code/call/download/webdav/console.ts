import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const downloadWebdavConsole = buildTransportConsole({
  protocol: 'webdav',
  direction: 'get',
  describe: 'Download from a WebDAV endpoint (curl)',
  examples: [
    { comment: 'nextcloud', command: 'task download webdav https://cloud.example.com/remote.php/dav/files/me/a.txt ./a.txt --user me --password pat' },
  ],
})
