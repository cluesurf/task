/**
 * `task inspect process <pid>` — headline stats always, plus any
 * combination of `--show file,port,children` expansions.
 */

import tint, { Tint } from '@termsurf/tint-text'
import stripAnsi from 'strip-ansi'
import {
  childrenOf,
  listFilesFor,
  listPortsFor,
  listProcesses,
} from '~/code/tool/node/proc/make'
import { renderPorts, renderProcesses } from '~/code/tool/node/proc/render'
import { getLoggingStyle } from '~/code/tool/node/log'

export type InspectProcessNodeInput = {
  pid: number
  show: string[]
}

const KEY: Tint = { tone: 'white' }
const VAL: Tint = { tone: 'whiteBright' }
const HEAD: Tint = { tone: 'whiteBright', bold: true }

async function inspectProcessNode(input: InspectProcessNodeInput) {
  const all = await listProcesses()
  const proc = all.find(p => p.pid === input.pid)
  if (!proc) {
    throw new Error(`inspect process: no process with pid ${input.pid}`)
  }

  const wants = new Set(input.show)
  const children = wants.has('children') ? childrenOf(all, input.pid) : []
  const files = wants.has('file') ? await listFilesFor(input.pid) : []
  const ports = wants.has('port') ? await listPortsFor(input.pid) : []

  const style = getLoggingStyle()
  const color = style === 'pretty'

  if (style === 'pretty' || style === 'text') {
    const paint = (s: string, t: Tint) => (color ? tint(s, t) : stripAnsi(tint(s, t)))
    const rows: Array<[string, string]> = [
      ['pid', String(proc.pid)],
      ['ppid', String(proc.ppid)],
      ['user', proc.user],
      ['name', proc.name],
      ['cpu%', proc.cpu.toFixed(1)],
      ['mem%', proc.memory.toFixed(1)],
      ['rss', `${proc.rss} KB`],
      ['command', proc.command],
    ]
    const widest = rows.reduce((m, [k]) => Math.max(m, k.length), 0)
    const out: string[] = ['', paint(`pid ${proc.pid}`, HEAD), '']
    for (const [k, v] of rows) {
      out.push(paint(k.padEnd(widest), KEY) + '    ' + paint(v, VAL))
    }
    out.push('')
    process.stdout.write(out.join('\n') + '\n')

    if (children.length) {
      process.stdout.write(paint('children', HEAD) + '\n')
      process.stdout.write(renderProcesses(children, color) + '\n')
    }
    if (ports.length) {
      process.stdout.write(paint('ports', HEAD) + '\n')
      process.stdout.write(renderPorts(ports, color) + '\n')
    }
    if (files.length) {
      process.stdout.write(paint('open files', HEAD) + '\n\n')
      for (const f of files) process.stdout.write('  ' + f + '\n')
      process.stdout.write('\n')
    }
  }

  return { process: proc, children, files, ports }
}

export default inspectProcessNode
export { inspectProcessNode }
