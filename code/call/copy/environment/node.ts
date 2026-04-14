/**
 * `task copy environment <NAME>` — reads the env var via the
 * existing `get environment` node, then pipes the value into the
 * platform clipboard tool (pbcopy / clip / wl-copy / xclip). One
 * fewer step than `task get environment ... | pbcopy`.
 */

import fs from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { getLoggingStyle } from '~/code/tool/node/log'

export type CopyEnvironmentNodeInput = {
  name: string
  file?: string
}

export async function copyEnvironmentNode(input: CopyEnvironmentNodeInput) {
  // Read directly instead of delegating to `get environment` so
  // we don't echo the value to stdout before putting it on the
  // clipboard. Exactly one of the two sources wins: file if
  // `--file` is set, otherwise process.env.
  const value = input.file
    ? await readFromEnvFile(input.file, input.name)
    : process.env[input.name] ?? null
  if (value === null) {
    throw new Error(`copy environment: \`${input.name}\` is not set`)
  }
  const tool = pickClipboardTool()
  if (!tool) {
    throw new Error(
      'copy environment: no clipboard tool found. Install pbcopy, xclip, or wl-copy.',
    )
  }
  await new Promise<void>((resolve, reject) => {
    const child = spawn(tool.cmd, tool.args, {
      stdio: ['pipe', 'ignore', 'ignore'],
    })
    child.on('error', reject)
    child.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`${tool.cmd} exited ${code}`)),
    )
    child.stdin!.end(value)
  })

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    process.stdout.write(`copied ${input.name} to clipboard\n`)
  }
  return { name: input.name, bytes: value.length }
}

async function readFromEnvFile(
  file: string,
  name: string,
): Promise<string | null> {
  let text: string
  try {
    text = await fs.readFile(file, 'utf8')
  } catch {
    throw new Error(`copy environment: ${file} not found`)
  }
  for (const line of text.split('\n')) {
    const match = line.match(/^\s*([A-Za-z_][\w]*)\s*=\s*(.*)\s*$/)
    if (!match || match[1] !== name) continue
    let v = match[2]!
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1)
    }
    return v
  }
  return null
}

function pickClipboardTool(): { cmd: string; args: string[] } | undefined {
  if (process.platform === 'darwin') return { cmd: 'pbcopy', args: [] }
  if (process.platform === 'win32') return { cmd: 'clip', args: [] }
  if (process.env.WAYLAND_DISPLAY) return { cmd: 'wl-copy', args: [] }
  return { cmd: 'xclip', args: ['-selection', 'clipboard'] }
}
