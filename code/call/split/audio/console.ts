import { buildActionCommand } from '~/code/tool/shared/console'

export const splitAudioConsole = buildActionCommand({
  command: 'audio',
  describe: 'Split an audio file on silence or at fixed durations',
  // TODO: form split_audio missing from MESH — re-link schema
  options: [],
  path: ['split', 'audio'],
  loadHandler: () => import('./node'),
  examples: [
    { comment: 'split on silence', command: 'task split audio song.mp3 --segments silence' },
    { comment: 'fixed 30s chunks', command: 'task split audio song.mp3 --segments 30' },
    {
      comment: 'tighter silence detection',
      command: 'task split audio song.mp3 --segments silence --silence-db -40 --silence-duration 0.3',
    },
  ],
})
