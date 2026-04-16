/**
 * Shared helpers for turning `@cluesurf/form` schemas into yargs
 * option definitions.
 *
 * Walks a `Form` tree and emits one CLI option per leaf link. The
 * long option is the kebab-cased dotted path (`input.format` →
 * `--input-format`). The short option is `link.name.mark` if set.
 *
 * The parsed argv is then unflattened back into the nested input
 * shape the node handler expects.
 */

import type { BaseHash, Form, FormLink } from '@cluesurf/form'
import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'
import set from 'lodash/set'
import {
  registerHelp,
  type HelpExample,
} from '~/code/tool/node/log/registry'
import { CliError } from '~/code/tool/node/log/error'

export type { HelpExample }

export type CliOption = {
  /** Full dotted path into the input shape (e.g. `input.format`). */
  path: string[]
  /** Kebab-cased long option. */
  long: string
  /** One-letter short option, if `link.name.mark` is set. */
  short?: string
  /** Primitive type of the value. */
  like?: string
  /** Whether the option accepts multiple values. */
  list?: boolean
  /** Whether the option is required. */
  need: boolean
  /** Description for help output. */
  note?: string
}

/**
 * Walk a form and collect one CliOption per leaf. Leaves are
 * links with a primitive `like` and no nested `link`/`case`.
 * Composed / case forms recurse into their members.
 */

export function collectCliOptions(
  mesh: BaseHash,
  form: Form | FormLink,
  prefix: string[] = [],
  /**
   * When false, every leaf collected from this subtree is forced
   * to optional regardless of its own `need`. Lets a parent
   * marked `need: false` (e.g. `cover: { need: false, link: {...} }`)
   * propagate down to its `--cover-file-path` leaf so the CLI
   * doesn't insist on it.
   */
  ancestorNeed: boolean = true,
): CliOption[] {
  const out: CliOption[] = []

  if ('base' in form && form.base) {
    const base = mesh[form.base]
    if (base && base.form === 'form') {
      out.push(...collectCliOptions(mesh, base, prefix, ancestorNeed))
    }
  }

  if ('link' in form && form.link) {
    for (const name in form.link) {
      const link = form.link[name]
      if (!link) continue
      const path = [...prefix, name]
      const subNeed = ancestorNeed && link.need !== false

      if (link.link) {
        out.push(...collectCliOptions(mesh, link, path, subNeed))
        continue
      }

      if (link.case) {
        const cases = Array.isArray(link.case)
          ? link.case
          : Object.values(link.case)
        for (const c of cases) {
          if (typeof c === 'object' && 'like' in c && c.like) {
            const sub = mesh[c.like]
            if (sub && sub.form === 'form') {
              out.push(...collectCliOptions(mesh, sub, path, subNeed))
            }
          }
        }
        continue
      }

      if (link.like && mesh[link.like]?.form === 'form') {
        const sub = mesh[link.like]
        if (sub && sub.form === 'form') {
          out.push(...collectCliOptions(mesh, sub, path, subNeed))
          continue
        }
      }

      out.push({
        path,
        long: kebabCase(path.join('-')),
        short: link.name?.mark,
        like: link.like,
        list: link.list === true,
        need: subNeed,
        note: link.note,
      })
    }
  } else if ('case' in form && form.case && Array.isArray(form.case)) {
    for (const c of form.case) {
      if (typeof c === 'object' && 'like' in c && c.like) {
        const sub = mesh[c.like]
        if (sub && sub.form === 'form') {
          out.push(...collectCliOptions(mesh, sub, prefix, ancestorNeed))
        }
      }
    }
  }

  // Deduplicate by long name (case forms can produce overlaps).
  const seen = new Set<string>()
  return out.filter(o => {
    if (seen.has(o.long)) return false
    seen.add(o.long)
    return true
  })
}

/**
 * Configure a yargs builder with every option emitted from the
 * form. Returns the yargs instance so callers can chain further.
 */

export function applyFormOptions<Y extends { option: Function }>(
  y: Y,
  options: CliOption[],
): Y {
  // Cast once; yargs's `option` must stay bound to the yargs
  // instance — extracting the method into a variable drops `this`
  // and yargs breaks with a cryptic `kTrackManuallySetKeys` error
  // on the first call.
  const withOption = y as unknown as {
    option: (name: string, config: unknown) => Y
  }

  for (const opt of options) {
    const spec: Record<string, unknown> = {
      type: mapLikeToYargsType(opt.like),
      demandOption: opt.need,
    }
    if (opt.short) spec.alias = opt.short
    if (opt.list) spec.array = true
    if (opt.note) spec.describe = opt.note
    withOption.option(opt.long, spec)
  }
  return y
}

