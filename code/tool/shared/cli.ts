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
): CliOption[] {
  const out: CliOption[] = []

  if ('base' in form && form.base) {
    const base = mesh[form.base]
    if (base && base.form === 'form') {
      out.push(...collectCliOptions(mesh, base, prefix))
    }
  }

  if ('link' in form && form.link) {
    for (const name in form.link) {
      const link = form.link[name]
      if (!link) continue
      const path = [...prefix, name]

      if (link.link) {
        out.push(...collectCliOptions(mesh, link, path))
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
              out.push(...collectCliOptions(mesh, sub, path))
            }
          }
        }
        continue
      }

      if (link.like && mesh[link.like]?.form === 'form') {
        const sub = mesh[link.like]
        if (sub && sub.form === 'form') {
          out.push(...collectCliOptions(mesh, sub, path))
          continue
        }
      }

      out.push({
        path,
        long: kebabCase(path.join('-')),
        short: link.name?.mark,
        like: link.like,
        list: link.list === true,
        need: link.need !== false,
        note: link.note,
      })
    }
  } else if ('case' in form && form.case && Array.isArray(form.case)) {
    for (const c of form.case) {
      if (typeof c === 'object' && 'like' in c && c.like) {
        const sub = mesh[c.like]
        if (sub && sub.form === 'form') {
          out.push(...collectCliOptions(mesh, sub, prefix))
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
  const addOption = (y as unknown as {
    option: (name: string, config: unknown) => Y
  }).option

  for (const opt of options) {
    const spec: Record<string, unknown> = {
      type: mapLikeToYargsType(opt.like),
      demandOption: opt.need,
    }
    if (opt.short) spec.alias = opt.short
    if (opt.list) spec.array = true
    if (opt.note) spec.describe = opt.note
    addOption(opt.long, spec)
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
 * Build a yargs CommandModule for a single action-thing, given
 * its form schema name and a lazy importer for its Node handler.
 * Reduces each `<thing>/console.ts` to one tiny export.
 */

export function buildActionCommand(input: {
  command: string
  describe: string
  mesh: Record<string, unknown>
  formName: string
  /** Optional. When omitted the command prints a "not yet routed"
   *  message — useful for scaffolding while the node handler
   *  doesn't exist at this exact path yet. */
  loadHandler?: () => Promise<
    { default: (input: unknown) => Promise<unknown> } | Record<string, unknown>
  >
}): import('yargs').CommandModule {
  const form = input.mesh[input.formName]
  const options = form
    ? collectCliOptions(input.mesh as never, form as never)
    : []

  return {
    command: input.command,
    describe: input.describe,
    builder: y => applyFormOptions(y, options),
    handler: async argv => {
      if (!input.loadHandler) {
        throw new Error(
          `'${input.command}' is not yet routed to a Node handler. ` +
            `Add a loadHandler to its console.ts.`,
        )
      }
      const mod = await input.loadHandler()
      const fn =
        'default' in mod && typeof mod.default === 'function'
          ? (mod.default as (x: unknown) => Promise<unknown>)
          : findFirstFunction(mod as Record<string, unknown>)
      if (!fn) {
        throw new Error(
          `No handler function exported by module for command '${input.command}'`,
        )
      }
      const unpacked = unpackFormArgv(
        argv as Record<string, unknown>,
        options,
      )
      await fn(unpacked)
    },
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
