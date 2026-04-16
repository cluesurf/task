// Auto-discover a pod from a label selector, forward a port, and
// restart the forward when the pod dies or the connection drops.

import { spawnAndGetExitCode } from '~/code/tool/node/spawn'
import { exec } from '~/code/tool/node/process'

export type K8sPortForwardNodeInput = {
  /** `<selector>:<port>` or `<selector>:<localPort>:<remotePort>`. */
  target: string
  namespace?: string
  context?: string
}

async function k8sPortForwardNode(
  source: K8sPortForwardNodeInput,
): Promise<void> {
  const parts = source.target.split(':')
  if (parts.length < 2)
    throw new Error('target must be `selector:port`')
  const selector = parts[0]!
  const [localPort, remotePort] =
    parts.length === 3
      ? [parts[1]!, parts[2]!]
      : [parts[1]!, parts[1]!]

  const commonFlags: string[] = []
  if (source.namespace) commonFlags.push('-n', source.namespace)
  if (source.context) commonFlags.push('--context', source.context)

  let attempt = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    attempt++
    const pod = await resolvePod({ selector, flags: commonFlags })
    if (!pod) {
      console.error(`no pod matched ${selector}; retrying in 5s...`)
      await sleep(5000)
      continue
    }
    console.error(
      `→ forwarding ${localPort}→${remotePort} on ${pod} (attempt ${attempt})`,
    )
    const exit = await runForward({
      pod,
      localPort,
      remotePort,
      flags: commonFlags,
    })
    console.error(
      `port-forward exited (code ${exit}); restarting in 2s...`,
    )
    await sleep(2000)
  }
}

async function resolvePod(input: {
  selector: string
  flags: string[]
}): Promise<string | null> {
  // If selector has `=` treat as label; else as a pod name/regex.
  const hasLabel = input.selector.includes('=')
  const argv = [
    'kubectl',
    'get',
    'pods',
    ...input.flags,
    '-o',
    'jsonpath={.items[0].metadata.name}',
  ]
  if (hasLabel) argv.splice(3, 0, '-l', input.selector)
  try {
    const { stdout } = await exec(argv)
    const name = stdout.trim()
    if (name) return name
    if (!hasLabel && input.selector) return input.selector
    return null
  } catch {
    return null
  }
}

async function runForward(input: {
  pod: string
  localPort: string
  remotePort: string
  flags: string[]
}): Promise<number> {
  const code = await spawnAndGetExitCode({
    verb: 'k8s port-forward',
    bin: 'kubectl',
    args: [
      'port-forward',
      input.pod,
      `${input.localPort}:${input.remotePort}`,
      ...input.flags,
    ],
  })
  return code ?? 1
}

const sleep = (ms: number) =>
  new Promise<void>(r => setTimeout(r, ms))

export default k8sPortForwardNode
export { k8sPortForwardNode }
