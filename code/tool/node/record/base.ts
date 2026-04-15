import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import {
  buildReplayCommand,
  buildScreenRecordCommand,
  buildTerminalRecordCommand,
  type RecordCommand,
  type RecordScreenOptions,
  type RecordTerminalOptions,
  type ReplayOptions,
} from '~/code/tool/shared/record/command'

export type { RecordScreenOptions, RecordTerminalOptions, ReplayOptions } from '~/code/tool/shared/record/command'

export async function runRecordScreen(o: RecordScreenOptions) {
  await fs.mkdir(path.dirname(o.output), { recursive: true })
  const cmd = buildScreenRecordCommand(o)
  process.stdout.write(`recording to ${o.output} — Ctrl-C to stop\n`)
  await exec(cmd, { allowSigint: true })
}

export async function runRecordTerminal(o: RecordTerminalOptions) {
  await fs.mkdir(path.dirname(o.output), { recursive: true })
  const cmd = buildTerminalRecordCommand(o)
  await exec(cmd, { allowSigint: true })
}

export async function runReplay(o: ReplayOptions) {
  if (o.output) await fs.mkdir(path.dirname(o.output), { recursive: true })
  const cmd = buildReplayCommand(o)
  await exec(cmd)
}

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
