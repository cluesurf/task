/**
 * Pure command builders for `task record` / `task replay`.
 * No I/O — node-side runner shells these out.
 *
 * Three input modes for screen capture:
 *   1. Whole display (default).
 *   2. Region: `region: { x, y, w, h }` — a fixed bbox on
 *      whatever display covers it.
 *   3. Window: `bbox` of the focused window plus, on Linux,
 *      the X11 window id. macOS avfoundation can't target a
 *      specific window directly so the runner resolves the
 *      window's bbox and feeds it through `region`. Windows
 *      gdigrab takes `title="..."` natively.
 */

export type RecordCommand = { bin: string; args: string[]; install: string }

const INSTALL = {
  ffmpeg:    'brew install ffmpeg / apt install ffmpeg / winget install Gyan.FFmpeg',
  asciinema: 'brew install asciinema / pip install asciinema',
  agg:       'cargo install agg',
}

// ---- screen / window via ffmpeg --------------------------------

export type RecordRegion = { x: number; y: number; w: number; h: number }

export type RecordScreenOptions = {
  output: string
  display?: string
  width?: number
  height?: number
  framerate?: number
  audio?: string
  duration?: number
  region?: RecordRegion
  cursor?: boolean
  format?: 'mp4' | 'webm' | 'gif' | 'mov'
  /** Linux X11 only — directly capture this window. macOS / Windows
   * resolve their window equivalents by populating `region` /
   * `windowTitle` instead. */
  x11WindowId?: string
  /** Windows gdigrab title= selector. */
  windowTitle?: string
}

