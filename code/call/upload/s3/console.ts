import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const uploadS3Console = buildTransportConsole({
  protocol: 's3',
  direction: 'put',
  describe: 'Upload to S3 (also Cloudflare R2 via --endpoint)',
  examples: [
    { comment: 'single file',   command: 'task upload s3 ./key.bin s3://bucket/key.bin' },
    { comment: 'whole folder',  command: 'task upload s3 ./dir/ s3://bucket/dir/ -r' },
    { comment: 'Cloudflare R2', command: 'task upload s3 ./key s3://bucket/key --endpoint https://<acct>.r2.cloudflarestorage.com' },
  ],
})
