import { controlService } from '~/code/tool/node/service'

export type RunServiceNodeInput = { name: string }

export async function runServiceNode(source: RunServiceNodeInput): Promise<void> {
  await controlService('start', source.name)
}
