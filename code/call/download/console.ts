/**
 * Yargs command group for `task download <thing>`.
 *
 * Each concrete download-source exports its own `CommandModule` at
 * `./<thing>/console.ts`; this file collects them under the
 * `download` verb.
 */

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { downloadHuggingFaceConsole } from './hugging-face/console'
import { downloadS3Console } from './s3/console'
import { downloadGcsConsole } from './gcs/console'
import { downloadAzureConsole } from './azure/console'
import { downloadFtpConsole } from './ftp/console'
import { downloadSftpConsole } from './sftp/console'
import { downloadWebdavConsole } from './webdav/console'
import { downloadIpfsConsole } from './ipfs/console'
import { downloadTorrentConsole } from './torrent/console'
import { downloadVideoConsole } from './video/console'

registerGroupHelp({
  command: 'task download',
  describe: 'Download from cloud, network, or peer',
  commands: [
    { name: 'hugging-face', describe: 'Download a Hugging Face model or dataset' },
    { name: 's3',           describe: 'S3 (also Cloudflare R2 via --endpoint)' },
    { name: 'gcs',          describe: 'Google Cloud Storage (gsutil)' },
    { name: 'azure',        describe: 'Azure Blob Storage (az CLI)' },
    { name: 'ftp',          describe: 'FTP / FTPS (curl)' },
    { name: 'sftp',         describe: 'SSH / SFTP (scp)' },
    { name: 'webdav',       describe: 'WebDAV endpoint (curl)' },
    { name: 'ipfs',         describe: 'IPFS (kubo)' },
    { name: 'torrent',      describe: 'Magnet / .torrent (aria2c)' },
    { name: 'video',        describe: 'Video / audio off any yt-dlp-supported site (YouTube, TikTok, Vimeo, …)' },
  ],
})

export const downloadConsole: CommandModule = {
  command: 'download <thing>',
  describe: 'Download from external sources',
  builder: y =>
    y
      .command(downloadHuggingFaceConsole)
      .command(downloadS3Console)
      .command(downloadGcsConsole)
      .command(downloadAzureConsole)
      .command(downloadFtpConsole)
      .command(downloadSftpConsole)
      .command(downloadWebdavConsole)
      .command(downloadIpfsConsole)
      .command(downloadTorrentConsole)
      .command(downloadVideoConsole)
      .demandCommand(1, 'Specify what to download'),
  handler: () => {
    /* handled by subcommand */
  },
}
