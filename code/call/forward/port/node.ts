import { forwardPort } from '~/code/tool/node/kube'

export type ForwardPortNodeInput = {
  /** `<selector>:<port>` or `<selector>:<local>:<remote>`. */
  target: string
  namespace?: string
  context?: string
}

async function forwardPortNode(source: ForwardPortNodeInput): Promise<void> {
  const parts = source.target.split(':')
  if (parts.length < 2) throw new Error('target must be `selector:port`')
  const [selector, localPort, remotePort] =
    parts.length === 3
      ? [parts[0]!, parts[1]!, parts[2]!]
      : [parts[0]!, parts[1]!, parts[1]!]
  await forwardPort(selector, localPort, remotePort, {
    namespace: source.namespace,
    context: source.context,
  })
}

export default forwardPortNode
export { forwardPortNode }
