/**
 * Yargs factory for `task dump database <engine>` and
 * `task restore database <engine>`. Same option set, two
 * directions, four engines.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'
import type { DbDirection, DbEngine, DbOptions } from './make'

export function buildDatabaseConsole(input: {
  engine: DbEngine
  direction: DbDirection
  describe: string
  examples: Array<{ comment: string; command: string }>
}): CommandModule {
  const { engine, direction, describe, examples } = input
  const verb = direction === 'dump' ? 'dump' : 'restore'

  registerHelp({
    command: `task ${verb} database ${engine}`,
    describe,
    options: optionsFor(engine, direction),
    examples,
  })

  return {
    command: engine,
    describe,
    builder: y => {
      let b = y
        .option('url',                   { type: 'string',  describe: 'Connection URL (overrides discrete fields)' })
        .option('host',     { alias: 'h', type: 'string' })
        .option('port',     { alias: 'p', type: 'number' })
        .option('user',     { alias: 'u', type: 'string' })
        .option('password',              { type: 'string' })
        .option('database', { alias: 'd', type: 'string' })
        .option('verbose',               { type: 'boolean' })
        .option('quiet',    { alias: 'q', type: 'boolean' })
      if (direction === 'dump') {
        b = b
          .option('output',  { alias: 'o', type: 'string', describe: 'Output file (default: stdout)' })
          .option('format',                { type: 'string',  describe: 'Dump format (engine-specific)' })
          .option('schema-only',           { type: 'boolean' })
          .option('data-only',             { type: 'boolean' })
          .option('table',   { alias: 't', type: 'array', string: true })
          .option('exclude',               { type: 'array', string: true })
          .option('compress',              { type: 'boolean' })
      } else {
        b = b.option('input',  { alias: 'i', type: 'string', describe: 'Input file (default: stdin)' })
      }
      if (engine === 'sqlite') {
        b = b.option('file',   { type: 'string', describe: 'Path to the .sqlite/.db file' })
      }
      return b
    },
    handler: async argv => {
      const mod = await import('./make')
      const { runAction } = await import('~/code/tool/node/log')
      const opts: DbOptions = {
        url: argv.url as string | undefined,
        host: argv.host as string | undefined,
        port: argv.port as number | undefined,
        user: argv.user as string | undefined,
        password: argv.password as string | undefined,
        database: argv.database as string | undefined,
        format: argv.format as DbOptions['format'],
        schemaOnly: argv['schema-only'] as boolean | undefined,
        dataOnly: argv['data-only'] as boolean | undefined,
        table: argv.table as string[] | undefined,
        exclude: argv.exclude as string[] | undefined,
        compress: argv.compress as boolean | undefined,
        file: argv.file as string | undefined,
        output: argv.output as string | undefined,
        input: argv.input as string | undefined,
        verbose: argv.verbose as boolean | undefined,
        quiet: argv.quiet as boolean | undefined,
      }
      await runAction({
        action: verb,
        input: opts as unknown as Record<string, unknown>,
        run: async () => {
          if (engine === 'pg' && direction === 'dump')      return mod.runPgDump(opts)
          if (engine === 'pg' && direction === 'restore')   return mod.runPgRestore(opts)
          if (engine === 'mysql' && direction === 'dump')   return mod.runMysqlDump(opts)
          if (engine === 'mysql' && direction === 'restore') return mod.runMysqlRestore(opts)
          if (engine === 'sqlite' && direction === 'dump')  return mod.runSqliteDump(opts)
          if (engine === 'sqlite' && direction === 'restore') return mod.runSqliteRestore(opts)
          if (engine === 'mongo' && direction === 'dump')   return mod.runMongoDump(opts)
          if (engine === 'mongo' && direction === 'restore') return mod.runMongoRestore(opts)
        },
      })
    },
  }
}

function optionsFor(engine: DbEngine, direction: DbDirection) {
  const base = [
    { long: 'url',                  describe: 'Connection URL (overrides discrete fields)' },
    { long: 'host',     short: 'h', describe: 'Host' },
    { long: 'port',     short: 'p', describe: 'Port' },
    { long: 'user',     short: 'u', describe: 'User' },
    { long: 'password',             describe: 'Password (prefer env / pgpass / .my.cnf)' },
    { long: 'database', short: 'd', describe: 'Database name' },
    { long: 'verbose',              describe: 'Detailed logs' },
    { long: 'quiet',    short: 'q', describe: 'Minimal output' },
  ]
  if (direction === 'dump') {
    base.push(
      { long: 'output',      short: 'o', describe: 'Output file (default: stdout)' },
      { long: 'format',                  describe: 'Dump format' },
      { long: 'schema-only',             describe: 'Schema only, no rows' },
      { long: 'data-only',               describe: 'Rows only, no schema' },
      { long: 'table',       short: 't', describe: 'Table to include (repeatable)' },
      { long: 'exclude',                 describe: 'Table to exclude (repeatable)' },
      { long: 'compress',                describe: 'Gzip dump output' },
    )
  } else {
    base.push({ long: 'input', short: 'i', describe: 'Input file (default: stdin)' })
  }
  if (engine === 'sqlite') {
    base.push({ long: 'file', describe: 'Path to the .sqlite / .db file' })
  }
  return base
}
