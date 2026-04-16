import { controlService } from '~/code/tool/node/service'

export type RestartServiceNodeInput = { name: string }

async function restartServiceNode(source: RestartServiceNodeInput): Promise<void> {
  await controlService('restart', source.name)
}

export default restartServiceNode
export { restartServiceNode }
