import type { CommandModule } from 'yargs'
import {
  registerHelp,
  registerGroupHelp,
} from '~/code/tool/node/log/registry'
import { syncSnapshotConsole } from './snapshot/console'

registerGroupHelp({
  command: 'task sync',
  describe:
    'Mirror directories (rsync / SMB) or snapshot-backup (restic, borg, kopia)',
  commands: [
    {
      name: 'snapshot',
      describe:
        'Deduplicated snapshot backup via restic / borg / kopia',
    },
  ],
})

registerHelp({
  command: 'task sync',
  describe:
    'Rsync-style directory mirror with optional SMB/NAS auto-mount',
  options: [
    {
      long: 'dry-run',
      describe: 'Show what would change, do not copy',
    },
    {
      long: 'checksum',
      describe: 'Use checksum instead of size+mtime to decide',
    },
    {
      long: 'delete',
      describe:
        'Delete files in destination missing from source (mirror)',
    },
    {
      long: 'archive',
      describe: 'Preserve perms/times/links (rsync -a, default on)',
    },
    {
      long: 'compress',
      describe: 'Compress in transit (ssh only, rsync -z)',
    },
    { long: 'exclude', describe: 'Glob to skip (repeatable)' },
    { long: 'include', describe: 'Glob to include (repeatable)' },
    { long: 'bandwidth', describe: 'KB/s cap (rsync --bwlimit)' },
    { long: 'progress', describe: 'Show per-file progress' },
    { long: 'user', describe: 'SMB username' },
    {
      long: 'password',
      describe: 'SMB password (avoid; prefer keychain)',
    },
    {
      long: 'mount-point',
      describe:
        'Local SMB mount dir (default: /tmp/task-smb-<host>-<share>)',
    },
    {
      long: 'unmount',
      describe: 'Unmount the SMB share when finished',
    },
    { long: 'verbose', describe: 'Detailed logs' },
    { long: 'quiet', short: 'q', describe: 'Minimal output' },
  ],
  examples: [
    {
      comment: 'local mirror',
      command: 'task sync ./src/ /Volumes/Backup/src/ --delete',
    },
    {
      comment: 'dry run + checksum',
      command: 'task sync ./src/ ./dst/ --dry-run --checksum',
    },
    {
      comment: 'sync to ssh host',
      command: 'task sync ./site/ user@box:/var/www/site/',
    },
    {
      comment: 'sync to Synology SMB',
      command:
        'task sync ./photos/ smb://nas.local/photos/2026 --user foobar',
    },
    {
      comment: 'exclude patterns',
      command:
        'task sync . backup/ --exclude ".git/" --exclude "node_modules/"',
    },
  ],
})

export const syncConsole: CommandModule = {
  command: 'sync [source] [destination]',
  describe: 'Mirror / snapshot (rsync / SMB / restic / borg / kopia)',
  builder: y =>
    y
      .positional('source', { type: 'string', describe: 'Source path' })
      .positional('destination', {
        type: 'string',
        describe:
          'Destination (local path, user@host:path, or smb://...)',
      })
      .command(syncSnapshotConsole)
      .option('dry-run', { type: 'boolean' })
      .option('checksum', { type: 'boolean' })
      .option('delete', { type: 'boolean' })
      .option('archive', { type: 'boolean' })
      .option('compress', { type: 'boolean' })
      .option('exclude', { type: 'array', string: true })
      .option('include', { type: 'array', string: true })
      .option('bandwidth', { type: 'string' })
      .option('progress', { type: 'boolean' })
      .option('user', { type: 'string' })
      .option('password', { type: 'string' })
      .option('mount-point', { type: 'string' })
      .option('unmount', { type: 'boolean' })
      .option('verbose', { type: 'boolean' })
      .option('quiet', { alias: 'q', type: 'boolean' }),
  handler: async argv => {
    // If the positional arg is a known subcommand, yargs already
    // routed it; this handler only runs for the rsync case.
    if (!argv.source || !argv.destination) {
      throw new Error(
        'task sync: both <source> and <destination> are required',
      )
    }
    const { syncNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      source: argv.source as string,
      destination: argv.destination as string,
      dryRun: argv['dry-run'] as boolean | undefined,
      checksum: argv.checksum as boolean | undefined,
      delete: argv.delete as boolean | undefined,
      archive: argv.archive as boolean | undefined,
      compress: argv.compress as boolean | undefined,
      exclude: argv.exclude as string[] | undefined,
      include: argv.include as string[] | undefined,
      bandwidth: argv.bandwidth as string | undefined,
      progress: argv.progress as boolean | undefined,
      user: argv.user as string | undefined,
      password: argv.password as string | undefined,
      mountPoint: argv['mount-point'] as string | undefined,
      unmount: argv.unmount as boolean | undefined,
      verbose: argv.verbose as boolean | undefined,
      quiet: argv.quiet as boolean | undefined,
    }
    await runAction({
      action: 'sync',
      input: input as unknown as Record<string, unknown>,
      run: () => syncNode(input),
    })
  },
}
