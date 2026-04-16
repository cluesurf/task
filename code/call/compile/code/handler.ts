import kink from '~/code/tool/shared/kink'
import { spawnAndWait, spawnAndCapture } from '~/code/tool/node/spawn'

export async function runClangCommand(input: {
  bin: string
  args: string[]
}) {
  await spawnAndWait({ verb: 'compile', ...input })
}

export async function runClangppCommand(input: {
  bin: string
  args: string[]
}) {
  await spawnAndWait({ verb: 'compile', ...input })
}

export async function runSwiftCommand(input: {
  bin: string
  args: string[]
}) {
  await spawnAndWait({ verb: 'compile', ...input })
}

export async function runRustcCommand(input: {
  bin: string
  args: string[]
}) {
  try {
    return await spawnAndCapture({ verb: 'compile', ...input })
  } catch (e) {
    if (e instanceof Error) {
      throw kink('compilation_error', { note: e.message })
    }
  }
}
