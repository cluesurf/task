import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const downloadIpfsConsole = buildTransportConsole({
  protocol: 'ipfs',
  direction: 'get',
  describe: 'Fetch content from IPFS (kubo)',
  examples: [
    { comment: 'by CID', command: 'task download ipfs bafy... ./out' },
  ],
})
