/**
 * Check whether a binary is available on `PATH`. Used by verbs
 * that branch on optional tools (e.g. `stern` for k8s log tail).
 *
 * Cross-platform: uses `where` on Windows, `which` elsewhere.
 */

import { spawn } from 'node:child_process'

export async function whichBinary(bin: string): Promise<boolean> {
  const lookup = process.platform === 'win32' ? 'where' : 'which'
  return new Promise(resolve => {
    const child = spawn(lookup, [bin], { stdio: 'ignore' })
    child.on('close', code => resolve(code === 0))
    child.on('error', () => resolve(false))
  })
}
