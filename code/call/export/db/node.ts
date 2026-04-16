// Export a Postgres table (or an arbitrary SELECT) to CSV / TSV /
// JSON via psql's `\copy`. `\copy` (client-side) is used instead
// of server-side `COPY` so the output file doesn't need server
// filesystem access.

import { spawnAndWait } from '~/code/tool/node/spawn'
import { ensureParentDir } from '~/code/tool/node/file'
import { buildCommandToExportDb } from './command'

export type ExportDbNodeInput = {
  db: string
  source: string
  output: { path: string }
  format?: 'csv' | 'tsv' | 'json'
  header?: boolean
}

async function exportDbNode(
  source: ExportDbNodeInput,
): Promise<void> {
  await ensureParentDir(source.output.path)
  const command = buildCommandToExportDb({
    db: source.db,
    source: source.source,
    outputPath: source.output.path,
    format: source.format,
    header: source.header,
  })
  await spawnAndWait({
    verb: 'export db',
    bin: command.bin,
    args: command.args,
  })
}

export default exportDbNode
export { exportDbNode }
