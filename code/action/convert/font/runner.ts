import { ChildProcessError, exec } from '~/code/tool/node/process.js'
import kink from '~/code/tool/shared/kink.js'
import { Command } from '~/code/type/shared/index.js'

export async function runFontforgeCommand(cmd: Command) {
  try {
    return await exec(cmd.link)
  } catch (e) {
    if (e instanceof ChildProcessError) {
      if (e.data.stderr) {
        const parsedError = parseFontError(e.data.stderr)
        if (parsedError) {
          throw kink('font_forge_error', { note: parsedError })
        }
      }
    }
    // throw e
  }
}

export function parseFontError(text: string) {
  const lines = text.trim().split(/\n/)

  if (!lines.shift()?.match(/^Copyright \(c\) 2000\-2023/)) {
    return
  }

  let message: Array<string> = []
  for (const line of lines) {
    if (line.startsWith(` `)) {
      continue
    }

    if (
      line.trim().match(/^The requested file, (.+), does not exist$/)
    ) {
      throw kink('file_missing_error', { path: RegExp.$1 })
    } else {
      message.push(line)
    }
  }

  return message.join('\n')
}
