import { scaleDeployment } from '~/code/tool/node/kube'

export type ScaleDeploymentNodeInput = {
  name: string
  replicas: number
  namespace?: string
  context?: string
}

async function scaleDeploymentNode(source: ScaleDeploymentNodeInput): Promise<void> {
  await scaleDeployment(source.name, source.replicas, {
    namespace: source.namespace,
    context: source.context,
  })
}

export default scaleDeploymentNode
export { scaleDeploymentNode }
