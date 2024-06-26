import stripAnsi from 'strip-ansi'
import tint, { Tint } from '@termsurf/tint-text'
import ora from 'ora'
import { log, logWithSpace } from '~/code/tool/shared/logger'
import isObject from 'lodash/isObject'
import kebabCase from 'lodash/kebabCase'
import makeSiteKinkText from '@termsurf/kink-site'
import { Form, BaseHash } from '@termsurf/form'
import { makeLineCallLinkList } from './parse'

const M: Tint = { tone: 'magenta' }
const C: Tint = { tone: 'cyan' }
const CB: Tint = { tone: 'cyan', bold: true }
const B: Tint = { tone: 'blackBright' }
const W: Tint = { tone: 'white' }
const WB: Tint = { tone: 'whiteBright' }
const G: Tint = { tone: 'green' }
const GB: Tint = { tone: 'green', bold: true }
const R: Tint = { tone: 'red' }
const RB: Tint = { tone: 'red', bold: true }

export function stripAnsiFromText(source) {
  return stripAnsi(source.input.text)
}

let STYLE = 'pretty'

export function setLoggingStyle(style: string) {
  STYLE = style
}

export function logStart(text: string) {
  if (STYLE === 'pretty') {
    const spinner = logSpinnerWithSpace(
      `${tint('task <', B)}${tint(text, C)}${tint('>', B)}`,
    )
    return spinner
  } else {
    log(text)
  }
}

export function logConverting({ type, input }) {
  const text: Array<string> = []
  text.push(tint('task <', B))
  text.push(tint(`Converting ${type}`, C), ' ')
  text.push(tint(input.input.format, CB), ' ')
  text.push(tint(`➜`, C), ' ')
  text.push(tint(input.output.format, CB), '')
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✦', M), ' ')
  text.push(tint('take <', B))
  text.push(tint(input.input.file.path, M))
  text.push(tint('>', B))
  if (STYLE === 'pretty') {
    return logSpinnerWithSpace(text.join(''))
  } else {
    log(stripAnsi(text.join('')))
  }
}

export function logConverted({ type, path, input }) {
  const text: Array<string> = []
  text.push(tint('✔', G), ' ')
  text.push(tint('task <', B))
  text.push(tint(`Converted ${type}`, G), ' ')
  text.push(tint(input.input.format, GB), ' ')
  text.push(tint(`➜`, G), ' ')
  text.push(tint(input.output.format, GB), '')
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✦', M), ' ')
  text.push(tint('take <', B))
  text.push(tint(input.input.file.path, M))
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✔', G), ' ')
  text.push(tint('make <', B))
  text.push(tint(path, G))
  text.push(tint('>', B))
  if (STYLE === 'pretty') {
    log(text.join(''))
  } else {
    log(stripAnsi(text.join('')))
  }
}

export function logFormatting({ type, input }) {
  const text: Array<string> = []
  text.push(tint('task <', B))
  text.push(tint(`Formatting`, C), ' ')
  text.push(tint(input.format, CB))
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✦', M), ' ')
  text.push(tint('take <', B))
  text.push(tint(input.input.file.path, M))
  text.push(tint('>', B))
  if (STYLE === 'pretty') {
    return logSpinnerWithSpace(text.join(''))
  } else {
    log(stripAnsi(text.join('')))
  }
}

export function logFormatted({ type, path, input }) {
  const text: Array<string> = []
  text.push(tint('✔', G), ' ')
  text.push(tint('task <', B))
  text.push(tint(`Formatted`, G), ' ')
  text.push(tint(input.format, GB))
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✦', M), ' ')
  text.push(tint('take <', B))
  text.push(tint(input.input.file.path, M))
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✔', G), ' ')
  text.push(tint('make <', B))
  text.push(tint(path, G))
  text.push(tint('>', B))
  if (STYLE === 'pretty') {
    log(text.join(''))
  } else {
    log(stripAnsi(text.join('')))
  }
}

export function logCompiling({ input }) {
  const text: Array<string> = []
  text.push(tint('task <', B))
  text.push(tint(`Compiling`, C), ' ')
  text.push(tint(input.input.format, CB))
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✦', M), ' ')
  text.push(tint('take <', B))
  text.push(tint(input.input.file.path, M))
  text.push(tint('>', B))
  if (STYLE === 'pretty') {
    return logSpinnerWithSpace(text.join(''))
  } else {
    log(stripAnsi(text.join('')))
  }
}

export function logCompiled({ path, input }) {
  const text: Array<string> = []
  text.push(tint('✔', G), ' ')
  text.push(tint('task <', B))
  text.push(tint(`Compiled`, G), ' ')
  text.push(tint(input.input.format, GB))
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✦', M), ' ')
  text.push(tint('take <', B))
  text.push(tint(input.input.file.path, M))
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✔', G), ' ')
  text.push(tint('make <', B))
  text.push(tint(path, G))
  text.push(tint('>', B))
  if (STYLE === 'pretty') {
    log(text.join(''))
  } else {
    log(stripAnsi(text.join('')))
  }
}

