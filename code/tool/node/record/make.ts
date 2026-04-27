import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import {
  buildReplayCommand,
  buildScreenRecordCommand,
  buildTerminalRecordCommand,
  castPath,
  planReplay,
  renderAsciinemaHtml,
  shouldEmitHtml,
  type RecordCommand,
  type RecordScreenOptions,
  type RecordTerminalOptions,
  type ReplayOptions,
} from '~/code/tool/shared/record/command'
import { findWindow } from '~/code/tool/node/window/list'

export type {
  RecordScreenOptions,
  RecordTerminalOptions,
  ReplayOptions,
} from '~/code/tool/shared/record/command'

export type RecordWindowOptions = Omit<RecordScreenOptions, 'region'> & {
  /** Window id from `task list window`, an X11 hex id, a
   * Windows handle, or a title substring that matches one
   * window. */
  windowId: string
}

export async function runRecordScreen(o: RecordScreenOptions) {
  await fs.mkdir(path.dirname(o.output), { recursive: true })
  const cmd = buildScreenRecordCommand(o)
  process.stdout.write(`recording to ${o.output} — Ctrl-C to stop\n`)
  await exec(cmd, { allowSigint: true })
}

export async function runRecordWindow(o: RecordWindowOptions) {
  await fs.mkdir(path.dirname(o.output), { recursive: true })
  const win = await findWindow(o.windowId)
  const screenOpts: RecordScreenOptions = { ...o }
  // Strip the windowId field from RecordScreenOptions; resolve
  // each platform's selector instead.
  delete (screenOpts as { windowId?: string }).windowId
  if (process.platform === 'linux' && win.nativeId) {
    // x11grab can't directly target a window id, but the bbox
    // wmctrl gives us is reliable.
    if (win.bbox) screenOpts.region = win.bbox
    screenOpts.x11WindowId = win.nativeId
  } else if (process.platform === 'darwin') {
    if (!win.bbox) {
      throw new Error(
        `record window: macOS needs a bbox for "${o.windowId}". ` +
        `System Events couldn't read window position; window may be minimized.`,
      )
    }
    screenOpts.region = win.bbox
  } else if (process.platform === 'win32') {
    if (!win.title) {
      throw new Error(
        `record window: Windows needs a window title; "${o.windowId}" had none.`,
      )
    }
    screenOpts.windowTitle = win.title
  }
  const cmd = buildScreenRecordCommand(screenOpts)
  process.stdout.write(
    `recording window "${win.title ?? win.id}" to ${o.output} — Ctrl-C to stop\n`,
  )
  await exec(cmd, { allowSigint: true })
}

export async function runRecordTerminal(o: RecordTerminalOptions) {
  await fs.mkdir(path.dirname(o.output), { recursive: true })
  const cmd = buildTerminalRecordCommand(o)
  await exec(cmd, { allowSigint: true })

  if (shouldEmitHtml(o)) {
    const cast = castPath(o.output)
    const htmlOut = o.output.toLowerCase().endsWith('.html')
      ? o.output
      : o.output.replace(/\.cast$/i, '.html')
    const html = renderAsciinemaHtml({
      castUrl: path.basename(cast),
      title: o.title,
      idleLimit: o.idleLimit,
    })
    await fs.writeFile(htmlOut, html, 'utf-8')
    process.stdout.write(
      `wrote autoplay embed to ${htmlOut} (loads ${path.basename(cast)})\n`,
    )
  }
}

export async function runReplay(o: ReplayOptions) {
  if (o.output) await fs.mkdir(path.dirname(o.output), { recursive: true })
  const plan = planReplay(o)

  switch (plan.kind) {
    case 'play':
      await exec(plan.command)
      return
    case 'gif':
      await exec(plan.command)
      return
    case 'mp4':
      // Run agg → ffmpeg in sequence so a clear failure surfaces
      // at the right step, then drop the intermediate gif.
      for (const cmd of plan.commands) {
        await exec(cmd)
      }
      for (const tmp of plan.cleanup ?? []) {
        await fs.rm(tmp, { force: true })
      }
      return
    case 'html': {
      const html = renderAsciinemaHtml({
        castUrl: path.basename(o.input),
        speed: o.speed,
        idleLimit: o.idleLimit,
      })
      await fs.writeFile(plan.output, html, 'utf-8')
      process.stdout.write(`wrote autoplay embed to ${plan.output}\n`)
      return
    }
  }
}

/**
 * Pure planner exports for tests + dry-run callers. Mirrors the
 * shape of every other command-builder module in the repo.
 */
export { planReplay, buildReplayCommand, buildScreenRecordCommand }

function exec(cmd: RecordCommand, opts: { allowSigint?: boolean } = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd.bin, cmd.args, { stdio: 'inherit' })
    child.on('error', err => reject(makeErr(cmd, err)))
    child.on('exit', (code, signal) => {
      // SIGINT is the user pressing Ctrl-C to stop a recording —
      // ffmpeg writes a valid file before exiting, so we treat it
      // as success rather than failure.
      if (code === 0 || (opts.allowSigint && signal === 'SIGINT')) resolve()
      else reject(new Error(`record: ${cmd.bin} exited with code ${code}`))
    })
  })
}

function makeErr(cmd: RecordCommand, err: unknown): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `record: \`${cmd.bin}\` not found. Install: ${cmd.install}`
      : `record: ${cmd.bin} failed — ${(err as Error).message}`,
  )
}
