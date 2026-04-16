/**
 * Dispatcher for `task check domain`.
 *
 * Picks the right per-provider worker based on
 * `input.provider`. Add a new provider by:
 *
 *   1. Implementing `./<provider>/node.ts` exporting a
 *      `checkDomain<Provider>Node({ source })` function
 *      whose input/output match `CheckDomainNode*`.
 *   2. Adding the provider's id to `DomainProvider` in
 *      `./base.ts`.
 *   3. Wiring it into the switch below.
 */

import type {
  CheckDomainNodeInput,
  CheckDomainNodeOutput,
  DomainProvider,
} from './base'

const DEFAULT_PROVIDER: DomainProvider = 'namecheap'

async function checkDomainNode({
  source,
}: {
  source: CheckDomainNodeInput
}): Promise<CheckDomainNodeOutput> {
  const provider: DomainProvider =
    source.input.provider ?? DEFAULT_PROVIDER

  switch (provider) {
    case 'namecheap': {
      const { checkDomainNamecheapNode } = await import(
        './namecheap/node'
      )
      return checkDomainNamecheapNode({ source })
    }
    case 'godaddy':
    case 'cloudflare':
    case 'porkbun':
    case 'dynadot':
    case 'name-com':
    case 'gandi':
      throw new Error(
        `check domain: provider "${provider}" is registered but not yet implemented`,
      )
    default:
      throw new Error(
        `check domain: unknown provider "${provider as string}"`,
      )
  }
}

export default checkDomainNode
export { checkDomainNode }
