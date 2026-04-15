// `kubectl diff` against a manifest. kubectl diff already renders
// a server-side diff; we just forward stdout. For a side-by-side
// "before/after" experience, pipe through `diff-so-fancy` or
// `delta` by setting $KUBECTL_EXTERNAL_DIFF.

import { spawn } from 'node:child_process'

export type K8sDiffNodeInput = {
  manifest: string
  namespace?: string
  context?: string
}

export async function k8sDiffNode(source: K8sDiffNodeInput): Promise<number> {
  const argv = ['kubectl', 'diff', '-f', source.manifest]
  if (source.namespace) argv.push('-n', source.namespace)
  if (source.context) argv.push('--context', source.context)
  return new Promise(resolve => {
    const child = spawn(argv[0]!, argv.slice(1), { stdio: 'inherit' })
    // kubectl diff returns 1 when there IS a diff — that's not an
    // error. Propagate the exit code without throwing.
    child.on('close', code => resolve(code ?? 1))
    child.on('error', () => resolve(1))
  })
}
