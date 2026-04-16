import fs from 'node:fs/promises'

import { listDomains, listDomainRecords } from '~/code/tool/node/doctl'
import {
  loadIanaTlds,
  type IanaTld,
  type IanaTldKind,
} from '~/code/tool/node/iana-tld'

export type ListDomainNodeInput = { records?: string }

async function listDomainNode(source: ListDomainNodeInput = {}): Promise<string> {
  if (source.records) return listDomainRecords(source.records)
  return listDomains()
}

/**
 * CLI helper for `task list domain --form tld`. Loads the
 * IANA TLD list, filters, sorts, formats, and writes to
 * stdout or `--output-file`.
 */

export async function listIanaTldsCli({
  type,
  sort,
  reverse,
  limit,
  output,
  outputFile,
  refresh,
}: {
  type: string
  sort: string
  reverse: boolean
  limit: number | undefined
  output: string
  outputFile: string | undefined
  refresh: boolean
}): Promise<void> {
  const kind: IanaTldKind | undefined =
    type === 'all' ? undefined : (type as IanaTldKind)

  let tlds = await loadIanaTlds({ kind, force: refresh })

  tlds = sortTlds(tlds, sort, reverse)
  if (limit !== undefined) {
    tlds = tlds.slice(0, limit)
  }

  const formatted = formatTlds(tlds, output)
  if (outputFile) {
    await fs.writeFile(outputFile, formatted)
  } else {
    process.stdout.write(formatted)
    if (!formatted.endsWith('\n')) {
      process.stdout.write('\n')
    }
  }
}

function sortTlds(
  tlds: IanaTld[],
  key: string,
  reverse: boolean,
): IanaTld[] {
  const sorted = tlds.slice()
  switch (key) {
    case 'kind':
      sorted.sort(
        (a, b) => a.kind.localeCompare(b.kind) || a.tld.localeCompare(b.tld),
      )
      break
    case 'length':
      sorted.sort(
        (a, b) => a.tld.length - b.tld.length || a.tld.localeCompare(b.tld),
      )
      break
    case 'name':
    default:
      sorted.sort((a, b) => a.tld.localeCompare(b.tld))
      break
  }
  return reverse ? sorted.reverse() : sorted
}

function formatTlds(tlds: IanaTld[], output: string): string {
  switch (output) {
    case 'csv':
      return (
        'tld,kind\n' +
        tlds.map(t => `${t.tld},${t.kind}`).join('\n')
      )
    case 'text':
      return tlds.map(t => t.tld).join('\n')
    case 'json':
    default:
      return JSON.stringify(tlds, null, 2)
  }
}

export default listDomainNode
export { listDomainNode }
