// import { Csv2md } from 'csv2md'
import { parse, Options } from 'csv-parse/browser/esm/sync'
import typeOf from 'type-detect'
import escapeSqlString from 'sql-escape-string'
import {
  unflattenObject,
  flattenObjectSafe,
} from '~/code/tool/shared/object.js'
import isInteger from 'lodash/isInteger.js'
import sortKeys from 'json-keys-sort'

// let csv2md = new Csv2md({
//   pretty: true,
// })

// export async function convertCSVToMarkdownTable(text: string) {
//   let markdown = await csv2md.convert(text)
//   return markdown
// }

export async function convertCSVToJSON(
  text: string,
  {
    trim = true,
    columns = true,
    bom = true,
    objname,
    group_columns_by_name,
    skip_empty_lines,
    record_delimiter,
    nested_delimiter = '.',
  }: Options & { nested_delimiter?: string },
) {
  const records = parse(text, {
    trim,
    columns,
    bom,
    objname,
    group_columns_by_name,
    skip_empty_lines,
    record_delimiter,
  }).map((record: Record<string, string>) =>
    unflattenObject(record, nested_delimiter),
  )

  return records
}

// export function convertCsvToSql() {
//   const records = convertCSVToJSON(text)
//   return convertJsonToSql(records)
// }

export type TableColumnBuilder = {
  types: Record<string, boolean>
  index: number
  min?: number
  max?: number
  size?: number
  precision?: number
}

export type TableColumn = {
  type: string
  min?: number
  max?: number
  size?: number
  precision?: number
}

export type Table = {
  columns: Record<string, TableColumn>
  columnByIndex: Record<number, TableColumn>
  rows: Array<Array<any>>
}

export type TableBuilder = {
  columnIndex: number
  columns: Record<string, TableColumnBuilder>
  columnByIndex: Record<number, TableColumnBuilder>
  rows: Array<Array<any>>
}

export function convertJsonToSql(records) {
  const table = convertJsonToTable(
    records as Array<Record<string, any>>,
  )
  return convertTableToPostgresqlOrMySql('table', table)
}

export function convertTableToPostgresqlOrMySql(
  name: string,
  table: Table,
) {
  const text: Array<string> = []
  text.push(`CREATE TABLE \`${name}\` (`)
  for (const name in table.columns) {
    const column = table.columns[name] as TableColumn
    if (column.type === 'json') {
      text.push(`  \`${name}\` JSON,`)
    } else if (column.type === 'boolean') {
      text.push(`  \`${name}\` BOOLEAN,`)
    } else if (column.type === 'string') {
      text.push(`  \`${name}\` VARCHAR(${column.size}),`)
    } else if (
      column.type === 'integer' ||
      column.type === 'natural_number'
    ) {
      if (column.min != null && column.max != null) {
        if (column.min >= -32768 && column.max <= 32767) {
          text.push(`  \`${name}\` SMALLINT,`)
        } else if (
          column.min >= -2147483648 &&
          column.max <= 2147483647
        ) {
          text.push(`  \`${name}\` INTEGER,`)
        } else if (
          BigInt(column.min) >= -9223372036854775808n &&
          BigInt(column.max) <= 9223372036854775807n
        ) {
          text.push(`  \`${name}\` BIGINT,`)
        }
      }
    } else if (column.type === 'float') {
      if (column.precision != null) {
        if (column.precision <= 6) {
          text.push(`  \`${name}\` REAL,`)
        } else if (column.precision <= 15) {
          text.push(`  \`${name}\` DOUBLE PRECISION,`)
        } else {
          text.push(`  \`${name}\` DECIMAL,`)
        }
      }
    }
  }
  text.push(`);`)
  text.push(``)
  text.push(`INSERT INTO \`${name}\` VALUES`)
  table.rows.forEach(row => {
    const line: Array<any> = []
    for (let i = 0; i < row.length; i++) {
      const val = row[i]
      const column = table.columnByIndex[i] as TableColumn
      if (column.type === 'string') {
        line.push(escapeSqlString(val ? (val as string) : '') as string)
      } else if (column.type === 'json') {
        line.push(escapeSqlString(JSON.stringify(val)) as string)
      } else {
        line.push(val)
      }
    }
    text.push(`(${line.join(', ')})`)
  })

  return text.join('\n')
}

// https://www.npmjs.com/package/sqlstring
export function convertJsonToTable(
  records: Array<Record<string, any>>,
) {
  const table: TableBuilder = {
    columnIndex: 0,
    columns: {},
    columnByIndex: {},
    rows: [],
  }

  records.forEach(record => {
    const flattened = sortKeys.sort(
      flattenObjectSafe(record) as Record<string, any>,
    )
    const row: Array<any> = []
    table.rows.push(row)
    for (const name in flattened) {
      if (!table.columns[name]) {
        table.columnByIndex[table.columnIndex] = table.columns[name] = {
          types: {},
          index: table.columnIndex,
        }
        table.columnIndex++
      }

      let column = table.columns[name] as TableColumnBuilder

      let value = flattened[name]
      let type = typeOf(value)
      if (type === 'number') {
        column.min = Math.min(column.min || 0, value as number)
        column.max = Math.max(column.max || 0, value as number)
        if (isInteger(value)) {
          if (value >= 0) {
            type = 'uint'
          } else {
            type = 'int'
          }
        } else {
          type = 'float'
          column.precision = Math.max(
            String(value).split('.').pop()?.length ?? 1,
            column.precision ?? 1,
          )
        }
      } else if (type === 'Array') {
        type = 'json'
      } else if (type === 'boolean') {
        type = 'boolean'
      } else if (type === 'string') {
        column.size = Math.max(
          column.size || 4,
          (value as string).length,
        )
      } else {
        throw new Error(`${type} not handled yet.`)
      }

      column.types[type] = true
      row[column.index] = value
    }
  })

  const newTable: Table = {
    columns: {},
    columnByIndex: {},
    rows: table.rows,
  }
  for (const name in table.columns) {
    const column = table.columns[name] as TableColumnBuilder
    delete table.columns[name]

    if (column.types.json) {
      newTable.columnByIndex[column.index] = newTable.columns[name] = {
        type: 'json',
      }
    } else if (column.types.string) {
      newTable.columnByIndex[column.index] = newTable.columns[name] = {
        type: 'string',
        size: roundNearestMultiple(column.size ?? 8, 8),
      }
    } else if (column.types.float) {
      newTable.columnByIndex[column.index] = newTable.columns[name] = {
        type: 'float',
        precision: column.precision,
      }
    } else if (column.types.int) {
      newTable.columnByIndex[column.index] = newTable.columns[name] = {
        type: 'integer',
        min: column.min,
        max: column.max,
      }
    } else if (column.types.uint) {
      newTable.columnByIndex[column.index] = newTable.columns[name] = {
        type: 'natural_number',
        min: column.min,
        max: column.max,
      }
    } else if (column.types.boolean) {
      newTable.columnByIndex[column.index] = newTable.columns[name] = {
        type: 'boolean',
      }
    }
  }

  return newTable
}

export function roundNearestMultiple(x: number, n: number) {
  return Math.ceil(x / n) * n
}
