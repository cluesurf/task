import kink from '~/code/tool/shared/kink'
import { spawnAndCapture } from '~/code/tool/node/spawn'

export async function runFontforgeCommand(input: {
  bin: string
  args: string[]
}) {
  try {
    return await spawnAndCapture({ verb: 'convert font', ...input })
  } catch (e) {
    if (e instanceof Error) {
      const parsedError = parseFontError(e.message)
      if (parsedError) {
        throw kink('font_forge_error', { note: parsedError })
      }
    }
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
