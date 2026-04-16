/**
 * Filter DSL for `task list process --filter "<expr>"`.
 *
 *   <expr>    = <term> ( ('and' | 'or' | '&&' | '||') <term> )*
 *   <term>    = <field> <op> <value>
 *   <field>   = memory | mem | rss | cpu | pid | ppid | name | user | command | cmd
 *   <op>      = >= | <= | > | < | == | = | != | ~
 *   <value>   = <number>[<unit>] | "<string>" | '<string>' | <bare-token>
 *   <unit>    = b | kb | mb | gb | tb | %
 *
 * Examples:
 *   memory > 500mb
 *   cpu >= 50% and name ~ node
 *   user = foo or bar = root
 *
 * Logical operators are left-associative and have equal precedence
 * — the user can parenthesise with `()` when that matters. Field
 * and unit matching are case-insensitive.
 */

import type { Process } from './make'

const FIELD_ALIASES: Record<string, keyof Process> = {
  memory: 'rss',
  mem: 'rss',
  rss: 'rss',
  cpu: 'cpu',
  pid: 'pid',
  ppid: 'ppid',
  name: 'name',
  user: 'user',
  command: 'command',
  cmd: 'command',
}

const UNIT_MULTIPLIERS: Record<string, number> = {
  b: 1 / 1024, // rss is in KB; a raw byte count needs to shrink
  kb: 1,
  mb: 1024,
  gb: 1024 * 1024,
  tb: 1024 * 1024 * 1024,
}

export type ProcessPredicate = (p: Process) => boolean

/**
 * Parse a filter expression into a predicate. Throws a readable
 * CLI error when the expression doesn't parse so the user gets a
 * useful message instead of a stack trace.
 */
export function parseFilter(expression: string): ProcessPredicate {
  const tokens = tokenize(expression)
  const parser = new Parser(tokens, expression)
  const predicate = parser.parseExpression()
  parser.expectEnd()
  return predicate
}

// ---- tokenizer ----------------------------------------------------

type TokenKind =
  | 'ident'
  | 'number'
  | 'string'
  | 'op'
  | 'logical'
  | 'lparen'
  | 'rparen'

type Token = { kind: TokenKind; value: string }

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < input.length) {
    const ch = input[i]!
    if (/\s/.test(ch)) {
      i++
      continue
    }
    if (ch === '(') {
      tokens.push({ kind: 'lparen', value: '(' })
      i++
      continue
    }
    if (ch === ')') {
      tokens.push({ kind: 'rparen', value: ')' })
      i++
      continue
    }
    // Quoted string (supports ' or ").
    if (ch === '"' || ch === "'") {
      let j = i + 1
      while (j < input.length && input[j] !== ch) j++
      tokens.push({ kind: 'string', value: input.slice(i + 1, j) })
      i = j + 1
      continue
    }
    // Comparison / logical operators — try the longest match first.
    const opMatch = input.slice(i).match(/^(>=|<=|==|!=|>|<|=|~)/)
    if (opMatch) {
      tokens.push({ kind: 'op', value: opMatch[1]! })
      i += opMatch[1]!.length
      continue
    }
    const logMatch = input.slice(i).match(/^(&&|\|\|)/)
    if (logMatch) {
      tokens.push({
        kind: 'logical',
        value: logMatch[1] === '&&' ? 'and' : 'or',
      })
      i += logMatch[1]!.length
      continue
    }
    // Number (optionally with unit suffix).
    const numMatch = input
      .slice(i)
      .match(/^(\d+(?:\.\d+)?)([a-zA-Z%]+)?/)
    if (numMatch) {
      tokens.push({
        kind: 'number',
        value:
          numMatch[1]! + (numMatch[2] ? numMatch[2].toLowerCase() : ''),
      })
      i += numMatch[0].length
      continue
    }
    // Bare identifier — a field name, `and` / `or`, or an
    // unquoted string value.
    const identMatch = input
      .slice(i)
      .match(/^[A-Za-z_][A-Za-z0-9_.\-/]*/)
    if (identMatch) {
      const word = identMatch[0]
      if (/^(and|or)$/i.test(word)) {
        tokens.push({ kind: 'logical', value: word.toLowerCase() })
      } else {
        tokens.push({ kind: 'ident', value: word })
      }
      i += word.length
      continue
    }
    throw new Error(
      `filter: unexpected character "${ch}" at position ${i} of \`${input}\``,
    )
  }
  return tokens
}

// ---- parser -------------------------------------------------------

