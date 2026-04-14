import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const uploadAzureConsole = buildTransportConsole({
  protocol: 'azure',
  direction: 'put',
  describe: 'Upload to Azure Blob Storage (az CLI)',
  examples: [
    { comment: 'file → blob', command: 'task upload azure ./file.bin myblob --account acct --container data' },
  ],
})
