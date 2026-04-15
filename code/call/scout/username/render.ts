// HTML + Markdown renderers for `task scout username`. The
// terminal matrix lives in ./node.ts (renderMatrix). These are
// the "structured" output modes, gated by `--format html` /
// `--format markdown`.

export type ScoutCell = {
  username: string
  platform: string
  status: 'taken' | 'available' | 'unknown'
  url: string
}

export function renderScoutHtml({
  usernames,
  platforms,
  cells,
  inlineStyle = true,
}: {
  usernames: string[]
  platforms: string[]
  cells: ScoutCell[]
  /** Emit a <style> block so the HTML stands on its own when
   * pasted into a preview / copied to clipboard. */
  inlineStyle?: boolean
}): string {
  const key = (u: string, p: string) => `${u}\u0000${p}`
  const byKey = new Map<string, ScoutCell>()
  for (const c of cells) byKey.set(key(c.username, c.platform), c)

  const style = inlineStyle
    ? `<style>
  table { border-collapse: collapse; font: 14px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; }
  th, td { padding: 8px 12px; text-align: center; }
  th.nc, td.nc { text-align: left; font-weight: 600; }
  thead th { color: #888; font-weight: 500; letter-spacing: 0.04em; }
  tr.v + tr.v td { border-top: 1px solid rgba(128,128,128,.2); }
  thead tr.v th { border-bottom: 1px solid rgba(128,128,128,.35); }
  .chip { display: inline-block; padding: 4px 10px; border-radius: 6px; font-weight: 600; }
  .chip.free { color: #5bd87a; background: rgba(91, 216, 122, 0.12); }
  .chip.taken { color: #ff6b6b; background: rgba(255, 107, 107, 0.12); }
  .chip.unknown { color: #9ca3af; background: rgba(156, 163, 175, 0.12); }
</style>\n`
    : ''

  const head =
    '<thead>\n  <tr class="v">\n    <th class="nc">username</th>\n' +
    platforms.map(p => `    <th>${escape(p)}</th>`).join('\n') +
    '\n  </tr>\n</thead>'

  const body =
    '<tbody id="tbody">' +
    usernames
      .map(u => {
        const tds = platforms.map(p => {
          const c = byKey.get(key(u, p))
          const status =
            c?.status === 'available' ? 'free'
          : c?.status === 'taken'     ? 'taken'
          :                              'unknown'
          const glyph = status === 'free' ? '✓' : status === 'taken' ? '✕' : '·'
          const label = status === 'free' ? 'free' : status === 'taken' ? 'taken' : 'n/a'
          return `<td><span class="chip ${status}">${glyph} ${label}</span></td>`
        })
        return `<tr class="v"><td class="nc">${escape(u)}</td>${tds.join('')}</tr>`
      })
      .join('') +
    '</tbody>'

  return `${style}<table>\n  ${head}\n  ${body}\n</table>\n`
}

export function renderScoutMarkdown({
  usernames,
  platforms,
  cells,
}: {
  usernames: string[]
  platforms: string[]
  cells: ScoutCell[]
}): string {
  const key = (u: string, p: string) => `${u}\u0000${p}`
  const byKey = new Map<string, ScoutCell>()
  for (const c of cells) byKey.set(key(c.username, c.platform), c)

  const lines: string[] = []
  lines.push('| username | ' + platforms.join(' | ') + ' |')
  lines.push('| :--- | ' + platforms.map(() => ':---:').join(' | ') + ' |')
  for (const u of usernames) {
    const row = platforms.map(p => {
      const c = byKey.get(key(u, p))
      if (c?.status === 'available') return '✓ free'
      if (c?.status === 'taken') return '✕ taken'
      return '· n/a'
    })
    lines.push(`| ${u} | ${row.join(' | ')} |`)
  }
  return lines.join('\n') + '\n'
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
