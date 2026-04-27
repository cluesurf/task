import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import {
  convertCsvFileToJson,
  convertCsvFileToJsonl,
  convertCsvFileToXlsx,
  convertJsonFileToCsv,
  convertJsonFileToXlsx,
  convertJsonFileToYaml,
  convertJsonlFileToCsv,
  convertXlsxFileToCsv,
  convertXlsxFileToJson,
  convertYamlFileToJson,
} from '~/code/call/convert/data/transform/node'

const OUT = path.resolve(__dirname, '../../tmp/test-node/convert-data-transform')

describe('convert/data/transform — single-file pair conversions', () => {
  beforeAll(async () => {
    await fs.mkdir(OUT, { recursive: true })
  })

  describe('CSV ↔ JSON', () => {
    const src = () => path.join(OUT, 'records.csv')
    const seed = `id,name,active
1,Ana,true
2,"O''Brian",false
3,"Has, comma",true
`

    it('csv → json', async () => {
      await fs.writeFile(src(), seed)
      const dst = path.join(OUT, 'records.json')
      const r = await convertCsvFileToJson({ source: src(), destination: dst })
      expect(r.rows).toBe(3)
      const parsed = JSON.parse(await fs.readFile(dst, 'utf8'))
      expect(parsed).toHaveLength(3)
      expect(parsed[0]).toEqual({ id: '1', name: 'Ana', active: 'true' })
      expect(parsed[2].name).toBe('Has, comma')
    })

    it('csv → jsonl', async () => {
      await fs.writeFile(src(), seed)
      const dst = path.join(OUT, 'records.jsonl')
      const r = await convertCsvFileToJsonl({ source: src(), destination: dst })
      expect(r.rows).toBe(3)
      const text = await fs.readFile(dst, 'utf8')
      const lines = text.trim().split('\n')
      expect(lines).toHaveLength(3)
      expect(JSON.parse(lines[0]!).id).toBe('1')
    })

    it('json → csv preserves quoting and embedded delimiters', async () => {
      const src2 = path.join(OUT, 'in.json')
      const dst = path.join(OUT, 'out.csv')
      await fs.writeFile(
        src2,
        JSON.stringify([
          { id: 1, note: 'has, comma' },
          { id: 2, note: 'has "quote"' },
        ]),
      )
      const r = await convertJsonFileToCsv({ source: src2, destination: dst })
      expect(r.rows).toBe(2)
      const out = await fs.readFile(dst, 'utf8')
      expect(out).toContain('"has, comma"')
      expect(out).toContain('"has ""quote"""')
    })

    it('jsonl → csv', async () => {
      const src2 = path.join(OUT, 'in.jsonl')
      const dst = path.join(OUT, 'out.csv')
      await fs.writeFile(src2, '{"a":1,"b":2}\n{"a":3,"b":4}\n')
      const r = await convertJsonlFileToCsv({
        source: src2,
        destination: dst,
      })
      expect(r.rows).toBe(2)
      expect(await fs.readFile(dst, 'utf8')).toMatch(/a,b\n1,2\n3,4/)
    })

    it('json → csv rejects non-array input', async () => {
      const src2 = path.join(OUT, 'object.json')
      await fs.writeFile(src2, '{"not":"an array"}')
      await expect(async () =>
        convertJsonFileToCsv({
          source: src2,
          destination: path.join(OUT, 'irrelevant.csv'),
        }),
      ).rejects.toThrow(/array/)
    })
  })

  describe('JSON ↔ YAML', () => {
    it('json → yaml round-trips', async () => {
      const j = path.join(OUT, 'data.json')
      const y = path.join(OUT, 'data.yaml')
      const j2 = path.join(OUT, 'roundtrip.json')

      await fs.writeFile(
        j,
        JSON.stringify({ name: 'task', tags: ['cli', 'lib'], n: 42 }),
      )
      await convertJsonFileToYaml({ source: j, destination: y })
      const yamlText = await fs.readFile(y, 'utf8')
      expect(yamlText).toContain('name: task')
      expect(yamlText).toContain('- cli')

      await convertYamlFileToJson({ source: y, destination: j2 })
      const back = JSON.parse(await fs.readFile(j2, 'utf8'))
      expect(back).toEqual({ name: 'task', tags: ['cli', 'lib'], n: 42 })
    })
  })

  describe('XLSX ↔ CSV / JSON', () => {
    it('csv → xlsx → json round-trip', async () => {
      const csv = path.join(OUT, 'sheet.csv')
      const xlsx = path.join(OUT, 'sheet.xlsx')
      const json = path.join(OUT, 'sheet.json')

      await fs.writeFile(csv, 'id,name\n1,a\n2,b\n3,c\n')
      await convertCsvFileToXlsx({ source: csv, destination: xlsx })
      const stat = await fs.stat(xlsx)
      expect(stat.size).toBeGreaterThan(0)

      const r = await convertXlsxFileToJson({
        source: xlsx,
        destination: json,
      })
      expect(r.rows).toBe(3)
      const parsed = JSON.parse(await fs.readFile(json, 'utf8'))
      expect(parsed).toHaveLength(3)
      expect(parsed[0].name).toBe('a')
    })

    it('json → xlsx → csv round-trip', async () => {
      const json = path.join(OUT, 'in.json')
      const xlsx = path.join(OUT, 'rt.xlsx')
      const csv = path.join(OUT, 'rt.csv')

      await fs.writeFile(
        json,
        JSON.stringify([
          { id: 1, name: 'a' },
          { id: 2, name: 'b' },
        ]),
      )
      await convertJsonFileToXlsx({ source: json, destination: xlsx })
      await convertXlsxFileToCsv({ source: xlsx, destination: csv })
      const text = await fs.readFile(csv, 'utf8')
      expect(text).toMatch(/id,name/)
      expect(text).toMatch(/1,a/)
      expect(text).toMatch(/2,b/)
    })
  })
})
