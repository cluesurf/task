/**
 * Cloud + network transport runner. Pure command builders live in
 * `~/code/tool/shared/transport/command`; this file just shells
 * each one out via `spawn` and surfaces a clean install hint when
 * the binary is missing.
 */

import { spawn } from 'node:child_process'
import {
  buildAzureCommand,
  buildFtpCommand,
  buildGcsCommand,
  buildIpfsCommand,
  buildS3Command,
  buildSftpCommand,
  buildTorrentCommand,
  buildWebdavCommand,
  type Direction,
  type TransportCommand,
  type TransportOptions,
} from '~/code/tool/shared/transport/command'

export type { Direction, TransportOptions } from '~/code/tool/shared/transport/command'

export const runS3      = (d: Direction, o: TransportOptions) => execTransport(buildS3Command(d, o))
export const runGcs     = (d: Direction, o: TransportOptions) => execTransport(buildGcsCommand(d, o))
export const runAzure   = (d: Direction, o: TransportOptions) => execTransport(buildAzureCommand(d, o))
export const runFtp     = (d: Direction, o: TransportOptions) => execTransport(buildFtpCommand(d, o))
export const runSftp    = (d: Direction, o: TransportOptions) => execTransport(buildSftpCommand(d, o))
export const runWebdav  = (d: Direction, o: TransportOptions) => execTransport(buildWebdavCommand(d, o))
export const runIpfs    = (d: Direction, o: TransportOptions) => execTransport(buildIpfsCommand(d, o))
export const runTorrent = (o: TransportOptions) => execTransport(buildTorrentCommand(o))

function execTransport(cmd: TransportCommand): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd.bin, cmd.args, { stdio: 'inherit' })
    child.on('error', err => {
      reject(new Error(
        (err as NodeJS.ErrnoException).code === 'ENOENT'
          ? `transport: \`${cmd.bin}\` not found. Install: ${cmd.install}`
          : `transport: ${cmd.bin} failed — ${(err as Error).message}`,
      ))
    })
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`transport: ${cmd.bin} exited with code ${code}`))
    })
  })
}
