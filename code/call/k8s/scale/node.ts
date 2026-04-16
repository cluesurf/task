import { exec } from '~/code/tool/node/process'

export type K8sScaleNodeInput = {
  deployment: string
  replicas: number
  namespace?: string
  context?: string
}

async function k8sScaleNode(source: K8sScaleNodeInput): Promise<void> {
  const argv = [
    'kubectl',
    'scale',
    `deployment/${source.deployment}`,
    `--replicas=${source.replicas}`,
  ]
  if (source.namespace) argv.push('-n', source.namespace)
  if (source.context) argv.push('--context', source.context)
  await exec(argv)
}

export default k8sScaleNode
export { k8sScaleNode }
