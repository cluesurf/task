/**
 * `task trust tls <ca-path>` — install a CA cert into the OS
 * trust store. Per-OS dispatch lives in the shared helper at
 * `~/code/tool/node/trust-store.ts`.
 *
 * Mutating the system trust store needs root; the wrapper does
 * NOT escalate via sudo. Callers prefix with `sudo` so the
 * password prompt happens in their terminal and not mid-spawn.
 */

import {
  installTrustedCa,
  type TrustInstallInput,
} from '~/code/tool/node/trust-store'

export type TrustTlsNodeInput = TrustInstallInput

async function trustTlsNode(input: TrustTlsNodeInput): Promise<void> {
  await installTrustedCa(input)
}

export default trustTlsNode
export { trustTlsNode }
