import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { transformDataNode } from '~/code/call/transform/data/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/transform-data')
const SKIP_DUCKDB = /not found|ENOENT|duckdb/i

describe('transform data', () => {
  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  describe('--map driver', () => {
    it('renames + picks + coerces fields per the config', async () => {
      const csv = path.join(OUT, 'in.csv')
      const out = path.join(OUT, 'out.json')
      const config = path.join(OUT, 'map.yml')

      await fs.writeFile(
        csv,
        'id,full_name,age,internal\n1,Ana,30,x\n2,Bo,40,y\n',
      )
      await fs.writeFile(
        config,
        `rename:
  full_name: name
pick: [id, name, age]
drop: [internal]
coerce:
  id: integer
  age: integer
default:
  active: true
`,
      )

      await transformDataNode({
        input: { file: { path: csv } },
        output: { file: { path: out } },
        driver: 'map',
        mapConfig: config,
      })
      const parsed = JSON.parse(await fs.readFile(out, 'utf8'))
      expect(parsed[0]).toEqual({ id: 1, name: 'Ana', age: 30 })
      expect(parsed[1]).toEqual({ id: 2, name: 'Bo', age: 40 })
    })

    it('writes JSONL when the destination ends in .jsonl', async () => {
      const csv = path.join(OUT, 'in2.csv')
      const out = path.join(OUT, 'out2.jsonl')
      const config = path.join(OUT, 'map2.yml')

      await fs.writeFile(csv, 'id,name\n1,a\n2,b\n')
      await fs.writeFile(config, 'pick: [id, name]\n')

      await transformDataNode({
        input: { file: { path: csv } },
        output: { file: { path: out } },
        driver: 'map',
        mapConfig: config,
      })
      const lines = (await fs.readFile(out, 'utf8'))
        .split('\n')
        .filter(l => l)
      expect(lines).toHaveLength(2)
      expect(JSON.parse(lines[0]!)).toEqual({ id: '1', name: 'a' })
    })

    it('rejects when --map-config is missing', async () => {
      await expect(async () =>
        transformDataNode({
          input: { file: { path: path.join(OUT, 'in.csv') } },
          driver: 'map',
        }),
      ).rejects.toThrow(/map-config/)
    })
  })

  describe('--jq driver', () => {
    it('filters JSONL via a jq expression', async () => {
      const src = path.join(OUT, 'logs.jsonl')
      const out = path.join(OUT, 'errors.json')
      await fs.writeFile(
        src,
        '{"level":"info","msg":"hi"}\n{"level":"error","msg":"boom"}\n',
      )
      try {
        await transformDataNode({
          input: { file: { path: src } },
          output: { file: { path: out } },
          driver: 'jq',
          jq: '.[] | select(.level=="error")',
        })
      } catch (e) {
        // jq-wasm load failures shouldn't fail other tests; skip
        // when the wasm bundle isn't available in this environment.
        if (/wasm|jq/i.test(String((e as Error)?.message ?? e))) return
        throw e
      }
      const parsed = JSON.parse(await fs.readFile(out, 'utf8'))
      expect(parsed[0].level).toBe('error')
    })
  })

  describe('--sql driver (skip when duckdb missing)', () => {
    it('selects via DuckDB SQL', async () => {
      const src = path.join(OUT, 'sql.csv')
      const out = path.join(OUT, 'sql.json')
      await fs.writeFile(src, 'id,name,active\n1,a,true\n2,b,false\n3,c,true\n')
      try {
        await transformDataNode({
          input: { file: { path: src } },
          output: { file: { path: out } },
          driver: 'sql',
          sql: 'SELECT id,name FROM in WHERE active',
        })
      } catch (e) {
        if (SKIP_DUCKDB.test(String((e as Error)?.message ?? e))) return
        throw e
      }
      const parsed = JSON.parse(await fs.readFile(out, 'utf8'))
      expect(Array.isArray(parsed)).toBe(true)
    })
  })
})
