/**
 * `task list window` — enumerate visible top-level windows
 * with stable ids that `task record window <id>` accepts.
 *
 *   $ task list window
 *   ID                APP        TITLE                  BBOX
 *   501:abcd1234      Safari     ClueSurf — Safari      0,0 1440x900
 *   0x4400003         st         tmux: deploy           120,40 1024x768
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task list window',
  describe: 'List visible top-level windows (with ids `record window` accepts)',
  options: [
    { long: 'json',                  describe: 'Emit JSON instead of the table' },
    { long: 'app',  short: 'a',      describe: 'Filter to one app / process name (substring)' },
    { long: 'title', short: 't',     describe: 'Filter by window title (substring)' },
  ],
  examples: [
    { comment: 'every visible window',  command: 'task list window' },
    { comment: 'just Safari',           command: 'task list window --app safari' },
    { comment: 'JSON for pipelines',    command: 'task list window --json | jq .' },
  ],
})

export const listWindowConsole: CommandModule = {
  command: 'window',
  describe: 'List visible top-level windows with stable ids',
  builder: y => y
    .option('json',  { type: 'boolean' })
    .option('app',   { alias: 'a', type: 'string' })
    .option('title', { alias: 't', type: 'string' }),
  handler: async argv => {
    const { listWindows } = await import('~/code/tool/node/window/list')
    const { runAction } = await import('~/code/tool/node/log')
    await runAction({
      action: 'list',
      input: argv as unknown as Record<string, unknown>,
      run: async () => {
        let windows = await listWindows()
        const app = argv.app as string | undefined
        const title = argv.title as string | undefined
        if (app) {
          const lo = app.toLowerCase()
          windows = windows.filter(w => (w.app ?? '').toLowerCase().includes(lo))
        }
        if (title) {
          const lo = title.toLowerCase()
          windows = windows.filter(w => (w.title ?? '').toLowerCase().includes(lo))
        }
        if (argv.json) {
          process.stdout.write(JSON.stringify(windows, null, 2) + '\n')
          return
        }
        const rows: string[][] = [['ID', 'PID', 'APP', 'TITLE', 'BBOX']]
        for (const w of windows) {
          rows.push([
            w.id,
            w.pid !== undefined ? String(w.pid) : '',
            (w.app ?? '').slice(0, 24),
            (w.title ?? '').slice(0, 50),
            w.bbox ? `${w.bbox.x},${w.bbox.y} ${w.bbox.w}x${w.bbox.h}` : '',
          ])
        }
        process.stdout.write(formatTable(rows) + '\n')
      },
    })
  },
}

function formatTable(rows: string[][]): string {
  if (rows.length === 0) return ''
  const widths = rows[0]!.map((_, i) =>
    Math.max(...rows.map(r => (r[i] ?? '').length)),
  )
  return rows
    .map(r => r.map((c, i) => c.padEnd(widths[i]!)).join('  ').trimEnd())
    .join('\n')
}
