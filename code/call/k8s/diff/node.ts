// `kubectl diff` against a manifest. kubectl diff already renders
// a server-side diff; we just forward stdout. For a side-by-side
// "before/after" experience, pipe through `diff-so-fancy` or
// `delta` by setting $KUBECTL_EXTERNAL_DIFF.

import { spawnAndGetExitCode } from '~/code/tool/node/spawn'

export type K8sDiffNodeInput = {
  manifest: string
  namespace?: string
  context?: string
}

async function k8sDiffNode(
  source: K8sDiffNodeInput,
): Promise<number> {
  const args = ['diff', '-f', source.manifest]
  if (source.namespace) args.push('-n', source.namespace)
  if (source.context) args.push('--context', source.context)
  // kubectl diff returns 1 when there IS a diff — that's not an
  // error. Propagate the exit code without throwing.
  const code = await spawnAndGetExitCode({
    verb: 'k8s diff',
    bin: 'kubectl',
    args,
  })
  return code ?? 1
}

export default k8sDiffNode
export { k8sDiffNode }
