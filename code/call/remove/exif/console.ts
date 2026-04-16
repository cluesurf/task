import type { Argv, CommandModule } from 'yargs'
import { runAction } from '~/code/tool/node/log'
import { registerHelp } from '~/code/tool/node/log/registry'
import { argvBool, argvString, argvStringArray } from '~/code/tool/shared/verb'

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

function builder(y: Argv) {
  return y
    .positional('file', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('tag', { alias: 't', type: 'array', string: true })
    .option('preset', { type: 'array', string: true })
    .option('overwrite', { type: 'boolean' })
}

async function handler(argv: Record<string, unknown>) {
  const { removeExifNode } = await import('./node')
  const filePath = argvString(argv.file) ?? ''
  const outputPath = argvString(argv.output)
  const tag = argvStringArray(argv.tag)
  const preset = argvStringArray(argv.preset)
  const overwrite = argvBool(argv.overwrite)
  await runAction({
    action: 'remove',
    input: { file: filePath, tag, preset } as Record<string, unknown>,
    run: () =>
      removeExifNode({
        handle: 'internal' as const,
        input: { file: { path: filePath } },
        output: { file: { path: outputPath ?? '' } },
        tag,
        preset,
        overwrite,
      }),
  })
}

export const removeExifConsole: CommandModule = {
  command: 'exif <file>',
  describe: 'Strip specific EXIF tags from a file',
  builder,
  handler,
}
