/**
 * System inspection — CPU / memory / disk facts that every
 * platform reports, read through Node's `os` module plus a
 * lightweight shell-out to `df` for disk usage.
 */

import os from 'node:os'
import { exec } from '~/code/tool/node/process'

export type CpuInfo = {
  model: string
  cores: number
  load1: number
  load5: number
  load15: number
}

export type MemoryInfo = {
  totalBytes: number
  freeBytes: number
  usedBytes: number
  usedPercent: number
}

export type DiskInfo = {
  mount: string
  filesystem: string
  sizeBytes: number
  usedBytes: number
  availableBytes: number
  usedPercent: number
}

export type SystemInfo = {
  platform: string
  release: string
  hostname: string
  uptimeSec: number
  cpu: CpuInfo
  memory: MemoryInfo
  disks: DiskInfo[]
}

export async function readSystemInfo(): Promise<SystemInfo> {
  const cpus = os.cpus()
  const [load1, load5, load15] = os.loadavg()
  const totalMem = os.totalmem()
  const freeMem = os.freemem()
  const used = totalMem - freeMem
  return {
    platform: process.platform,
    release: os.release(),
    hostname: os.hostname(),
    uptimeSec: Math.round(os.uptime()),
    cpu: {
      model: cpus[0]?.model ?? 'unknown',
      cores: cpus.length,
      load1: load1 ?? 0,
      load5: load5 ?? 0,
      load15: load15 ?? 0,
    },
    memory: {
      totalBytes: totalMem,
      freeBytes: freeMem,
      usedBytes: used,
      usedPercent: Math.round((used / totalMem) * 100),
    },
    disks: await readDisks(),
  }
}

async function readDisks(): Promise<DiskInfo[]> {
  if (process.platform === 'win32') {
    // `wmic` has been deprecated in favour of PowerShell — use
    // `Get-PSDrive` for cross-version compatibility.
    const { stdout } = await exec([
      'powershell',
      '-NoProfile',
      '-Command',
      "Get-PSDrive -PSProvider FileSystem | Select-Object Name,Used,Free | ConvertTo-Json",
    ])
    try {
      const raw = JSON.parse(stdout)
      const list = Array.isArray(raw) ? raw : [raw]
      return list.map(d => {
        const used = Number(d.Used) || 0
        const free = Number(d.Free) || 0
        const total = used + free
        return {
          mount: `${d.Name}:`,
          filesystem: 'NTFS',
          sizeBytes: total,
          usedBytes: used,
          availableBytes: free,
          usedPercent: total > 0 ? Math.round((used / total) * 100) : 0,
        }
      })
    } catch {
      return []
    }
  }
  // `df -k` is the common denominator between macOS and Linux.
  // -P (POSIX) keeps each mount on one line.
  const { stdout } = await exec(['df', '-Pk'])
  const lines = stdout.split('\n').slice(1).filter(l => l.trim())
  const disks: DiskInfo[] = []
  for (const line of lines) {
    const cols = line.split(/\s+/)
    if (cols.length < 6) continue
    const [fs, size, used, avail, , mount] = cols
    const sizeBytes = Number(size) * 1024
    const usedBytes = Number(used) * 1024
    const availableBytes = Number(avail) * 1024
    if (!Number.isFinite(sizeBytes) || sizeBytes === 0) continue
    disks.push({
      mount: mount!,
      filesystem: fs!,
      sizeBytes,
      usedBytes,
      availableBytes,
      usedPercent: Math.round((usedBytes / sizeBytes) * 100),
    })
  }
  return disks
}
