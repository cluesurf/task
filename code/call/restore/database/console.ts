import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { buildDatabaseConsole } from '~/code/tool/node/database/console'

const restoreDatabasePgConsole = buildDatabaseConsole({
  engine: 'pg', direction: 'restore',
  describe: 'PostgreSQL restore (psql / pg_restore)',
  examples: [
    { comment: 'plain SQL',  command: 'task restore database pg -d mydb -i db.sql' },
    { comment: 'custom fmt', command: 'task restore database pg -d mydb --format custom -i db.dump' },
  ],
})

const restoreDatabaseMysqlConsole = buildDatabaseConsole({
  engine: 'mysql', direction: 'restore',
  describe: 'MySQL / MariaDB restore (mysql)',
  examples: [
    { comment: 'restore', command: 'task restore database mysql -u root --password secret -d shop -i shop.sql' },
  ],
})

const restoreDatabaseSqliteConsole = buildDatabaseConsole({
  engine: 'sqlite', direction: 'restore',
  describe: 'SQLite restore (sqlite3 < dump.sql)',
  examples: [
    { comment: 'restore', command: 'task restore database sqlite -f new.db -i app.sql' },
  ],
})

const restoreDatabaseMongoConsole = buildDatabaseConsole({
  engine: 'mongo', direction: 'restore',
  describe: 'MongoDB restore (mongorestore)',
  examples: [
    { comment: 'restore', command: 'task restore database mongo --url mongodb://h/db -i ./mongo-dump' },
  ],
})

registerGroupHelp({
  command: 'task restore database',
  describe: 'Restore a database (pg, mysql, sqlite, mongo)',
  commands: [
    { name: 'pg',     describe: 'PostgreSQL (psql / pg_restore)' },
    { name: 'mysql',  describe: 'MySQL / MariaDB (mysql)' },
    { name: 'sqlite', describe: 'SQLite (sqlite3 < dump)' },
    { name: 'mongo',  describe: 'MongoDB (mongorestore)' },
  ],
})

export const restoreDatabaseConsole: CommandModule = {
  command: 'database <engine>',
  describe: 'Restore a database',
  builder: y =>
    y
      .command(restoreDatabasePgConsole)
      .command(restoreDatabaseMysqlConsole)
      .command(restoreDatabaseSqliteConsole)
      .command(restoreDatabaseMongoConsole)
      .demandCommand(1, 'Specify a database engine'),
  handler: () => {},
}
