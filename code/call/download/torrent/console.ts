import { buildTransportConsole } from '~/code/tool/node/transport/console'

export const downloadTorrentConsole = buildTransportConsole({
  protocol: 'torrent',
  direction: 'get',
  describe: 'Download a magnet / .torrent (aria2c with BT+DHT)',
  examples: [
    { comment: 'magnet',      command: 'task download torrent "magnet:?xt=urn:btih:..." ./downloads' },
    { comment: '.torrent',    command: 'task download torrent ./file.torrent ./downloads' },
    { comment: 'also seed',   command: 'task download torrent magnet:... ./downloads --seed-time 60' },
  ],
})
