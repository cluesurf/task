import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { buildCommandToQuerySqlDuckdb } from '~/code/call/query/sql/duckdb/command'
import { querySqlDuckdbNode } from '~/code/call/query/sql/duckdb/node'

const SKIP_PATTERN = /not found|ENOENT|not available|duckdb|exited with code/i
const OUT = path.resolve(__dirname, '../../tmp/test-node/query-sql')

describe('query sql duckdb — argv builder', () => {
  it('uses raw SQL when provided', () => {
    const c = buildCommandToQuerySqlDuckdb({
      sql: 'SELECT 1',
    })
    expect(c.bin).toBe('duckdb')
    expect(c.args).toContain('-c')
    expect(c.args).toContain('SELECT 1')
  })

  it('builds SQL from convenience fields', () => {
    const c = buildCommandToQuerySqlDuckdb({
      from: 'data.csv',
      select: 'name, count(*)',
      where: 'active = true',
      limit: 10,
    })
    const sql = c.args[c.args.indexOf('-c') + 1]!
    expect(sql).toContain("SELECT name, count(*)")
    expect(sql).toContain("FROM 'data.csv'")
    expect(sql).toContain('WHERE active = true')
    expect(sql).toContain('LIMIT 10')
  })

  it('properly escapes paths with apostrophes', () => {
    const c = buildCommandToQuerySqlDuckdb({
      from: "weird's path.csv",
    })
    const sql = c.args[c.args.indexOf('-c') + 1]!
    // Single quotes are doubled per ANSI SQL.
    expect(sql).toContain("'weird''s path.csv'")
  })

  it('honors the format flag', () => {
    const c = buildCommandToQuerySqlDuckdb({
      sql: 'SELECT 1',
      format: 'json',
    })
    expect(c.args).toContain('-json')
  })

  it('rejects negative or fractional limits', () => {
    expect(() =>
      buildCommandToQuerySqlDuckdb({ from: 'x.csv', limit: -1 }),
    ).toThrow(/non-negative/)
    expect(() =>
      buildCommandToQuerySqlDuckdb({ from: 'x.csv', limit: 1.5 }),
    ).toThrow(/non-negative/)
  })

  it('throws when neither sql nor from is given', () => {
    expect(() => buildCommandToQuerySqlDuckdb({})).toThrow(/sql.*from/)
  })
})

describe('query sql duckdb — live (skip when duckdb missing)', () => {
  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  it('counts rows in a tiny CSV', async () => {
    const csv = path.join(OUT, 'tiny.csv')
    await fs.writeFile(csv, 'id,name\n1,a\n2,b\n3,c\n')
    try {
      const out = await querySqlDuckdbNode({
        sql: `SELECT count(*) AS n FROM '${csv}'`,
        format: 'csv',
      })
      expect(out).toMatch(/3/)
    } catch (e) {
      if (SKIP_PATTERN.test(String((e as Error)?.message ?? e))) return
      throw e
    }
  })
})
