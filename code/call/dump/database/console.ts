import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { buildDatabaseConsole } from '~/code/tool/node/database/console'

const dumpDatabasePgConsole = buildDatabaseConsole({
  engine: 'pg', direction: 'dump',
  describe: 'PostgreSQL dump (pg_dump)',
  examples: [
    { comment: 'plain SQL',  command: 'task dump database pg --url postgres://u:p@h/db -o db.sql' },
    { comment: 'custom fmt', command: 'task dump database pg -d mydb --format custom -o db.dump' },
    { comment: 'schema only',command: 'task dump database pg -d mydb --schema-only -o schema.sql' },
  ],
})

const dumpDatabaseMysqlConsole = buildDatabaseConsole({
  engine: 'mysql', direction: 'dump',
  describe: 'MySQL / MariaDB dump (mysqldump)',
  examples: [
    { comment: 'whole db',     command: 'task dump database mysql -u root --password secret -d shop -o shop.sql' },
    { comment: 'select tables',command: 'task dump database mysql -d shop -t orders -t users -o tables.sql' },
  ],
})

const dumpDatabaseSqliteConsole = buildDatabaseConsole({
  engine: 'sqlite', direction: 'dump',
  describe: 'SQLite .dump',
  examples: [
    { comment: 'to file',  command: 'task dump database sqlite -f app.db -o app.sql' },
    { comment: 'to stdout',command: 'task dump database sqlite -f app.db' },
  ],
})

const dumpDatabaseMongoConsole = buildDatabaseConsole({
  engine: 'mongo', direction: 'dump',
  describe: 'MongoDB dump (mongodump)',
  examples: [
    { comment: 'whole db',  command: 'task dump database mongo --url mongodb://h/db -o ./mongo-dump' },
    { comment: 'no gzip',   command: 'task dump database mongo -d mydb -o ./mongo-dump --no-compress' },
  ],
})

registerGroupHelp({
  command: 'task dump database',
  describe: 'Dump a database (pg, mysql, sqlite, mongo)',
  commands: [
    { name: 'pg',     describe: 'PostgreSQL (pg_dump)' },
    { name: 'mysql',  describe: 'MySQL / MariaDB (mysqldump)' },
    { name: 'sqlite', describe: 'SQLite (.dump)' },
    { name: 'mongo',  describe: 'MongoDB (mongodump)' },
  ],
})

export const dumpDatabaseConsole: CommandModule = {
  command: 'database <engine>',
  describe: 'Dump a database',
  builder: y =>
    y
      .command(dumpDatabasePgConsole)
      .command(dumpDatabaseMysqlConsole)
      .command(dumpDatabaseSqliteConsole)
      .command(dumpDatabaseMongoConsole)
      .demandCommand(1, 'Specify a database engine'),
  handler: () => {},
}
