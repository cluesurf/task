import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToProfileCpuZerox,
  type ProfileCpuZeroxCommandInput,
} from './command'

export type ProfileCpuZeroxNodeInput = ProfileCpuZeroxCommandInput

async function profileCpuZeroxNode(
  source: ProfileCpuZeroxNodeInput,
): Promise<void> {
  const command = buildCommandToProfileCpuZerox(source)
  await spawnAndWait({
    verb: 'profile cpu',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })
}

export default profileCpuZeroxNode
export { profileCpuZeroxNode }
