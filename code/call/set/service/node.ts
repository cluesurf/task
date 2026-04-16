import { controlService } from '~/code/tool/node/service'

export type SetServiceNodeInput = {
  name: string
  enable?: boolean
  disable?: boolean
}

async function setServiceNode(source: SetServiceNodeInput): Promise<void> {
  if (source.enable) await controlService('enable', source.name)
  if (source.disable) await controlService('disable', source.name)
}

export default setServiceNode
export { setServiceNode }
