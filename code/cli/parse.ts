import { Form, FormLink, BaseHash } from '@termsurf/form'
import { Call, Bond, CallLinkMesh } from './type'
import set from 'lodash/set'
import kebabCase from 'lodash/kebabCase'
import kink from '../tool/shared/kink'

export type LineCallLink = {
  line: Array<string>
  link: Array<string>
  like?: string
  list?: boolean
  note?: string
  need?: boolean
}

export type LineCallLinkHash = Record<string, LineCallLink>

export function makeLineHash(
  link: CallLinkMesh,
  hash: LineCallLinkHash,
) {
  const make: Record<string, Bond | Array<Bond>> = {}
  for (const name in link) {
    const hashLink = hash[name]
    const bond =
      link[name]?.map(v => {
        switch (hashLink?.like) {
          case 'string':
            return v
          case 'integer':
            return parseInt(v as string, 10)
          case 'decimal':
            return parseFloat(v as string)
        }
        return v
      }) ?? []
    const val = hashLink?.list ? bond : bond[0]
    if (hashLink) {
      if (hashLink?.line) {
        set(make, hashLink.line, val)
      } else if (val != null) {
        make[name] = val
      }
    } else {
      throw new Error(name)
    }
  }
  return make
}

export function makeLineCallLinkList(
  mesh: BaseHash,
  form: Form | FormLink,
  line: Array<string> = [],
) {
  const opts: Array<LineCallLink> = []

  if ('base' in form && form.base) {
    const base = mesh[form.base]
    if (base?.form === 'form') {
      makeLineCallLinkList(mesh, base, line)
    }
  }

  if ('link' in form && form.link) {
    for (const name in form.link) {
      const link = form.link[name]
      if (!link) {
        continue
      }

      const lineName = line.concat([name])

      if (link.link) {
        opts.push(...makeLineCallLinkList(mesh, link, lineName))
      } else if (link.case) {
        if (Array.isArray(link.case)) {
          for (const _case of link.case) {
            if (
              typeof _case === 'object' &&
              'like' in _case &&
              _case.like
            ) {
              const form = mesh[_case.like]
              if (form?.form === 'form') {
                opts.push(...makeLineCallLinkList(mesh, form, lineName))
              }
            }
          }
        } else {
          for (const name in link.case) {
            const _case = link.case[name]
            if (
              typeof _case === 'object' &&
              'like' in _case &&
              _case.like
            ) {
              const form = mesh[_case.like]
              if (form?.form === 'form') {
                opts.push(...makeLineCallLinkList(mesh, form, lineName))
              }
            }
          }
        }
      } else {
        if (link.like && mesh[link.like]?.form === 'form') {
          const form = mesh[link.like]
          if (form?.form === 'form') {
            opts.push(...makeLineCallLinkList(mesh, form, lineName))
          }
        } else {
          const mark = link.name?.mark && `-${link.name.mark}`
          const name = `--${kebabCase(lineName.join('-'))}`
          const list = [mark, name].filter(x => x)
          opts.push({
            link: list as Array<string>,
            note: link.note,
            line: lineName,
            list: link.list,
            like: link.like,
            need: link.need === false ? false : true,
          })
        }
      }
    }
  } else if ('case' in form && form.case && Array.isArray(form.case)) {
    for (const _case of form.case) {
      if (typeof _case === 'object' && 'like' in _case && _case.like) {
        const form = mesh[_case.like]
        if (form?.form === 'form') {
          opts.push(...makeLineCallLinkList(mesh, form, line))
        }
      }
    }
  }

  return opts
}

export function makeLineCallLinkHash(list: Array<LineCallLink>) {
  const hash = list.reduce<LineCallLinkHash>((m, x) => {
    x.link.forEach(link => {
      m[link] = x
    })
    return m
  }, {})

  return hash
}

/**
 * Generically fetch CLI args.
 */

export function read(argv: Array<string>) {
  let i = 2
  const call: Call = {
    task: argv[i++] as string,
    link: {},
    base: [],
  }

  let haveLink = false

  while (i < argv.length) {
    const item = argv[i++] as string
    if (item.match(/^-+/)) {
      haveLink = true

      const name = item
      let value: Bond = argv[i++] as string
      if (!value) {
        value = true
      } else if (value.match(/^-+/)) {
        i--
        value = true
      }
      const link = (call.link[name] = call.link[name] || [])
      link.push(value)
    } else if (!haveLink) {
      call.base.push(item)
    } else {
      throw kink('invalid_cli_input', { actual: item })
    }
  }

  return call
}

export function makeLinkHash(
  link: CallLinkMesh,
  mesh: BaseHash,
  form: Form,
) {
  const lineCallLinkList = makeLineCallLinkList(mesh, form)
  const lineCallLinkHash = makeLineCallLinkHash(lineCallLinkList)
  const hash = makeLineHash(link, lineCallLinkHash)
  return hash
}
