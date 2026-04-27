/**
 * Cross-platform window enumeration.
 *
 * Each entry carries enough information to:
 *   - target a window for capture (`id` on Linux X11 +
 *     Windows; `bbox` for macOS where window-id capture
 *     isn't directly exposed by avfoundation),
 *   - identify it to a human (`pid`, `app`, `title`).
 *
 * macOS  — `osascript` reads window position/size from
 *          System Events. Window IDs aren't surfaced by
 *          osascript; we synthesize a stable id from
 *          `pid:title-hash` so callers can refer back.
 * Linux  — `wmctrl -l -G` (X11). Wayland compositors (sway,
 *          hyprland, gnome) expose windows differently and
 *          are intentionally unsupported here — fall back
 *          to listing windows via the compositor's own CLI.
 * Windows— PowerShell pulls every process with a
 *          `MainWindowHandle != 0`.
 */

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { createHash } from 'node:crypto'

const exec = promisify(execFile)

export type WindowSummary = {
  /** Stable identifier callers feed back to `record window <id>`. */
  id: string
  /** Owning process id, when knowable. */
  pid?: number
  /** Application / process name. */
  app?: string
  /** Window title text. */
  title?: string
  /** Bounding box in screen coords. macOS / Linux X11 / Windows. */
  bbox?: { x: number; y: number; w: number; h: number }
  /** Display index when multi-monitor. */
  display?: number
  /** Native window id (X11 hex, Windows handle). */
  nativeId?: string
}

export async function listWindows(): Promise<WindowSummary[]> {
  switch (process.platform) {
    case 'darwin': return await listMac()
    case 'linux':  return await listLinux()
    case 'win32':  return await listWindows32()
    default:
      throw new Error(`list window: unsupported platform ${process.platform}`)
  }
}

// ── macOS ───────────────────────────────────────────────────

async function listMac(): Promise<WindowSummary[]> {
  // System Events returns one row per window; AppleScript's `tab`
  // separator survives shell quoting cleanly.
  const script = `
    set output to ""
    tell application "System Events"
      repeat with p in (processes whose visible is true)
        set pid to unix id of p
        set appName to name of p
        try
          repeat with w in windows of p
            try
              set t to name of w
            on error
              set t to ""
            end try
            try
              set pos to position of w
              set sz to size of w
              set x to item 1 of pos
              set y to item 2 of pos
              set ww to item 1 of sz
              set hh to item 2 of sz
            on error
              set x to 0
              set y to 0
              set ww to 0
              set hh to 0
            end try
            set output to output & pid & tab & appName & tab & t & tab & x & tab & y & tab & ww & tab & hh & linefeed
          end repeat
        end try
      end repeat
    end tell
    return output
  `
  const { stdout } = await exec('osascript', ['-e', script], {
    maxBuffer: 16 * 1024 * 1024,
  })
  const out: WindowSummary[] = []
  for (const line of stdout.split(/\r?\n/)) {
    if (!line.trim()) continue
    const [pidS, app = '', title = '', xS, yS, wS, hS] = line.split('\t')
    const pid = Number(pidS)
    const x = Number(xS), y = Number(yS), w = Number(wS), h = Number(hS)
    if (!Number.isFinite(pid)) continue
    out.push({
      id: stableId(pid, app, title),
      pid,
      app,
      title,
      bbox: Number.isFinite(w) && Number.isFinite(h)
        ? { x, y, w, h }
        : undefined,
    })
  }
  return out
}

// ── Linux X11 ───────────────────────────────────────────────

async function listLinux(): Promise<WindowSummary[]> {
  // Wayland sessions don't expose windows through wmctrl.
  // Bail with a clear hint instead of returning an empty list.
  if (process.env.XDG_SESSION_TYPE === 'wayland') {
    throw new Error(
      'list window: Wayland session — wmctrl can\'t enumerate Wayland windows. ' +
      'Use your compositor\'s CLI (e.g. `swaymsg -t get_tree`, `hyprctl clients`).',
    )
  }
  let stdout: string
  try {
    ({ stdout } = await exec('wmctrl', ['-l', '-G', '-p']))
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error('list window: `wmctrl` not found. Install: apt install wmctrl')
    }
    throw e
  }
  // Format: <id> <desktop> <pid> <x> <y> <w> <h> <host> <title...>
  const out: WindowSummary[] = []
  for (const line of stdout.split('\n')) {
    if (!line.trim()) continue
    const m = line.match(/^(\S+)\s+(\S+)\s+(\d+)\s+(-?\d+)\s+(-?\d+)\s+(\d+)\s+(\d+)\s+(\S+)\s*(.*)$/)
    if (!m) continue
    const [, hexId, , pidS, xS, yS, wS, hS, , title = ''] = m
    out.push({
      id: hexId!,
      pid: Number(pidS),
      title,
      bbox: { x: Number(xS), y: Number(yS), w: Number(wS), h: Number(hS) },
      nativeId: hexId,
    })
  }
  return out
}

// ── Windows ────────────────────────────────────────────────

async function listWindows32(): Promise<WindowSummary[]> {
  // PowerShell one-liner: pid, name, title, handle, bounds via
  // P/Invoke for GetWindowRect would be more accurate — but
  // requires extra ceremony. For now we ship pid + title +
  // handle and let `record window <id>` use ffmpeg's
  // `gdigrab title="..."` selector, which doesn't need bbox.
  const ps =
    `Get-Process | Where-Object { $_.MainWindowHandle -ne 0 } | ` +
    `Select-Object Id, ProcessName, MainWindowTitle, ` +
    `@{Name='Handle';Expression={'0x' + $_.MainWindowHandle.ToString('X')}} | ` +
    `ConvertTo-Json -Compress`
  const { stdout } = await exec('powershell', ['-NoProfile', '-Command', ps], {
    maxBuffer: 16 * 1024 * 1024,
  })
  const raw = JSON.parse(stdout || '[]') as Array<{
    Id: number
    ProcessName: string
    MainWindowTitle: string
    Handle: string
  }>
  return raw.map(r => ({
    id: r.Handle,
    pid: r.Id,
    app: r.ProcessName,
    title: r.MainWindowTitle,
    nativeId: r.Handle,
  }))
}

// ── Shared ─────────────────────────────────────────────────

function stableId(pid: number, app: string, title: string): string {
  const h = createHash('sha1')
    .update(`${pid}\0${app}\0${title}`)
    .digest('hex')
    .slice(0, 8)
  return `${pid}:${h}`
}

export async function findWindow(id: string): Promise<WindowSummary> {
  const list = await listWindows()
  const exact = list.find(w => w.id === id || w.nativeId === id)
  if (exact) return exact
  // Fall back to title substring so callers can pass a friendlier
  // string. Multi-match → throw, single → return.
  const matches = list.filter(w =>
    (w.title ?? '').toLowerCase().includes(id.toLowerCase()),
  )
  if (matches.length === 1) return matches[0]!
  if (matches.length > 1) {
    throw new Error(
      `record window: "${id}" matched ${matches.length} windows. ` +
      `Use a stable id from \`task list window\` instead.`,
    )
  }
  throw new Error(`record window: no window matched "${id}". Run \`task list window\` to see ids.`)
}
