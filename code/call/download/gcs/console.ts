import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const downloadGcsConsole = buildTransportConsole({
  protocol: 'gcs',
  direction: 'get',
  describe: 'Download from Google Cloud Storage (gsutil)',
  examples: [
    { comment: 'single object', command: 'task download gcs gs://bucket/key.bin ./key.bin' },
    { comment: 'whole prefix',  command: 'task download gcs gs://bucket/dir/ ./dir/ -r' },
  ],
})
