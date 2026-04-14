import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const downloadS3Console = buildTransportConsole({
  protocol: 's3',
  direction: 'get',
  describe: 'Download from S3 (also Cloudflare R2 via --endpoint)',
  examples: [
    { comment: 'single object',     command: 'task download s3 s3://bucket/key.bin ./key.bin' },
    { comment: 'whole prefix',      command: 'task download s3 s3://bucket/dir/ ./dir/ -r' },
    { comment: 'Cloudflare R2',     command: 'task download s3 s3://bucket/key ./key --endpoint https://<acct>.r2.cloudflarestorage.com' },
  ],
})
