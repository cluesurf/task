import { controlService } from '~/code/tool/node/service'

export type RunServiceNodeInput = { name: string }

async function runServiceNode(source: RunServiceNodeInput): Promise<void> {
  await controlService('start', source.name)
}

export default runServiceNode
export { runServiceNode }