function mapLikeToYargsType(like?: string): string {
  switch (like) {
    case 'integer':
    case 'decimal':
      return 'number'
    case 'boolean':
      return 'boolean'
    default:
      return 'string'
  }
}

/**
 * Build a yargs CommandModule for a single action-thing. Caller
 * imports the pre-computed option list from
 * `code/form/action/<verb>/<thing>/console/options` (generated by
 * `pnpm make:type`). No `~/code/base` import.
 */
export type BuildActionCommandInput = {
  command: string
  describe: string
  /** Full command path used for the help registry. Defaults to
   *  the leaf of `command`. Pass `['extract', 'archive']` (or
   *  similar) when the leaf alone collides with another verb's
   *  subcommand of the same name. */
  path?: string[]
  /** Optional examples printed under the OPTIONS block in the
   *  help screen. Each entry is `{ comment?, command }` — the
   *  comment renders dim, the command renders cyan. */
  examples?: HelpExample[]
  /** Optional. When omitted the command prints a "not yet routed"
   *  message — useful for scaffolding while the node handler
   *  doesn't exist at this exact path yet. */
  loadHandler?: () => Promise<
    { default: (input: unknown) => Promise<unknown> } | Record<string, unknown>
  >
  options: CliOption[]
}

export function buildActionCommand(
  input: BuildActionCommandInput,
): import('yargs').CommandModule {
  const { options } = input

  // Detect whether this command operates on `input.file.path` and
  // `output.file.path`. When both exist, the command also accepts
  // a single positional path: `task pad song.mp3 --to 3:00.000`.
  // The positional fills BOTH input + output, so the file is
  // edited in place. `-i` and `-o` still work and override.
  const hasInputPath = options.some(
    o => arraysEqual(o.path, ['input', 'file', 'path']),
  )
  const outputOption = options.find(
    o => arraysEqual(o.path, ['output', 'file', 'path']),
  )
  const hasOutputPath = !!outputOption
  const outputRequired = outputOption?.need === true
  // Positional `file` is accepted when the schema has an input path.
  // If the schema also has an output path, the positional fills both
  // (in-place edit). Read-only verbs like `inspect file` get the
  // positional too; output just stays empty.
  const acceptsPositional = hasInputPath
  const yargsCommand = acceptsPositional
    ? `${input.command} [file]`
    : input.command

  // Register this command in the custom-help registry so the
  // global `--help` middleware can render it without going
  // through yargs's stock formatter. Synchronous — the registry
  // itself is a tiny in-memory map with no side-effects of its
  // own. This file already pulls yargs, so it's node-only too.
  const leaf = input.command.split(' ')[0] ?? input.command
  const fullPath = input.path ?? [leaf]
  registerHelp({
    command: `task ${fullPath.join(' ')}`,
    describe: input.describe,
    options: options.map(o => ({
      long: o.long,
      short: o.short,
      required: o.need,
      describe: o.note,
    })),
    examples: input.examples,
  })

  return {
    command: yargsCommand,
    describe: input.describe,
    builder: y => {
      // When a positional `file` is allowed, drop yargs's required
      // check from the matching option specs so the user can pass
      // EITHER the positional OR explicit -i / -o. We enforce
      // exactly-one-of in the handler below.
      const tunedOptions = acceptsPositional
        ? options.map(o =>
            arraysEqual(o.path, ['input', 'file', 'path'])
              ? { ...o, need: false }
              : o,
          )
        : options
      const next = applyFormOptions(y, tunedOptions)
      if (acceptsPositional) {
        ;(next as unknown as {
          positional: (name: string, opts: unknown) => unknown
        }).positional('file', {
          describe:
            'Single path used for both input and output (in-place edit). ' +
            'Mutually exclusive with -i / -o.',
          type: 'string',
        })
      }
      return next
    },
    handler: async argv => {
      const verbPath =
        input.path ?? [input.command.split(' ')[0] ?? input.command]
      const fullLabel = `task ${verbPath.join(' ')}`
      const parentLabel = `task ${verbPath.slice(0, -1).join(' ')}`.trim()
      const helpHint = parentLabel
        ? `run \`${parentLabel} --help\` to see available commands`
        : `run \`task --help\` to see available commands`
      if (!input.loadHandler) {
        throw new CliError(
          `no handler found for command '${verbPath[verbPath.length - 1]}'`,
          { hint: helpHint },
        )
      }
      const mod = await input.loadHandler()
      const fn =
        'default' in mod && typeof mod.default === 'function'
          ? (mod.default as (x: unknown) => Promise<unknown>)
          : findFirstFunction(mod as Record<string, unknown>)
      if (!fn) {
        throw new CliError(
          `no handler found for command '${verbPath[verbPath.length - 1]}'`,
          { hint: helpHint },
        )
      }
      const unpacked = unpackFormArgv(
        argv as Record<string, unknown>,
        options,
      )

      // Positional `<file>` fills INPUT. If the verb has an
      // output slot and the user didn't pass `-o`, the same path
      // ALSO fills output (in-place edit).
      //
      // Positional + `-i` is rejected — two sources fighting for
      // the input slot. Positional + `-o` is fine:
      //
      //   task compress etch.ttf -o dist/etch.woff2
      //     → positional fills input, -o fills output.
      //
      //   task set metadata -i in.mp3 -o in.mp3 --title "..."
      //     → no positional; -i / -o both explicit.
      if (acceptsPositional) {
        const positional = (argv as Record<string, unknown>).file
        const hasPositional =
          typeof positional === 'string' && positional.length > 0
        const explicitInput =
          readPath(unpacked, ['input', 'file', 'path']) !== undefined

        if (hasPositional && explicitInput) {
          throw new CliError(
            'pass either a positional `<file>` OR `-i`, not both',
            { hint: helpHint },
          )
        }

        if (hasPositional) {
          ensurePathAt(unpacked, ['input', 'file', 'path'], positional as string)
          if (hasOutputPath) {
            ensurePathAt(unpacked, ['output', 'file', 'path'], positional as string)
          }
        }

        const hasInput =
          readPath(unpacked, ['input', 'file', 'path']) !== undefined
        if (!hasInput) {
          throw new CliError(
            `pass either \`task ${input.command.split(' ')[0]} <file>\` or \`-i <file>\``,
            { hint: helpHint },
          )
        }
        if (hasOutputPath && outputRequired) {
          const hasOutput =
            readPath(unpacked, ['output', 'file', 'path']) !== undefined
          if (!hasOutput) {
            throw new CliError(
              `pass either \`task ${input.command.split(' ')[0]} <file>\` for an in-place edit, or \`-o <file>\``,
              { hint: helpHint },
            )
          }
        }
      }

      // Use the parent verb (`inspect`) for the spinner label,
      // not the leaf (`file`). Falls back to the leaf when there's
      // no explicit path.
      const verb = input.path?.[0] ?? input.command.split(' ')[0] ?? input.command
      const { runAction } = await import('~/code/tool/node/log')

      // The handler defaults to 'internal' when handle is missing,
      // so CLI doesn't need to inject it.
      await runAction({
        action: verb,
        input: unpacked,
        run: () => fn(unpacked),
      })
    },
  }
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

function readPath(
  obj: Record<string, unknown>,
  path: string[],
): unknown {
  let cursor: unknown = obj
  for (const key of path) {
    if (cursor == null || typeof cursor !== 'object') return undefined
    cursor = (cursor as Record<string, unknown>)[key]
  }
  return cursor
}

/** Set `obj[path] = value` only when nothing already lives there. */
function ensurePathAt(
  obj: Record<string, unknown>,
  path: string[],
  value: string,
): void {
  let cursor: Record<string, unknown> = obj
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]!
    const next = cursor[key]
    if (typeof next === 'object' && next !== null) {
      cursor = next as Record<string, unknown>
    } else {
      const fresh: Record<string, unknown> = {}
      cursor[key] = fresh
      cursor = fresh
    }
  }
  const leaf = path[path.length - 1]!
  if (cursor[leaf] === undefined || cursor[leaf] === '') {
    cursor[leaf] = value
  }
}

function findFirstFunction(
  mod: Record<string, unknown>,
): ((x: unknown) => Promise<unknown>) | null {
  for (const key of Object.keys(mod)) {
    const v = mod[key]
    if (typeof v === 'function') {
      return v as (x: unknown) => Promise<unknown>
    }
  }
  return null
}

/**
 * Unflatten a yargs argv back into the nested input shape.
 * Uses each CliOption's `path` to place the value.
 */

export function unpackFormArgv(
  argv: Record<string, unknown>,
  options: CliOption[],
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const opt of options) {
    const camel = camelCase(opt.long)
    const value = argv[camel]
    if (value === undefined) continue
    set(out, opt.path, value)
  }
  return out
}
