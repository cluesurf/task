/**
 * `task copy ssh-key` — pipe the .pub into the platform
 * clipboard tool (`pbcopy` on macOS, `xclip` / `wl-copy` on
 * Linux). When nothing is available, print a hint instead of
 * silently dropping the copy.
 */

import { spawn } from 'node:child_process'
import { readPublicKey } from '~/code/tool/node/ssh/key'

export type CopySshKeyNodeInput = { name: string }

export async function copySshKeyNode(input: CopySshKeyNodeInput) {
  const key = await readPublicKey(input.name)
  const tool = pickClipboardTool()
  if (!tool) {
    throw new Error(
      'copy ssh-key: no clipboard tool found. Install pbcopy, xclip, or wl-copy.',
    )
  }
  await new Promise<void>((resolve, reject) => {
    const child = spawn(tool.cmd, tool.args, { stdio: ['pipe', 'ignore', 'ignore'] })
    child.on('error', reject)
    child.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`${tool.cmd} exited ${code}`)),
    )
    child.stdin!.end(key + '\n')
  })
  return { name: input.name, bytes: key.length }
}

function pickClipboardTool(): { cmd: string; args: string[] } | undefined {
  if (process.platform === 'darwin') return { cmd: 'pbcopy', args: [] }
  if (process.platform === 'win32') return { cmd: 'clip', args: [] }
  // Wayland takes precedence over X11 when both are around.
  if (process.env.WAYLAND_DISPLAY) return { cmd: 'wl-copy', args: [] }
  return { cmd: 'xclip', args: ['-selection', 'clipboard'] }
}
