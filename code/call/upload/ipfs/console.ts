import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const uploadIpfsConsole = buildTransportConsole({
  protocol: 'ipfs',
  direction: 'put',
  describe: 'Add content to IPFS (kubo)',
  examples: [
    { comment: 'file',      command: 'task upload ipfs ./file' },
    { comment: 'directory', command: 'task upload ipfs ./dir -r' },
    { comment: 'CIDv1',     command: 'task upload ipfs ./file --cid-version 1' },
  ],
})
