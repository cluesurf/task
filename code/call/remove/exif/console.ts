import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task remove exif',
  describe: 'Strip specific EXIF tags (surgical — use `task remove metadata` for everything)',
  options: [
    { long: 'output',    short: 'o', describe: 'Output path (default: <stem>.noexif.<ext>)' },
    { long: 'tag',       short: 't', describe: 'Tag to clear, ExifTool name (repeatable)' },
    { long: 'preset',                describe: 'gps | device | user — batch clear a common set (repeatable)' },
    { long: 'overwrite',             describe: 'Modify the input in place (no backup copy)' },
  ],
  examples: [
    { comment: 'drop GPS only',       command: 'task remove exif photo.jpg --preset gps' },
    { comment: 'drop one tag',        command: 'task remove exif photo.jpg --tag GPSLatitude --tag GPSLongitude' },
    { comment: 'drop serial + owner', command: 'task remove exif photo.jpg --preset device --preset user' },
    { comment: 'in-place',            command: 'task remove exif photo.jpg --preset gps --overwrite' },
  ],
})

export const removeExifConsole: CommandModule = {
  command: 'exif <file>',
  describe: 'Strip specific EXIF tags from a file',
  builder: y =>
    y
      .positional('file', { type: 'string' })
      .option('output',    { alias: 'o', type: 'string' })
      .option('tag',       { alias: 't', type: 'array', string: true })
      .option('preset',    { type: 'array', string: true })
      .option('overwrite', { type: 'boolean' }),
  handler: async argv => {
    const { removeExifNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      input: argv.file as string,
      output: argv.output as string | undefined,
      tag: argv.tag as string[] | undefined,
      preset: argv.preset as ('gps' | 'device' | 'user')[] | undefined,
      overwrite: argv.overwrite as boolean | undefined,
    }
    await runAction({
      action: 'remove',
      input: input as unknown as Record<string, unknown>,
      run: () => removeExifNode(input),
    })
  },
}