export function logSpinnerWithSpace(text: string) {
  // return ora({ prefixText: '\n ', suffixText: '\n' }).start(text)
  return ora().start(text)
}

export function logSpinner(text: string) {
  return ora().start(text)
}

export function logTaskSuccess(text: string) {
  if (!text) {
    return
  }

  if (STYLE === 'pretty') {
    logWithSpace(`${tint(`task <`, B)}${tint(text, G)}${tint('>', B)}`)
  } else {
    log(text)
  }
}

export function logOutput(text: string, type = 'link') {
  if (!text) {
    return
  }

  if (STYLE === 'pretty') {
    logWithSpace(
      `  ${tint(`${type} <`, B)}${tint(text, G)}${tint('>', B)}`,
    )
  } else {
    log(text)
  }
}

export function logOutputError(text: string) {
  if (!text) {
    return
  }

  if (STYLE === 'pretty') {
    logWithSpace(
      `  ${tint('link <', B)}${tint(text, R)}${tint('>', B)}`,
    )
  } else {
    log(text)
  }
}

export function renderProgress(text: string) {
  if (STYLE === 'pretty') {
    return `${tint('note <', B)}${tint(text, C)}${tint('>', B)}`
  } else {
    return text
  }
}

export function logTree(json) {
  const text: Array<string> = []

  traverse(json)

  console.log(text.join('\n'))

  function traverse(json, depth = 1) {
    for (const name in json) {
      const val = json[name]
      if (val) {
        if (isObject(val)) {
          text.push(
            ident(depth) +
              tint('name', B) +
              ' ' +
              tint(kebabCase(name), W),
          )
          traverse(val, depth + 1)
        } else {
          text.push(
            ident(depth) +
              tint('name', B) +
              ' ' +
              tint(kebabCase(name), W),
          )
          text.push(
            ident(depth + 1) +
              tint('note <', B) +
              tint(val, C) +
              tint('>', B),
          )
        }
      }
    }
  }
}

function ident(size: number) {
  return ''.padStart(size * 2, ' ')
}

export function logError(error) {
  makeSiteKinkText(error)
    .split('\n')
    .forEach((line, i) => {
      line.match(/^(\s*)/)
      const prefix = RegExp.$1
      line = line.trim()
      if (i === 0) {
        console.log(`${prefix}${tint('✦', B)} ${line}`)
      } else {
        console.log(`${prefix}${tint('✦', B)} ${line}`)
      }
    })
}

export function logHelp(head: string, form: Form, mesh: BaseHash) {
  const text: Array<string> = [
    `${tint(`hint <`, B)} ${tint(head, M)}${tint(`>`, B)}`,
  ]
  const list = makeLineCallLinkList(mesh, form)
  list.forEach(({ link, note }) => {
    text.push(`  ${tint(`link <`, B)}${link.join(', ')}${tint(`>`, B)}`)
    if (note) {
      text.push(
        `    ${tint(`note <`, B)}${tint(note, C)}${tint(`>`, B)}`,
      )
    }
  })
  console.log(text.join('\n'))
}

export function logGenericTaskHelp() {
  const text: Array<string> = [
    `${tint(`call <`, B)} ${tint(`task convert`, M)}${tint(`>`, B)}`,
    `${tint(`call <`, B)} ${tint(`task format`, M)}${tint(`>`, B)}`,
    `${tint(`call <`, B)} ${tint(`task verify`, M)}${tint(`>`, B)}`,
  ]
  console.log(text.join('\n'))
}

export function logVerifying({ type, input }) {
  const text: Array<string> = []
  text.push(tint('task <', B))
  text.push(tint(`Verifying ${type}`, C), ' ')
  text.push(tint(input.format, CB))
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✦', M), ' ')
  text.push(tint('take <', B))
  text.push(tint(input.file.path, M))
  text.push(tint('>', B))
  if (STYLE === 'pretty') {
    return logSpinnerWithSpace(text.join(''))
  } else {
    log(stripAnsi(text.join('')))
  }
}

export function logVerificationStatus({ type, input, isVerified }) {
  const text: Array<string> = []
  if (isVerified) {
    text.push(tint('✔', G), ' ')
    text.push(tint('task <', B))
    text.push(
      tint(`Verified ${type} ➜`, G),
      ' ',
      tint(input.format, GB),
    )
  } else {
    text.push(tint('✘', R), ' ')
    text.push(tint('task <', B))
    text.push(
      tint(`Failed ${type} verification ➜ not`, R),
      ' ',
      tint(input.format, RB),
    )
  }
  text.push(tint('>', B))
  text.push('\n  ')
  text.push(tint('✦', M), ' ')
  text.push(tint('take <', B))
  text.push(tint(input.file.path, M))
  text.push(tint('>', B))
  if (STYLE === 'pretty') {
    log(text.join(''))
  } else {
    log(stripAnsi(text.join('')))
  }
}
