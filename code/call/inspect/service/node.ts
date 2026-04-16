// Service inspection. Wraps the cross-platform helpers in
// code/tool/node/service.ts.

import {
  inspectService,
  listServices,
  serviceLogs,
} from '~/code/tool/node/service'

export type InspectServiceNodeInput = {
  /** Service name. Omit to list. */
  name?: string
  /** Only list failed services (Linux only — macOS has no
   * equivalent; returned stdout is empty). */
  failed?: boolean
  /** Tail logs instead of status for the named service. */
  logs?: boolean
}

async function inspectServiceNode(
  source: InspectServiceNodeInput,
): Promise<string> {
  if (!source.name) return listServices({ failed: source.failed })
  if (source.logs) return serviceLogs(source.name)
  return inspectService(source.name)
}

export default inspectServiceNode
export { inspectServiceNode }
