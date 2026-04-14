/**
 * `task sync snapshot <paths...>` — deduplicated, versioned backup
 * via restic, borg, or kopia. All three take the same logical
 * input (a repository URL + a set of source paths) and differ only
 * in argument shape. We pick one at runtime and route.
 *
 * Repository URL forms:
 *   /local/path              (local file system)
 *   sftp:user@host:/path     (ssh, restic + borg)
 *   s3:endpoint/bucket       (restic)
 *   b2:bucket                (restic)
 *   rclone:remote:path       (restic)
 *
 * Passwords come from env vars specific to each tool:
 *   restic → RESTIC_PASSWORD
 *   borg   → BORG_PASSPHRASE
 *   kopia  → KOPIA_PASSWORD
 */

import { spawn } from 'node:child_process'

export type SyncSnapshotTool = 'restic' | 'borg' | 'kopia'
export type SyncSnapshotAction = 'backup' | 'restore' | 'list' | 'prune' | 'init'

export type SyncSnapshotNodeInput = {
  tool?: SyncSnapshotTool
  action?: SyncSnapshotAction
  repo: string
  paths?: string[]
  tag?: string[]
  exclude?: string[]
  target?: string // for restore
  snapshotId?: string // for restore / specific ops
  password?: string
  keep?: { daily?: number; weekly?: number; monthly?: number; yearly?: number }
  dryRun?: boolean
  verbose?: boolean
  quiet?: boolean
}

export type SyncSnapshotNodeOutput = {
  tool: SyncSnapshotTool
  action: SyncSnapshotAction
  command: string
}

export async function syncSnapshotNode(
  input: SyncSnapshotNodeInput,
): Promise<SyncSnapshotNodeOutput> {
  const tool = input.tool ?? 'restic'
  const action = input.action ?? 'backup'
  const { bin, args, env } = buildInvocation(tool, action, input)
  const printable = `${bin} ${args.map(quote).join(' ')}`

  if (input.dryRun && input.verbose) {
    process.stdout.write(printable + '\n')
  }

  await runProcess(bin, args, { env, quiet: input.quiet })

  return { tool, action, command: printable }
}

function buildInvocation(
  tool: SyncSnapshotTool,
  action: SyncSnapshotAction,
  input: SyncSnapshotNodeInput,
): { bin: string; args: string[]; env: NodeJS.ProcessEnv } {
  switch (tool) {
    case 'restic': return resticInvocation(action, input)
    case 'borg':   return borgInvocation(action, input)
    case 'kopia':  return kopiaInvocation(action, input)
  }
}

function resticInvocation(
  action: SyncSnapshotAction,
  input: SyncSnapshotNodeInput,
) {
  const args: string[] = ['-r', input.repo]
  if (input.quiet) args.push('--quiet')
  if (input.verbose) args.push('--verbose')

  switch (action) {
    case 'init':
      args.push('init')
      break
    case 'backup':
      args.push('backup')
      for (const t of input.tag ?? []) args.push('--tag', t)
      for (const e of input.exclude ?? []) args.push('--exclude', e)
      if (input.dryRun) args.push('--dry-run')
      args.push(...(input.paths ?? []))
      break
    case 'restore':
      args.push('restore', input.snapshotId ?? 'latest')
      if (input.target) args.push('--target', input.target)
      break
    case 'list':
      args.push('snapshots')
      for (const t of input.tag ?? []) args.push('--tag', t)
      break
    case 'prune': {
      args.push('forget', '--prune')
      if (input.keep?.daily)   args.push('--keep-daily',   String(input.keep.daily))
      if (input.keep?.weekly)  args.push('--keep-weekly',  String(input.keep.weekly))
      if (input.keep?.monthly) args.push('--keep-monthly', String(input.keep.monthly))
      if (input.keep?.yearly)  args.push('--keep-yearly',  String(input.keep.yearly))
      break
    }
  }

  const env = { ...process.env }
  if (input.password) env.RESTIC_PASSWORD = input.password

  return { bin: 'restic', args, env }
}

