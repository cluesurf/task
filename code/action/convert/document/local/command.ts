import { ChildProcessError, exec } from '~/code/tool/node/process.js'
import { Command } from '~/code/type/index.js'

export async function handleCalibreCommand(cmd: Command) {
  await exec(cmd.link.join(' '))
}

export async function handleLibreOfficeCommand(cmd: Command) {
  await exec(cmd.link.join(' '))
}

// https://html-validate.org/dev/running-in-browser.html
// https://github.com/apostrophecms/sanitize-html

export async function handlePdfLatexCommand(cmd: Command) {
  try {
    await exec(cmd.link.join(' '))
  } catch (e) {
    if (e instanceof ChildProcessError) {
      const message = e.data.stdout && parseLatexError(e.data.stdout)
      const error = new Error(message ?? e.data.error.message)
      throw error
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

export async function handleExiftoolCommand(cmd: Command) {
  return await exec(cmd.join(' '))
}

export async function handleEbookConvertCommand(cmd: Command) {
  return await exec(cmd.join(' '))
}

export async function handleSofficeCommand(cmd: Command) {
  return await exec(cmd.join(' '))
}

export async function handleJupyterCommand(cmd: Command) {
  return await exec(cmd.join(' '))
}

export async function handleDocx2pdfCommand(cmd: Command) {
  return await exec(cmd.join(' '))
}

export async function handleUnoconvCommand(cmd: Command) {
  return await exec(cmd.join(' '))
}

export async function handlePandocCommand(cmd: Command) {
  try {
    return await exec(cmd.join(' '))
  } catch (e) {
    if (e instanceof Error) {
      if (e instanceof ChildProcessError) {
        if (
          e.data.stderr?.match(
            /pandoc: (.+): withBinaryFile: does not exist \(No such file or directory\)/,
          )
        ) {
          throw kink('file_missing_error', { path: RegExp.$1 })
        }
      }
    }
    throw e
  }
}
