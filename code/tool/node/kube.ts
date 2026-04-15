// Kubernetes backends. Shared by the generic verbs (logs / forward
// / scale / diff / inspect / list / measure) when they dispatch to
// a k8s-flavored noun.

import { spawn } from 'node:child_process'
import { exec } from '~/code/tool/node/process'

export type KubeFlags = { namespace?: string; context?: string }

function flags(f: KubeFlags): string[] {
  const out: string[] = []
  if (f.namespace) out.push('-n', f.namespace)
  if (f.context) out.push('--context', f.context)
  return out
}

export async function logsPod(
  selector: string,
  opts: KubeFlags & { follow?: boolean; tail?: number } = {},
): Promise<void> {
  const hasStern = await which('stern')
  const tail = String(opts.tail ?? 100)
  const follow = opts.follow !== false
  const f = flags(opts)
  let argv: string[]
  if (hasStern) {
    argv = ['stern', selector, '--tail', tail, ...f]
    if (!follow) argv.push('--tail-only')
  } else {
    const isLabel = selector.includes('=')
    argv = ['kubectl', 'logs', ...f, '--tail', tail]
    if (follow) argv.push('-f')
    if (isLabel) argv.push('-l', selector, '--all-containers=true')
    else argv.push(selector)
  }
  await streamSpawn(argv[0]!, argv.slice(1))
}

export async function forwardPort(
  selector: string,
  localPort: string,
  remotePort: string,
  opts: KubeFlags = {},
): Promise<void> {
  const commonFlags = flags(opts)
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
    const code = await runForward(pod, localPort, remotePort, commonFlags)
    console.error(`port-forward exited (${code}); restarting in 2s...`)
    await sleep(2000)
  }
}

export async function scaleDeployment(
  name: string,
  replicas: number,
  opts: KubeFlags = {},
): Promise<void> {
  await exec([
    'kubectl',
    'scale',
    `deployment/${name}`,
    `--replicas=${replicas}`,
    ...flags(opts),
  ])
}

export async function diffManifest(
  manifest: string,
  opts: KubeFlags = {},
): Promise<number> {
  const argv = ['kubectl', 'diff', '-f', manifest, ...flags(opts)]
  return streamSpawnExitCode(argv[0]!, argv.slice(1))
}

export async function inspectPod(
  name: string,
  opts: KubeFlags = {},
): Promise<string> {
  const { stdout } = await exec(['kubectl', 'describe', 'pod', name, ...flags(opts)])
  return stdout
}

export async function inspectNode(
  name: string,
  opts: KubeFlags = {},
): Promise<string> {
  const { stdout } = await exec(['kubectl', 'describe', 'node', name, ...flags(opts)])
  return stdout
}

export async function listPods(opts: KubeFlags = {}): Promise<string> {
  const { stdout } = await exec(['kubectl', 'get', 'pods', ...flags(opts)])
  return stdout
}

// ─── internals ────────────────────────────────────────────────────

async function resolvePod(
  selector: string,
  extraFlags: string[],
): Promise<string | null> {
  const hasLabel = selector.includes('=')
  const argv = [
    'kubectl',
    'get',
    'pods',
    ...extraFlags,
    '-o',
    'jsonpath={.items[0].metadata.name}',
  ]
  if (hasLabel) argv.splice(3, 0, '-l', selector)
  try {
    const { stdout } = await exec(argv)
    const name = stdout.trim()
    if (name) return name
    if (!hasLabel) return selector
    return null
  } catch {
    return null
  }
}

function runForward(
  pod: string,
  localPort: string,
  remotePort: string,
  extraFlags: string[],
): Promise<number> {
  return streamSpawnExitCode('kubectl', [
    'port-forward',
    pod,
    `${localPort}:${remotePort}`,
    ...extraFlags,
  ])
}

function streamSpawn(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`)),
    )
  })
}

function streamSpawnExitCode(cmd: string, args: string[]): Promise<number> {
  return new Promise(resolve => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('close', code => resolve(code ?? 1))
    child.on('error', () => resolve(1))
  })
}

function which(bin: string): Promise<boolean> {
  return new Promise(resolve => {
    const child = spawn('which', [bin], { stdio: 'ignore' })
    child.on('close', code => resolve(code === 0))
    child.on('error', () => resolve(false))
  })
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
