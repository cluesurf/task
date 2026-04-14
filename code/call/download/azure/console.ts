import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const downloadAzureConsole = buildTransportConsole({
  protocol: 'azure',
  direction: 'get',
  describe: 'Download from Azure Blob Storage (az CLI)',
  examples: [
    { comment: 'blob to file',
      command: 'task download azure myblob ./file.bin --account acct --container data' },
  ],
})
