/**
 * Shared shape for `task check domain`.
 *
 * The action takes a list of fully-qualified domain names
 * and an optional provider hint, and returns a per-domain
 * availability record. Multiple provider implementations
 * live under `./<provider>/node.ts` (currently `namecheap`,
 * with future support for godaddy, cloudflare, dynadot,
 * porkbun, name.com, etc.). The dispatcher in
 * `./node.ts` picks one based on the input.
 */

import { Form } from '@cluesurf/form'

export const check_domain_availability: Form = {
  form: 'form',
  save: '~/code/form/action/check/domain',
  link: {
    input: {
      link: {
        domain: {
          link: {
            list: { like: 'string' },
          },
        },
        provider: {
          link: {
            string: { like: 'string' },
          },
        },
      },
    },
  },
}

/**
 * Provider id. Add new providers by extending this union
 * and creating `./<id>/node.ts` plus a registration in
 * `./node.ts`.
 */

export type DomainProvider =
  | 'namecheap'
  | 'godaddy'
  | 'cloudflare'
  | 'porkbun'
  | 'dynadot'
  | 'name-com'
  | 'gandi'

/**
 * Per-domain availability result. Provider-specific
 * extras (premium price, ICANN error codes, transfer
 * status) live under `details`.
 */

export type DomainCheckResult = {
  domain: string
  available: boolean
  provider: DomainProvider
  /** Raw provider error code, if the lookup failed. */
  errorCode?: string
  /** Human-readable error from the provider. */
  errorMessage?: string
  /** Provider-specific extras kept verbatim. */
  details?: Record<string, string | number | boolean>
}

/**
 * Input to every provider's `node.ts` worker. Providers
 * share this exact shape so the dispatcher can route any
 * request without reshaping.
 */

export type CheckDomainNodeInput = {
  input: {
    /** Fully qualified domain names, e.g. `acme.com`. */
    domain: string[]
    /** Provider hint; defaults to namecheap. */
    provider?: DomainProvider
  }
}

export type CheckDomainNodeOutput = {
  results: DomainCheckResult[]
}
