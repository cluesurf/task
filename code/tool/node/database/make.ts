/**
 * Database dump / restore runner. The pure command builders live
 * in `~/code/tool/shared/database/command` so the same shape can
 * be used in the browser to render or generate scripts. This file
 * pipes the resulting command through `spawn` with file
 * redirection.
 */

import fs from 'node:fs'
import { spawn } from 'node:child_process'
import {
  buildMongoDumpCommand,
  buildMongoRestoreCommand,
  buildMysqlDumpCommand,
  buildMysqlRestoreCommand,
  buildPgDumpCommand,
  buildPgRestoreCommand,
  buildSqliteDumpCommand,
  buildSqliteRestoreCommand,
  type DbCommand,
  type DbOptions,
} from '~/code/tool/shared/database/command'

export type { DbDirection, DbEngine, DbOptions } from '~/code/tool/shared/database/command'

export const runPgDump      = (o: DbOptions) => execDb(buildPgDumpCommand(o))
export const runPgRestore   = (o: DbOptions) => execDb(buildPgRestoreCommand(o))
export const runMysqlDump   = (o: DbOptions) => execDb(buildMysqlDumpCommand(o))
export const runMysqlRestore = (o: DbOptions) => execDb(buildMysqlRestoreCommand(o))
export const runSqliteDump  = (o: DbOptions) => execDb(buildSqliteDumpCommand(o))
export const runSqliteRestore = (o: DbOptions) => execDb(buildSqliteRestoreCommand(o))
export const runMongoDump   = (o: DbOptions) => execDb(buildMongoDumpCommand(o))
export const runMongoRestore = (o: DbOptions) => execDb(buildMongoRestoreCommand(o))

function execDb(cmd: DbCommand): Promise<void> {
  return new Promise((resolve, reject) => {
    const env = cmd.env ? { ...process.env, ...cmd.env } : process.env
    const stdin = cmd.pipeFrom ? fs.createReadStream(cmd.pipeFrom) : 'inherit'
    const stdout = cmd.captureTo ? fs.createWriteStream(cmd.captureTo) : 'inherit'
    const child = spawn(cmd.bin, cmd.args, {
      env,
      stdio: [
        stdin === 'inherit' ? 'inherit' : 'pipe',
        stdout === 'inherit' ? 'inherit' : 'pipe',
        'inherit',
      ],
    })
    if (stdin !== 'inherit') (stdin as fs.ReadStream).pipe(child.stdin!)
    if (stdout !== 'inherit') child.stdout!.pipe(stdout as fs.WriteStream)
    child.on('error', err => reject(makeErr(cmd, err)))
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`database: ${cmd.bin} exited with code ${code}`))
    })
  })
}

function makeErr(cmd: DbCommand, err: unknown): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `database: \`${cmd.bin}\` not found. Install: ${cmd.install}`
      : `database: ${cmd.bin} failed — ${(err as Error).message}`,
  )
}
