import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  buildCommandToProfileCpuClinic,
  type ProfileCpuClinicCommandInput,
} from './command'

export type ProfileCpuClinicNodeInput = ProfileCpuClinicCommandInput

async function profileCpuClinicNode(
  source: ProfileCpuClinicNodeInput,
): Promise<void> {
  const command = buildCommandToProfileCpuClinic(source)
  await spawnAndWait({
    verb: 'profile cpu',
    bin: command.bin,
    args: command.args,
    pipe: true,
  })
}

export default profileCpuClinicNode
export { profileCpuClinicNode }
