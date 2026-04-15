import { diffManifest } from '~/code/tool/node/kube'

export type DiffManifestNodeInput = {
  path: string
  namespace?: string
  context?: string
}

export async function diffManifestNode(source: DiffManifestNodeInput): Promise<number> {
  return diffManifest(source.path, {
    namespace: source.namespace,
    context: source.context,
  })
}
