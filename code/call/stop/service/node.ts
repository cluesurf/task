import { controlService } from '~/code/tool/node/service'

export type StopServiceNodeInput = { name: string }

export async function stopServiceNode(source: StopServiceNodeInput): Promise<void> {
  await controlService('stop', source.name)
}
