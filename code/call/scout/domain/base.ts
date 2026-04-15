/**
 * Form schema for `task scout domain`.
 *
 * `scout domain` is the high-level surface for finding
 * registerable domains. It generates candidate names from
 * a pattern spec (length, text wildcards, prefix/suffix,
 * extension list) and runs them through one or more
 * registrar provider checks in parallel.
 *
 * The low-level "given a flat list of domains, check
 * availability" worker lives at
 * `code/call/check/domain/node.ts`. `scout` calls into it
 * after candidate expansion.
 */

import { Form } from '@cluesurf/form'

export const scout_domain: Form = {
  form: 'form',
  save: '~/code/form/action/scout/domain',
  link: {
    input: {
      link: {
        domain: { link: { string: { like: 'string' } } },
        text: { link: { list: { like: 'string' } } },
        extension: { link: { list: { like: 'string' } } },
        provider: { link: { list: { like: 'string' } } },
        length: { link: { number: { like: 'number' } } },
      },
    },
  },
}
