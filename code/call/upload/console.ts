/**
 * `task upload <thing>` — symmetric to `task download`. Same
 * protocols, opposite direction.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { uploadS3Console } from './s3/console'
import { uploadGcsConsole } from './gcs/console'
import { uploadAzureConsole } from './azure/console'
import { uploadFtpConsole } from './ftp/console'
import { uploadSftpConsole } from './sftp/console'
import { uploadWebdavConsole } from './webdav/console'
import { uploadIpfsConsole } from './ipfs/console'

registerGroupHelp({
  command: 'task upload',
  describe: 'Upload to S3 / GCS / Azure / FTP / SFTP / WebDAV / IPFS',
  commands: [
    { name: 's3',     describe: 'S3 (also Cloudflare R2 via --endpoint)' },
    { name: 'gcs',    describe: 'Google Cloud Storage (gsutil)' },
    { name: 'azure',  describe: 'Azure Blob Storage (az CLI)' },
    { name: 'ftp',    describe: 'FTP / FTPS (curl)' },
    { name: 'sftp',   describe: 'SSH / SFTP (scp)' },
    { name: 'webdav', describe: 'WebDAV endpoint (curl)' },
    { name: 'ipfs',   describe: 'IPFS (kubo add)' },
  ],
})

export const uploadConsole: CommandModule = {
  command: 'upload <thing>',
  describe: 'Upload to remote storage',
  builder: y =>
    y
      .command(uploadS3Console)
      .command(uploadGcsConsole)
      .command(uploadAzureConsole)
      .command(uploadFtpConsole)
      .command(uploadSftpConsole)
      .command(uploadWebdavConsole)
      .command(uploadIpfsConsole)
      .demandCommand(1, 'Specify upload target'),
  handler: () => {},
}
