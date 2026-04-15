/**
 * Pure command builders for `task record` / `task replay`.
 * No I/O — node-side runner shells these out.
 */

export type RecordCommand = { bin: string; args: string[]; install: string }

const INSTALL = {
  ffmpeg:    'brew install ffmpeg / apt install ffmpeg / winget install Gyan.FFmpeg',
  asciinema: 'brew install asciinema / pip install asciinema',
  agg:       'cargo install agg',
}

// ---- screen / window via ffmpeg --------------------------------

export type RecordScreenOptions = {
  output: string
  display?: string         // "1" / ":0" / device id
  width?: number
  height?: number
  framerate?: number
  audio?: string           // ":0" / "default" / device id
  duration?: number        // seconds; ffmpeg -t
  region?: string          // x,y,w,h
  cursor?: boolean
  format?: 'mp4' | 'webm' | 'gif' | 'mov'
}

export function buildScreenRecordCommand(o: RecordScreenOptions): RecordCommand {
  const args: string[] = []
  // Per-OS input device. Each emits raw frames; the output ext
  // drives the encoder choice below.
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
    // -f x11grab -framerate 30 -video_size 1920x1080 -i :0.0
    args.push('-f', 'x11grab')
    if (o.framerate) args.push('-framerate', String(o.framerate))
    if (o.width && o.height) args.push('-video_size', `${o.width}x${o.height}`)
    args.push('-i', o.display ?? ':0.0')
  } else if (platform === 'win32') {
    // -f gdigrab -framerate 30 -i desktop
    args.push('-f', 'gdigrab')
    if (o.framerate) args.push('-framerate', String(o.framerate))
    args.push('-i', 'desktop')
  } else {
    throw new Error(`record screen: unsupported platform ${platform}`)
  }

  if (o.duration) args.push('-t', String(o.duration))

  // Output codec selection per format. GIF needs a palette pass for
  // decent quality but we keep it simple here — single-pass with
  // bayer dither — fine for short demos. Power users can pass
  // `--extra` to override.
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
  command?: string         // command to run (default: $SHELL)
  title?: string
  idleLimit?: number       // seconds to compress idle pauses to
  overwrite?: boolean
}

export function buildTerminalRecordCommand(o: RecordTerminalOptions): RecordCommand {
  const args = ['rec']
  if (o.command) args.push('-c', o.command)
  if (o.title)   args.push('-t', o.title)
  if (o.idleLimit) args.push('-i', String(o.idleLimit))
  if (o.overwrite) args.push('--overwrite')
  args.push(o.output)
  return { bin: 'asciinema', args, install: INSTALL.asciinema }
}

// ---- replay ----------------------------------------------------

export type ReplayOptions = {
  input: string
  /** Output path; if set + ext is gif/mp4, render rather than playback. */
  output?: string
  speed?: number
  idleLimit?: number
  format?: 'gif' | 'mp4' | 'play'
}

export function buildReplayCommand(o: ReplayOptions): RecordCommand {
  const ext = o.output ? extOf(o.output) : 'play'
  const fmt = o.format ?? (ext === 'gif' ? 'gif' : ext === 'mp4' ? 'mp4' : 'play')
  if (fmt === 'play') {
    const args = ['play']
    if (o.speed) args.push('-s', String(o.speed))
    if (o.idleLimit) args.push('-i', String(o.idleLimit))
    args.push(o.input)
    return { bin: 'asciinema', args, install: INSTALL.asciinema }
  }
  if (fmt === 'gif') {
    const out = o.output ?? o.input.replace(/\.[a-z0-9]+$/i, '.gif')
    const args = [o.input, out]
    if (o.speed) args.push('--speed', String(o.speed))
    return { bin: 'agg', args, install: INSTALL.agg }
  }
  // mp4 — render via agg → ffmpeg gif → mp4 chain. Simplest:
  // agg writes a gif, ffmpeg transcodes. Caller can pipe the two.
  const out = o.output ?? o.input.replace(/\.[a-z0-9]+$/i, '.mp4')
  const args = [o.input, out]
  return { bin: 'agg', args, install: INSTALL.agg + ' (mp4 needs additional ffmpeg pass)' }
}