class Parser {
  private index = 0
  constructor(
    private readonly tokens: Token[],
    private readonly source: string,
  ) {}

  parseExpression(): ProcessPredicate {
    let predicate = this.parseTerm()
    while (this.peek()?.kind === 'logical') {
      const op = this.consume().value
      const right = this.parseTerm()
      const left = predicate
      predicate =
        op === 'and'
          ? p => left(p) && right(p)
          : p => left(p) || right(p)
    }
    return predicate
  }

  private parseTerm(): ProcessPredicate {
    if (this.peek()?.kind === 'lparen') {
      this.consume()
      const inner = this.parseExpression()
      this.expect('rparen', ')')
      return inner
    }
    const fieldToken = this.expect('ident', 'field name')
    const field = FIELD_ALIASES[fieldToken.value.toLowerCase()]
    if (!field) {
      throw new Error(
        `filter: unknown field "${fieldToken.value}" in \`${this.source}\`. ` +
          `Try one of: ${Object.keys(FIELD_ALIASES).join(', ')}.`,
      )
    }
    const op = this.expect('op', 'comparison operator').value
    const valueToken = this.consume()
    return buildComparator({
      field,
      op,
      value: valueToken,
      source: this.source,
    })
  }

  expectEnd(): void {
    if (this.index !== this.tokens.length) {
      const rest = this.tokens
        .slice(this.index)
        .map(t => t.value)
        .join(' ')
      throw new Error(
        `filter: trailing tokens "${rest}" in \`${this.source}\``,
      )
    }
  }

  private peek(): Token | undefined {
    return this.tokens[this.index]
  }

  private consume(): Token {
    const token = this.tokens[this.index]
    if (!token) {
      throw new Error(
        `filter: unexpected end of expression in \`${this.source}\``,
      )
    }
    this.index++
    return token
  }

  private expect(kind: TokenKind, label: string): Token {
    const token = this.consume()
    if (token.kind !== kind) {
      throw new Error(
        `filter: expected ${label}, got "${token.value}" in \`${this.source}\``,
      )
    }
    return token
  }
}

// ---- comparator --------------------------------------------------

function buildComparator(input: {
  field: keyof Process
  op: string
  value: Token
  source: string
}): ProcessPredicate {
  const { field, op, value, source } = input

  if (value.kind === 'number') {
    const numeric = parseNumeric(value.value, field)
    return p =>
      compareNumeric(Number(p[field] as unknown as number), op, numeric)
  }

  // Strings get compared as strings regardless of op, except that
  // `~` means "includes" rather than "equals".
  const literal = String(value.value)
  return p => compareString(String(p[field]), op, literal, source)
}

/**
 * Accept `500mb`, `1.5gb`, `50%`, bare `3000`. Percentages apply
 * to fields already expressed as percent (cpu). Byte-unit suffixes
 * convert to KB, which matches the `rss` storage. Bare numbers
 * are passed through untouched.
 */
function parseNumeric(raw: string, field: keyof Process): number {
  const match = raw.match(/^([0-9.]+)([a-z%]*)$/)
  if (!match) {
    throw new Error(`filter: cannot parse number "${raw}"`)
  }
  const n = Number(match[1])
  const unit = match[2]
  if (!unit) return n
  if (unit === '%') return n
  const mult = UNIT_MULTIPLIERS[unit]
  if (mult === undefined) {
    throw new Error(
      `filter: unknown unit "${unit}" (use kb, mb, gb, tb, %)`,
    )
  }
  // Memory units (kb/mb/gb/tb) are only meaningful for rss.
  if (field !== 'rss') {
    throw new Error(
      `filter: unit "${unit}" doesn't apply to field "${field}" — try a plain number`,
    )
  }
  return n * mult
}

function compareNumeric(a: number, op: string, b: number): boolean {
  switch (op) {
    case '>':
      return a > b
    case '>=':
      return a >= b
    case '<':
      return a < b
    case '<=':
      return a <= b
    case '=':
    case '==':
      return a === b
    case '!=':
      return a !== b
    case '~':
      return String(a).includes(String(b))
  }
  throw new Error(`filter: operator "${op}" not supported for numbers`)
}

function compareString(
  a: string,
  op: string,
  b: string,
  source: string,
): boolean {
  switch (op) {
    case '=':
    case '==':
      return a === b
    case '!=':
      return a !== b
    case '~':
      return a.toLowerCase().includes(b.toLowerCase())
  }
  throw new Error(
    `filter: operator "${op}" not supported for strings in \`${source}\``,
  )
}
