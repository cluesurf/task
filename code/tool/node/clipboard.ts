/**
 * Platform clipboard shim. Picks the right binary + argv for the
 * host OS, then pipes a string into it via `spawnAndWait`. Used by
 * every `task copy <thing>` verb — one helper instead of each
 * copy-verb re-doing the platform detection and spawn plumbing.
 *
 *   darwin      → pbcopy
 *   win32       → clip
 *   Wayland     → wl-copy
 *   X11 (else)  → xclip -selection clipboard
 */

import { spawnAndWait } from './spawn'

type ClipboardTool = { bin: string; args: string[] }

export function pickClipboardTool(): ClipboardTool | undefined {
  if (process.platform === 'darwin')
    return { bin: 'pbcopy', args: [] }
  if (process.platform === 'win32')
    return { bin: 'clip', args: [] }
  // Wayland takes precedence over X11 when both are around.
  if (process.env.WAYLAND_DISPLAY)
    return { bin: 'wl-copy', args: [] }
  return { bin: 'xclip', args: ['-selection', 'clipboard'] }
}

export async function copyToClipboard(input: {
  verb: string
  value: string
}): Promise<void> {
  const tool = pickClipboardTool()
  if (!tool) {
    throw new Error(
      `${input.verb}: no clipboard tool found. Install pbcopy, xclip, wl-copy, or clip.`,
    )
  }
  await spawnAndWait({
    verb: input.verb,
    bin: tool.bin,
    args: tool.args,
    stdin: input.value,
    quiet: true,
  })
}
