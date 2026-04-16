import kink from '~/code/tool/shared/kink'
import {
  spawnAndWait,
  spawnAndCapture,
} from '~/code/tool/node/spawn'

type BinArgs = { bin: string; args: string[] }

export async function runCalibreCommand(input: BinArgs) {
  await spawnAndWait({ verb: 'convert', ...input })
}

export async function runLibreOfficeCommand(input: BinArgs) {
  await spawnAndWait({ verb: 'convert', ...input })
}

// https://html-validate.org/dev/running-in-browser.html
// https://github.com/apostrophecms/sanitize-html

export async function runPdfLatexCommand(input: BinArgs) {
  try {
    await spawnAndCapture({ verb: 'convert', ...input })
  } catch (e) {
    if (e instanceof Error) {
      const parsed = parseLatexError(e.message)
      if (parsed) {
        throw new Error(parsed)
      }
      throw e
    }
  }
}

function parseLatexError(text: string) {
  let lines = text.trim().split('\n')
  let firstErrorFound = false
  let lastErrorFound = false
  let message: Array<string> = []

  let newLineCount = 0

  lines.forEach(line => {
    if (line.match(/^\!/)) {
      if (firstErrorFound) {
        lastErrorFound = true
      }
      firstErrorFound = true
    }

    if (lastErrorFound) {
      return
    }

    if (firstErrorFound) {
      // don't have more than 2 new lines in a row.
      if (line.match(/^\s*$/)) {
        newLineCount++

        if (newLineCount > 1) {
          return
        }
      } else {
        newLineCount = 0
      }

      if (line.match(/See the LaTeX manual/i)) {
        return
      }

      if (line.match(/Type\s+H <return>\s+for immediate help/i)) {
        return
      }

      if (line.match(/^\s+\.\.\.\s*/)) {
        return
      }

      message.push(line.replace(/^\!\s+/, '').replace(/\s*$/, ''))
    }
  })

  return message.join('\n').replace(/\n\n+/gm, '\n\n')
}

export async function runExiftoolCommand(input: BinArgs) {
  return await spawnAndCapture({ verb: 'convert', ...input })
}

export async function runEbookConvertCommand(input: BinArgs) {
  await spawnAndWait({ verb: 'convert', ...input })
}

export async function runSofficeCommand(input: BinArgs) {
  await spawnAndWait({ verb: 'convert', ...input })
}

export async function runJupyterCommand(input: BinArgs) {
  await spawnAndWait({ verb: 'convert', ...input })
}

export async function runDocx2pdfCommand(input: BinArgs) {
  await spawnAndWait({ verb: 'convert', ...input })
}

export async function runUnoconvCommand(input: BinArgs) {
  await spawnAndWait({ verb: 'convert', ...input })
}

export async function runPandocCommand(input: BinArgs) {
  try {
    return await spawnAndCapture({ verb: 'convert', ...input })
  } catch (e) {
    if (e instanceof Error) {
      const match = e.message.match(
        /pandoc: (.+): withBinaryFile: does not exist \(No such file or directory\)/,
      )
      if (match) {
        throw kink('file_missing_error', { path: match[1]! })
      }
    }
    throw e
  }
}
