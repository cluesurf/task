/**
 * Container runner. Pure command builders live in
 * `~/code/tool/shared/container/command`.
 */

import fs from 'node:fs'
import { spawn } from 'node:child_process'
import {
  buildCleanCommand,
  buildDiskUsageCommand,
  buildDockerBuildCommand,
  buildDockerfileExistsCheck,
  buildPackBuildCommand,
  buildScanCommand,
  buildShellCommand,
  buildSizeCommand,
  type BuildOptions,
  type CleanOptions,
  type ContainerCommand,
  type ScanOptions,
  type ShellOptions,
  type SizeOptions,
} from '~/code/tool/shared/container/command'

export type { BuildOptions, CleanOptions, ScanOptions, ShellOptions, SizeOptions } from '~/code/tool/shared/container/command'

// ---- build -------------------------------------------------------

export async function runBuild(o: BuildOptions): Promise<{ tool: 'docker' | 'pack' }> {
  const tool = pickBuildTool(o)
  const cmd = tool === 'docker' ? buildDockerBuildCommand(o) : buildPackBuildCommand(o)
  await exec(cmd)
  return { tool }
}

function pickBuildTool(o: BuildOptions): 'docker' | 'pack' {
  if (o.buildpacks === true) return 'pack'
  if (o.buildpacks === false) return 'docker'
  // Auto: Dockerfile present → docker; absent → pack.
  const { paths } = buildDockerfileExistsCheck(o.context)
  for (const p of paths) {
    try {
      if (fs.statSync(p).isFile()) return 'docker'
    } catch {
      /* missing — try next */
    }
  }
  return 'pack'
}

// ---- scan / size / shell ----------------------------------------

export async function runScan(o: ScanOptions): Promise<void> {
  await exec(buildScanCommand(o))
}

export async function runSize(o: SizeOptions): Promise<void> {
  await exec(buildSizeCommand(o))
}

export async function runShell(o: ShellOptions): Promise<void> {
  await exec(buildShellCommand(o))
}

// ---- clean (with before/after disk-reclaim report) --------------

export async function runClean(o: CleanOptions): Promise<{
  reclaimed?: { images: number; containers: number; volumes: number; total: number }
}> {
  const stats = !o.noStats
  const before = stats ? await dockerDiskUsage().catch(() => null) : null

  const cmd = buildCleanCommand(o)
  await exec(cmd)

  const after = stats ? await dockerDiskUsage().catch(() => null) : null

  if (before && after) {
    const reclaimed = {
      images:     diff(before.Images,     after.Images),
      containers: diff(before.Containers, after.Containers),
      volumes:    diff(before.Volumes,    after.Volumes),
      total:      diff(before.total,      after.total),
    }
    process.stdout.write(
      `\nreclaimed: images ${fmt(reclaimed.images)}, containers ${fmt(reclaimed.containers)},` +
      ` volumes ${fmt(reclaimed.volumes)} → total ${fmt(reclaimed.total)}\n`,
    )
    return { reclaimed }
  }
  return {}
}

type DiskRow = { Reclaimable?: string; Size?: string }
type DiskUsage = {
  Images: number; Containers: number; Volumes: number; total: number
}

async function dockerDiskUsage(): Promise<DiskUsage> {
  const out = await capture(buildDiskUsageCommand())
  // `docker system df --format json` yields one JSON object per line
  // (Type=Images / Containers / Local Volumes / Build Cache).
  let images = 0, containers = 0, volumes = 0
  for (const line of out.split('\n')) {
    if (!line.trim()) continue
    try {
      const row = JSON.parse(line) as DiskRow & { Type?: string }
      const sz = parseSize(row.Size ?? '')
      if (row.Type === 'Images')         images = sz
      else if (row.Type === 'Containers') containers = sz
      else if (row.Type?.includes('Volumes')) volumes = sz
    } catch { /* ignore non-JSON lines */ }
  }
  return { Images: images, Containers: containers, Volumes: volumes, total: images + containers + volumes }
}

function parseSize(s: string): number {
  // "1.2GB" / "512MB" / "30kB"
  const m = s.match(/([\d.]+)\s*([kMGTP]?B)/i)
  if (!m) return 0
  const n = Number(m[1])
  const unit = m[2]!.toUpperCase()
  const mult: Record<string, number> = {
    B: 1, KB: 1024, MB: 1024**2, GB: 1024**3, TB: 1024**4, PB: 1024**5,
  }
  return n * (mult[unit] ?? 1)
}

function fmt(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ['KB','MB','GB','TB']
  let n = bytes / 1024
  let i = 0
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++ }
  return `${n.toFixed(1)} ${units[i]}`
}

function diff(a: number, b: number): number {
  return Math.max(0, a - b)
}

// ---- exec helpers -----------------------------------------------

function exec(cmd: ContainerCommand): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd.bin, cmd.args, { stdio: 'inherit' })
    child.on('error', err => reject(makeErr(cmd, err)))
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`container: ${cmd.bin} exited with code ${code}`))
    })
  })
}

function capture(cmd: ContainerCommand): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const child = spawn(cmd.bin, cmd.args, { stdio: ['ignore', 'pipe', 'inherit'] })
    child.stdout!.on('data', (b: Buffer) => chunks.push(b))
    child.on('error', err => reject(makeErr(cmd, err)))
    child.on('exit', code => {
      if (code === 0) resolve(Buffer.concat(chunks).toString('utf8'))
      else reject(new Error(`container: ${cmd.bin} exited with code ${code}`))
    })
  })
}

function makeErr(cmd: ContainerCommand, err: unknown): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `container: \`${cmd.bin}\` not found. Install: ${cmd.install}`
      : `container: ${cmd.bin} failed — ${(err as Error).message}`,
  )
}
