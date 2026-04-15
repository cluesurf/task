// DigitalOcean Kubernetes (DOKS) helpers — thin wrappers over
// `doctl kubernetes`. For pod-level stuff use `task k8s ...`
// against the kubeconfig this produces.

import { exec } from '~/code/tool/node/process'

export async function listClusters(): Promise<string> {
  const { stdout } = await exec([
    'doctl',
    'kubernetes',
    'cluster',
    'list',
    '-o',
    'json',
  ])
  return stdout
}

/** Save kubeconfig for a cluster. After this, `kubectl`
 * / `task k8s ...` will target it. */
export async function saveClusterConfig(name: string): Promise<string> {
  const { stdout } = await exec([
    'doctl',
    'kubernetes',
    'cluster',
    'kubeconfig',
    'save',
    name,
  ])
  return stdout
}

export async function inspectCluster(name: string): Promise<string> {
  const { stdout } = await exec([
    'doctl',
    'kubernetes',
    'cluster',
    'get',
    name,
    '-o',
    'json',
  ])
  return stdout
}
