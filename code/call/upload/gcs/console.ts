import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const uploadGcsConsole = buildTransportConsole({
  protocol: 'gcs',
  direction: 'put',
  describe: 'Upload to Google Cloud Storage (gsutil)',
  examples: [
    { comment: 'single file',  command: 'task upload gcs ./key.bin gs://bucket/key.bin' },
    { comment: 'whole folder', command: 'task upload gcs ./dir/ gs://bucket/dir/ -r' },
  ],
})