function borgInvocation(
  action: SyncSnapshotAction,
  input: SyncSnapshotNodeInput,
) {
  const args: string[] = []
  if (input.quiet) args.push('--quiet')
  if (input.verbose) args.push('--verbose')

  const archiveTag = (input.tag?.[0] ?? new Date().toISOString()).replace(/[:.]/g, '-')

  switch (action) {
    case 'init':
      args.push('init', '--encryption=repokey', input.repo)
      break
    case 'backup':
      args.push('create')
      for (const e of input.exclude ?? []) args.push('--exclude', e)
      if (input.dryRun) args.push('--dry-run')
      args.push(`${input.repo}::${archiveTag}`)
      args.push(...(input.paths ?? []))
      break
    case 'restore':
      args.push('extract', `${input.repo}::${input.snapshotId ?? archiveTag}`)
      if (input.target) {
        // borg extracts to the current dir; caller should chdir
        process.chdir(input.target)
      }
      break
    case 'list':
      args.push('list', input.repo)
      break
    case 'prune': {
      args.push('prune')
      if (input.keep?.daily)   args.push('--keep-daily',   String(input.keep.daily))
      if (input.keep?.weekly)  args.push('--keep-weekly',  String(input.keep.weekly))
      if (input.keep?.monthly) args.push('--keep-monthly', String(input.keep.monthly))
      if (input.keep?.yearly)  args.push('--keep-yearly',  String(input.keep.yearly))
      args.push(input.repo)
      break
    }
  }

  const env = { ...process.env }
  if (input.password) env.BORG_PASSPHRASE = input.password

  return { bin: 'borg', args, env }
}

function kopiaInvocation(
  action: SyncSnapshotAction,
  input: SyncSnapshotNodeInput,
) {
  const args: string[] = []

  switch (action) {
    case 'init':
      // Kopia needs an explicit storage backend. Assume filesystem
      // unless the URL suggests otherwise.
      args.push('repository', 'create', 'filesystem', '--path', input.repo)
      break
    case 'backup':
      args.push('snapshot', 'create')
      for (const t of input.tag ?? []) args.push('--tags', t)
      if (input.dryRun) args.push('--dry-run')
      args.push(...(input.paths ?? []))
      break
    case 'restore':
      args.push('snapshot', 'restore', input.snapshotId ?? 'latest')
      if (input.target) args.push(input.target)
      break
    case 'list':
      args.push('snapshot', 'list')
      for (const t of input.tag ?? []) args.push('--tags', t)
      break
    case 'prune':
      args.push('snapshot', 'expire')
      if (input.keep?.daily)   args.push('--keep-daily',   String(input.keep.daily))
      if (input.keep?.weekly)  args.push('--keep-weekly',  String(input.keep.weekly))
      if (input.keep?.monthly) args.push('--keep-monthly', String(input.keep.monthly))
      if (input.keep?.yearly)  args.push('--keep-yearly',  String(input.keep.yearly))
      break
  }

  const env = { ...process.env }
  if (input.password) env.KOPIA_PASSWORD = input.password

  return { bin: 'kopia', args, env }
}

function quote(s: string): string {
  return /[\s"'$`\\]/.test(s) ? `'${s.replace(/'/g, `'\\''`)}'` : s
}

async function runProcess(
  cmd: string,
  args: string[],
  opts: { env?: NodeJS.ProcessEnv; quiet?: boolean },
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      env: opts.env,
      stdio: opts.quiet ? ['ignore', 'ignore', 'inherit'] : 'inherit',
    })
    child.on('error', err => {
      const msg = (err as NodeJS.ErrnoException).code === 'ENOENT'
        ? `sync snapshot: \`${cmd}\` not found on PATH. Install it first.`
        : `sync snapshot: ${cmd} failed — ${err.message}`
      reject(new Error(msg))
    })
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`sync snapshot: ${cmd} exited with code ${code}`))
    })
  })
}
