import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task sync snapshot',
  describe: 'Deduplicated, versioned backup via restic / borg / kopia',
  options: [
    { long: 'tool',                       describe: 'restic (default), borg, kopia' },
    { long: 'action',                     describe: 'backup (default), restore, list, prune, init' },
    { long: 'repo',      short: 'r',      describe: 'Repository path or URL' },
    { long: 'tag',                        describe: 'Tag (repeatable)' },
    { long: 'exclude',                    describe: 'Exclude pattern (repeatable)' },
    { long: 'target',                     describe: 'Destination for restore' },
    { long: 'snapshot-id',                describe: 'Snapshot id (restore / targeted ops)' },
    { long: 'password',                   describe: 'Repo password. Prefer env vars: RESTIC_PASSWORD / BORG_PASSPHRASE / KOPIA_PASSWORD' },
    { long: 'keep-daily',                 describe: 'Prune retention (daily)' },
    { long: 'keep-weekly',                describe: 'Prune retention (weekly)' },
    { long: 'keep-monthly',               describe: 'Prune retention (monthly)' },
    { long: 'keep-yearly',                describe: 'Prune retention (yearly)' },
    { long: 'dry-run',                    describe: 'Show what would change, do not write' },
    { long: 'verbose',                    describe: 'Detailed logs' },
    { long: 'quiet',    short: 'q',       describe: 'Minimal output' },
  ],
  examples: [
    { comment: 'init a repo',       command: 'task sync snapshot --action init --repo /backups/photos' },
    { comment: 'backup with restic',command: 'task sync snapshot ~/Documents ~/code --repo /backups/home' },
    { comment: 'use borg',          command: 'task sync snapshot ~/src --tool borg --repo /backups/src-borg' },
    { comment: 'list snapshots',    command: 'task sync snapshot --action list --repo /backups/home' },
    { comment: 'prune to a schedule', command: 'task sync snapshot --action prune --repo /backups/home --keep-daily 7 --keep-weekly 4 --keep-monthly 12' },
    { comment: 'restore latest',    command: 'task sync snapshot --action restore --repo /backups/home --target ./out' },
  ],
})

export const syncSnapshotConsole: CommandModule = {
  command: 'snapshot [paths..]',
  describe: 'Deduplicated snapshot backup (restic / borg / kopia)',
  builder: y =>
    y
      .positional('paths', { type: 'string', array: true, describe: 'Source paths to back up' })
      .option('tool',         { type: 'string', choices: ['restic', 'borg', 'kopia'] as const })
      .option('action',       { type: 'string', choices: ['backup', 'restore', 'list', 'prune', 'init'] as const })
      .option('repo',         { alias: 'r', type: 'string', demandOption: true })
      .option('tag',          { type: 'array', string: true })
      .option('exclude',      { type: 'array', string: true })
      .option('target',       { type: 'string' })
      .option('snapshot-id',  { type: 'string' })
      .option('password',     { type: 'string' })
      .option('keep-daily',   { type: 'number' })
      .option('keep-weekly',  { type: 'number' })
      .option('keep-monthly', { type: 'number' })
      .option('keep-yearly',  { type: 'number' })
      .option('dry-run',      { type: 'boolean' })
      .option('verbose',      { type: 'boolean' })
      .option('quiet',        { alias: 'q', type: 'boolean' }),
  handler: async argv => {
    const { syncSnapshotNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      tool: argv.tool as 'restic' | 'borg' | 'kopia' | undefined,
      action: argv.action as 'backup' | 'restore' | 'list' | 'prune' | 'init' | undefined,
      repo: argv.repo as string,
      paths: argv.paths as string[] | undefined,
      tag: argv.tag as string[] | undefined,
      exclude: argv.exclude as string[] | undefined,
      target: argv.target as string | undefined,
      snapshotId: argv['snapshot-id'] as string | undefined,
      password: argv.password as string | undefined,
      keep: {
        daily: argv['keep-daily'] as number | undefined,
        weekly: argv['keep-weekly'] as number | undefined,
        monthly: argv['keep-monthly'] as number | undefined,
        yearly: argv['keep-yearly'] as number | undefined,
      },
      dryRun: argv['dry-run'] as boolean | undefined,
      verbose: argv.verbose as boolean | undefined,
      quiet: argv.quiet as boolean | undefined,
    }
    await runAction({
      action: 'sync',
      input: input as unknown as Record<string, unknown>,
      run: () => syncSnapshotNode(input),
    })
  },
}
