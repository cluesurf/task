/**
 * `task untrust tls <sha1>` — remove a CA cert from the OS
 * trust store by SHA-1 fingerprint. Per-OS dispatch lives in
 * the shared trust-store helper.
 */

import {
  uninstallTrustedCa,
  type TrustUninstallInput,
} from '~/code/tool/node/trust-store'

export type UntrustTlsNodeInput = TrustUninstallInput

async function untrustTlsNode(input: UntrustTlsNodeInput): Promise<void> {
  await uninstallTrustedCa(input)
}

export default untrustTlsNode
export { untrustTlsNode }