export function buildScreenRecordCommand(o: RecordScreenOptions): RecordCommand {
  const args: string[] = []
  const platform = process.platform
  if (platform === 'darwin') {
    // -f avfoundation -framerate 30 -i "1:0"  (screen 1, audio device 0)
    args.push('-f', 'avfoundation')
    if (o.framerate) args.push('-framerate', String(o.framerate))
    if (o.cursor === false) args.push('-capture_cursor', '0')
    else args.push('-capture_cursor', '1')
    const v = o.display ?? '1'
    const a = o.audio ?? 'none'
    args.push('-i', a === 'none' ? `${v}` : `${v}:${a}`)
  } else if (platform === 'linux') {
    // x11grab is the only practical option without a Wayland
    // compositor protocol. Window-specific capture: pass
    // `-i :0.0+x,y` and `-video_size WxH`.
    args.push('-f', 'x11grab')
    if (o.framerate) args.push('-framerate', String(o.framerate))
    if (o.region) {
      args.push('-video_size', `${o.region.w}x${o.region.h}`)
      args.push('-i', `${o.display ?? ':0.0'}+${o.region.x},${o.region.y}`)
    } else if (o.width && o.height) {
      args.push('-video_size', `${o.width}x${o.height}`)
      args.push('-i', o.display ?? ':0.0')
    } else {
      args.push('-i', o.display ?? ':0.0')
    }
  } else if (platform === 'win32') {
    args.push('-f', 'gdigrab')
    if (o.framerate) args.push('-framerate', String(o.framerate))
    if (o.windowTitle) {
      // gdigrab accepts `title=...` to capture a single window.
      args.push('-i', `title=${o.windowTitle}`)
    } else {
      args.push('-i', 'desktop')
    }
  } else {
    throw new Error(`record screen: unsupported platform ${platform}`)
  }

  // Region cropping for macOS (avfoundation has no native region
  // input — we crop the whole-display capture).
  if (platform === 'darwin' && o.region) {
    const { w, h, x, y } = o.region
    args.push('-vf', `crop=${w}:${h}:${x}:${y}`)
  }

  if (o.duration) args.push('-t', String(o.duration))

  const ext = (o.format ?? extOf(o.output)).toLowerCase()
  switch (ext) {
    case 'mp4':
    case 'mov':
      args.push('-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'fast'); break
    case 'webm':
      args.push('-c:v', 'libvpx-vp9', '-row-mt', '1'); break
    case 'gif':
      args.push('-vf', 'fps=15,split[a][b];[a]palettegen[p];[b][p]paletteuse')
      break
  }
  args.push('-y', o.output)
  return { bin: 'ffmpeg', args, install: INSTALL.ffmpeg }
}

function extOf(p: string): string {
  const m = p.match(/\.([a-z0-9]+)$/i)
  return m ? m[1]!.toLowerCase() : 'mp4'
}

// ---- terminal via asciinema ------------------------------------

export type RecordTerminalOptions = {
  output: string
  command?: string
  title?: string
  idleLimit?: number
  overwrite?: boolean
  /** When true, after the .cast is captured, also emit
   * `<output-without-ext>.html` with an embedded
   * asciinema-player. Set automatically when `output` ends
   * in `.html`. */
  html?: boolean
}

export function buildTerminalRecordCommand(o: RecordTerminalOptions): RecordCommand {
  const cast = castPath(o.output)
  const args = ['rec']
  if (o.command) args.push('-c', o.command)
  if (o.title)   args.push('-t', o.title)
  if (o.idleLimit) args.push('-i', String(o.idleLimit))
  if (o.overwrite) args.push('--overwrite')
  args.push(cast)
  return { bin: 'asciinema', args, install: INSTALL.asciinema }
}

/** When the user passes `--output demo.html`, we still write the
 *  raw recording to `demo.cast` and emit `demo.html` as a
 *  sidecar. This helper picks the cast path. */
export function castPath(output: string): string {
  return output.toLowerCase().endsWith('.html')
    ? output.replace(/\.html$/i, '.cast')
    : output
}

export function shouldEmitHtml(o: RecordTerminalOptions): boolean {
  return o.html === true || o.output.toLowerCase().endsWith('.html')
}

/**
 * Self-contained HTML page that plays a `.cast` via the
 * asciinema-player CDN. Runs offline once cached; for fully
 * offline embeds, swap the CDN URLs for vendored assets.
 */
export function renderAsciinemaHtml(input: {
  castUrl: string
  title?: string
  speed?: number
  idleLimit?: number
  autoplay?: boolean
}): string {
  const title = escapeHtml(input.title ?? 'asciinema recording')
  const speed = input.speed ?? 1
  const idleLimit = input.idleLimit ?? 2
  const autoplay = input.autoplay !== false
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/asciinema-player@3/dist/bundle/asciinema-player.css" />
  <style>
    body { margin: 0; background: #0d1117; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    #player { max-width: 100%; }
  </style>
</head>
<body>
  <div id="player"></div>
  <script src="https://cdn.jsdelivr.net/npm/asciinema-player@3/dist/bundle/asciinema-player.min.js"></script>
  <script>
    AsciinemaPlayer.create(${JSON.stringify(input.castUrl)}, document.getElementById('player'), {
      autoPlay: ${autoplay},
      speed:     ${speed},
      idleTimeLimit: ${idleLimit},
      preload: true,
      poster: 'npt:0:0',
    });
  </script>
</body>
</html>
`
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, ch => (
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as Record<string, string>)[ch]!
  ))
}

// ---- replay ----------------------------------------------------

export type ReplayOptions = {
  input: string
  output?: string
  speed?: number
  idleLimit?: number
  format?: 'gif' | 'mp4' | 'play' | 'html'
}

export type ReplayPlan =
  | { kind: 'play';  command: RecordCommand }
  | { kind: 'gif';   command: RecordCommand; output: string }
  | { kind: 'mp4';   commands: RecordCommand[]; output: string; cleanup?: string[] }
  | { kind: 'html';  output: string }

export function planReplay(o: ReplayOptions): ReplayPlan {
  const ext = o.output ? extOf(o.output) : 'play'
  const fmt = o.format ?? (
    ext === 'gif' ? 'gif' :
    ext === 'mp4' ? 'mp4' :
    ext === 'html' ? 'html' :
    'play'
  )

  if (fmt === 'play') {
    const args = ['play']
    if (o.speed) args.push('-s', String(o.speed))
    if (o.idleLimit) args.push('-i', String(o.idleLimit))
    args.push(o.input)
    return {
      kind: 'play',
      command: { bin: 'asciinema', args, install: INSTALL.asciinema },
    }
  }

  if (fmt === 'gif') {
    const out = o.output ?? o.input.replace(/\.[a-z0-9]+$/i, '.gif')
    const args = [o.input, out]
    if (o.speed) args.push('--speed', String(o.speed))
    if (o.idleLimit) args.push('--idle-time-limit', String(o.idleLimit))
    return {
      kind: 'gif',
      command: { bin: 'agg', args, install: INSTALL.agg },
      output: out,
    }
  }

  if (fmt === 'html') {
    const out = o.output ?? o.input.replace(/\.[a-z0-9]+$/i, '.html')
    return { kind: 'html', output: out }
  }

  // mp4 — agg renders a gif, ffmpeg transcodes to h.264 mp4.
  // Two-step chain so each command's exit can be reported
  // separately; the runner deletes the intermediate gif on
  // success.
  const out = o.output ?? o.input.replace(/\.[a-z0-9]+$/i, '.mp4')
  const tmpGif = out.replace(/\.mp4$/i, '.tmp.gif')
  const aggArgs = [o.input, tmpGif]
  if (o.speed) aggArgs.push('--speed', String(o.speed))
  if (o.idleLimit) aggArgs.push('--idle-time-limit', String(o.idleLimit))
  return {
    kind: 'mp4',
    commands: [
      { bin: 'agg', args: aggArgs, install: INSTALL.agg },
      {
        bin: 'ffmpeg',
        args: [
          '-y', '-i', tmpGif,
          '-movflags', 'faststart',
          '-pix_fmt', 'yuv420p',
          '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
          out,
        ],
        install: INSTALL.ffmpeg,
      },
    ],
    output: out,
    cleanup: [tmpGif],
  }
}

/** Backwards-compatible single-command shape (returns the
 *  first command of a plan). Kept so callers that already
 *  use it keep working. New code should call `planReplay`. */
export function buildReplayCommand(o: ReplayOptions): RecordCommand {
  const plan = planReplay(o)
  if (plan.kind === 'play' || plan.kind === 'gif') return plan.command
  if (plan.kind === 'mp4') return plan.commands[0]!
  // html: no shell command.
  return {
    bin: 'echo',
    args: [`replay: html requires planReplay (writes ${plan.output})`],
    install: '',
  }
}
