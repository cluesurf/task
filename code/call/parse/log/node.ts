import fs from 'node:fs/promises'
import { parseLogLine, type LogEntry } from '~/code/tool/node/log-parse/base'
import { getLoggingStyle } from '~/code/tool/node/log'

export type ParseLogNodeInput = {
  file: string
  format: 'json' | 'yaml'
  limit?: number
}

async function parseLogNode(input: ParseLogNodeInput) {
  const text = await fs.readFile(input.file, 'utf8')
  const entries: LogEntry[] = []
  let count = 0
  for (const line of text.split('\n')) {
    if (!line.trim()) continue
    if (input.limit !== undefined && count >= input.limit) break
    entries.push(parseLogLine(line))
    count++
  }

  const style = getLoggingStyle()
  if (style === 'pretty' || style === 'text') {
    if (input.format === 'yaml') {
      const yaml = await import('yaml').catch(() => null)
      if (!yaml) throw new Error('parse log: yaml serializer not available — run `pnpm add yaml`')
      process.stdout.write((yaml.default ?? yaml).stringify(entries) + '\n')
    } else {
      process.stdout.write(JSON.stringify(entries, null, 2) + '\n')
    }
  }
  return { entries, count }
}

export default parseLogNode
export { parseLogNode }
