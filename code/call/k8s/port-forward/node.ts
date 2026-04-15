// Auto-discover a pod from a label selector, forward a port, and
// restart the forward when the pod dies or the connection drops.

import { spawn } from 'node:child_process'
import { exec } from '~/code/tool/node/process'

export type K8sPortForwardNodeInput = {
  /** `<selector>:<port>` or `<selector>:<localPort>:<remotePort>`. */
  target: string
  namespace?: string
  context?: string
}

export async function k8sPortForwardNode(
  source: K8sPortForwardNodeInput,
): Promise<void> {
  const parts = source.target.split(':')
  if (parts.length < 2) throw new Error('target must be `selector:port`')
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
    const pod = await resolvePod(selector, commonFlags)
    if (!pod) {
      console.error(`no pod matched ${selector}; retrying in 5s...`)
      await sleep(5000)
      continue
    }
    console.error(`→ forwarding ${localPort}→${remotePort} on ${pod} (attempt ${attempt})`)
    const exit = await runForward(pod, localPort, remotePort, commonFlags)
    console.error(`port-forward exited (code ${exit}); restarting in 2s...`)
    await sleep(2000)
  }
}

async function resolvePod(
  selector: string,
  flags: string[],
): Promise<string | null> {
  // If selector has `=` treat as label; else as a pod name/regex.
  const hasLabel = selector.includes('=')
  const argv = [
    'kubectl',
    'get',
    'pods',
    ...flags,
    '-o',
    'jsonpath={.items[0].metadata.name}',
  ]
  if (hasLabel) argv.splice(3, 0, '-l', selector)
  try {
    const { stdout } = await exec(argv)
    const name = stdout.trim()
    if (name) return name
    if (!hasLabel && selector) return selector  // treat as literal pod name
    return null
  } catch {
    return null
  }
}

function runForward(
  pod: string,
  localPort: string,
  remotePort: string,
  flags: string[],
): Promise<number> {
  return new Promise(resolve => {
    const argv = ['port-forward', pod, `${localPort}:${remotePort}`, ...flags]
    const child = spawn('kubectl', argv, { stdio: 'inherit' })
    child.on('close', code => resolve(code ?? 1))
    child.on('error', () => resolve(1))
  })
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
