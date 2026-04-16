// Postgres inspection. Connection config comes from standard
// `PG*` env vars (PGHOST / PGPORT / PGUSER / PGPASSWORD); the
// `db` positional overrides PGDATABASE.
//
// Examples:
//   task inspect db mydb --tables
//   task inspect db mydb --schemas
//   task inspect db mydb --size

import { spawnAndCapture } from '~/code/tool/node/spawn'
import { buildCommandToInspectDb } from './command'

export type InspectDbNodeInput = {
  db: string
  show?: 'tables' | 'schemas' | 'size' | 'extensions' | 'roles'
}

async function inspectDbNode(
  source: InspectDbNodeInput,
): Promise<string> {
  const command = buildCommandToInspectDb({
    db: source.db,
    show: source.show,
  })
  return await spawnAndCapture({
    verb: 'inspect db',
    bin: command.bin,
    args: command.args,
  })
}

export default inspectDbNode
export { inspectDbNode }
