/**
 * Factory for the per-protocol download / upload yargs subcommands.
 * Each protocol has essentially the same flags — we build them once
 * and parameterize by protocol + direction.
 */

import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'
import type { Direction, TransportOptions } from './base'

type Protocol = 's3' | 'gcs' | 'azure' | 'ftp' | 'sftp' | 'webdav' | 'ipfs' | 'torrent'

export function buildTransportConsole(input: {
  protocol: Protocol
  direction: Direction
  describe: string
  examples: Array<{ comment: string; command: string }>
}): CommandModule {
  const { protocol, direction, describe, examples } = input
  const verb = direction === 'get' ? 'download' : 'upload'
  const srcLabel = direction === 'get' ? '<remote>' : '<local>'
  const dstLabel = direction === 'get' ? '<local>' : '<remote>'

  registerHelp({
    command: `task ${verb} ${protocol}`,
    describe,
    options: commonOptions(protocol),
    examples,
  })

  return {
    command: `${protocol} ${srcLabel} ${dstLabel}`,
    describe,
    builder: y => {
      let b = y
        .positional('src', { type: 'string', describe: direction === 'get' ? 'Remote source' : 'Local source' })
        .positional('dst', { type: 'string', describe: direction === 'get' ? 'Local destination' : 'Remote destination' })
        .option('recursive', { alias: 'r', type: 'boolean' })
        .option('dry-run',   { type: 'boolean' })
        .option('verbose',   { type: 'boolean' })
        .option('quiet',     { alias: 'q', type: 'boolean' })
      if (protocol === 's3') {
        b = b.option('endpoint', { type: 'string' })
             .option('profile',  { type: 'string' })
             .option('region',   { type: 'string' })
      }
      if (protocol === 'azure') {
        b = b.option('account',     { type: 'string' })
             .option('container',   { type: 'string' })
             .option('account-key', { type: 'string' })
             .option('sas-token',   { type: 'string' })
      }
      if (protocol === 'ftp' || protocol === 'webdav') {
        b = b.option('user',     { type: 'string' })
             .option('password', { type: 'string' })
      }
      if (protocol === 'sftp') {
        b = b.option('port', { alias: 'p', type: 'number' })
             .option('key',  { alias: 'i', type: 'string' })
      }
      if (protocol === 'ipfs') {
        b = b.option('cid-version', { type: 'number' })
             .option('pin',         { type: 'boolean', default: true })
      }
      if (protocol === 'torrent') {
        b = b.option('seed-time', { type: 'number' })
      }
      return b
    },
    handler: async argv => {
      const mod = await import('./base')
      const { runAction } = await import('~/code/tool/node/log')
      const opts: TransportOptions = {
        src: argv.src as string,
        dst: argv.dst as string,
        recursive:  argv.recursive  as boolean | undefined,
        dryRun:     argv['dry-run'] as boolean | undefined,
        verbose:    argv.verbose    as boolean | undefined,
        quiet:      argv.quiet      as boolean | undefined,
        endpoint:   argv.endpoint   as string  | undefined,
        profile:    argv.profile    as string  | undefined,
        region:     argv.region     as string  | undefined,
        account:    argv.account    as string  | undefined,
        container:  argv.container  as string  | undefined,
        accountKey: argv['account-key'] as string | undefined,
        sasToken:   argv['sas-token']   as string | undefined,
        user:       argv.user       as string  | undefined,
        password:   argv.password   as string  | undefined,
        port:       argv.port       as number  | undefined,
        key:        argv.key        as string  | undefined,
        cidVersion: argv['cid-version'] as number | undefined,
        pin:        argv.pin        as boolean | undefined,
        seedTime:   argv['seed-time'] as number | undefined,
      }
      await runAction({
        action: verb,
        input: opts as unknown as Record<string, unknown>,
        run: async () => {
          switch (protocol) {
            case 's3':      return mod.runS3(direction, opts)
            case 'gcs':     return mod.runGcs(direction, opts)
            case 'azure':   return mod.runAzure(direction, opts)
            case 'ftp':     return mod.runFtp(direction, opts)
            case 'sftp':    return mod.runSftp(direction, opts)
            case 'webdav':  return mod.runWebdav(direction, opts)
            case 'ipfs':    return mod.runIpfs(direction, opts)
            case 'torrent': return mod.runTorrent(opts as never)
          }
        },
      })
    },
  }
}

function commonOptions(protocol: Protocol) {
  const base = [
    { long: 'recursive', short: 'r', describe: 'Recurse into directories' },
    { long: 'dry-run',               describe: 'Show what would transfer, do not execute' },
    { long: 'verbose',               describe: 'Detailed logs' },
    { long: 'quiet',     short: 'q', describe: 'Minimal output' },
  ]
  if (protocol === 's3') base.push(
    { long: 'endpoint', short: '', describe: 'Custom endpoint (Cloudflare R2: https://<acct>.r2.cloudflarestorage.com)' },
    { long: 'profile',  short: '', describe: 'AWS CLI profile' },
    { long: 'region',   short: '', describe: 'AWS region' },
  )
  if (protocol === 'azure') base.push(
    { long: 'account',     short: '', describe: 'Storage account name' },
    { long: 'container',   short: '', describe: 'Container name' },
    { long: 'account-key', short: '', describe: 'Storage account key' },
    { long: 'sas-token',   short: '', describe: 'SAS token' },
  )
  if (protocol === 'ftp' || protocol === 'webdav') base.push(
    { long: 'user',     short: '', describe: 'Username' },
    { long: 'password', short: '', describe: 'Password (prefer env / keychain)' },
  )
  if (protocol === 'sftp') base.push(
    { long: 'port', short: 'p', describe: 'SSH port (default 22)' },
    { long: 'key',  short: 'i', describe: 'Private key path' },
  )
  if (protocol === 'ipfs') base.push(
    { long: 'cid-version', short: '', describe: 'CIDv0 or CIDv1' },
    { long: 'pin',         short: '', describe: 'Pin after add (default true)' },
  )
  if (protocol === 'torrent') base.push(
    { long: 'seed-time', short: '', describe: 'Minutes to seed after download (default 0)' },
  )
  return base
}
