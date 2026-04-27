import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToProfileCpuSamply,
  type ProfileCpuSamplyCommandInput,
} from './command'

export type ProfileCpuSamplyNodeInput = ProfileCpuSamplyCommandInput

async function profileCpuSamplyNode(
  source: ProfileCpuSamplyNodeInput,
): Promise<void> {
  const command = buildCommandToProfileCpuSamply(source)
  await spawnAndWait({
    verb: 'profile cpu',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })
}

export default profileCpuSamplyNode
export { profileCpuSamplyNode }
