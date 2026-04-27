import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { parseTableNode } from '~/code/call/parse/table/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/parse-table')

describe('parse table', () => {
  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('parses an HTML table with thead', async () => {
    const html = `
      <table>
        <thead>
          <tr><th>id</th><th>name</th><th>active</th></tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Ana</td><td>true</td></tr>
          <tr><td>2</td><td>Bo</td><td>false</td></tr>
        </tbody>
      </table>
    `
    const r = await parseTableNode({
      input: { text: html, format: 'html' },
    })
    expect(r.tables).toHaveLength(1)
    expect(r.tables[0]!.headers).toEqual(['id', 'name', 'active'])
    expect(r.tables[0]!.rows).toEqual([
      { id: '1', name: 'Ana', active: 'true' },
      { id: '2', name: 'Bo', active: 'false' },
    ])
  })

  it('parses multiple tables on a page', async () => {
    const html = `
      <table><tr><th>a</th></tr><tr><td>1</td></tr></table>
      <p>between</p>
      <table><tr><th>b</th></tr><tr><td>2</td></tr></table>
    `
    const r = await parseTableNode({ input: { text: html, format: 'html' } })
    expect(r.tables).toHaveLength(2)
    expect(r.tables[0]!.headers).toEqual(['a'])
    expect(r.tables[1]!.headers).toEqual(['b'])
  })

  it('synthesizes column names when no <th> is present', async () => {
    const html = `
      <table>
        <tr><td>x</td><td>y</td></tr>
        <tr><td>1</td><td>2</td></tr>
      </table>
    `
    const r = await parseTableNode({ input: { text: html, format: 'html' } })
    expect(r.tables[0]!.headers).toEqual(['col_0', 'col_1'])
    // first <tr> has td (no th), so it's a data row, not a header
    expect(r.tables[0]!.rows[0]).toEqual({ col_0: 'x', col_1: 'y' })
  })

  it('honors --index to scope to a single table', async () => {
    const html = `
      <table><tr><th>a</th></tr><tr><td>1</td></tr></table>
      <table><tr><th>b</th></tr><tr><td>2</td></tr></table>
    `
    const r = await parseTableNode({
      input: { text: html, format: 'html' },
      index: 1,
    })
    expect(r.tables).toHaveLength(1)
    expect(r.tables[0]!.headers).toEqual(['b'])
  })

  it('writes a JSON report when output is given', async () => {
    const html = '<table><tr><th>x</th></tr><tr><td>1</td></tr></table>'
    const out = path.join(OUT, 'tables.json')
    await parseTableNode({
      input: { text: html, format: 'html' },
      output: { file: { path: out } },
    })
    const parsed = JSON.parse(await fs.readFile(out, 'utf8'))
    expect(parsed.tables[0].headers).toEqual(['x'])
  })

  it('rejects unknown extensions for file paths', async () => {
    const file = path.join(OUT, 'mystery.xyz')
    await fs.writeFile(file, 'irrelevant')
    await expect(async () =>
      parseTableNode({ input: { file: { path: file } } }),
    ).rejects.toThrow(/unsupported/)
  })
})
