/**
 * Format runner. Pure command builders live in
 * `~/code/tool/shared/format/command`; this file shells them out.
 */

import { spawn } from 'node:child_process'
import type { FormatCommand, FormatOptions } from '~/code/tool/shared/format/command'

export type { FormatCommand, FormatOptions } from '~/code/tool/shared/format/command'

export async function runFormat(cmd: FormatCommand): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(cmd.bin, cmd.args, { stdio: 'inherit' })
    child.on('error', err => reject(makeErr(cmd, err)))
    child.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error(`format: ${cmd.bin} exited with code ${code}`))
    })
  })
}

function makeErr(cmd: FormatCommand, err: unknown): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `format: \`${cmd.bin}\` not found. Install: ${cmd.install}`
      : `format: ${cmd.bin} failed — ${(err as Error).message}`,
  )
}
