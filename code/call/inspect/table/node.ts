// Postgres table inspection. Returns columns (name, type, nullable,
// default), row count, and indexes.

import { spawnAndCapture } from '~/code/tool/node/spawn'
import { buildCommandToInspectTable } from './command'

export type InspectTableNodeInput = {
  /** `table` or `schema.table`. */
  table: string
  /** Database to connect to. Overrides PGDATABASE. */
  db?: string
}

async function inspectTableNode(
  source: InspectTableNodeInput,
): Promise<string> {
  const command = buildCommandToInspectTable({
    table: source.table,
    db: source.db,
  })
  return await spawnAndCapture({
    verb: 'inspect table',
    bin: command.bin,
    args: command.args,
  })
}

export default inspectTableNode
export { inspectTableNode }
