import { ChildProcessError, exec } from '~/code/tool/node/process'
import kink from '~/code/tool/shared/kink'
import { Command } from '~/code/type/node/parser'

export async function runClangCommand(cmd: Command) {
  await exec(cmd.link)
}

export async function runClangppCommand(cmd: Command) {
  await exec(cmd.link)
}

export async function runSwiftCommand(cmd: Command) {
  await exec(cmd.link)
}

export async function runRustcCommand(cmd: Command) {
  try {
    return await exec(cmd.link)
  } catch (e) {
    if (e instanceof ChildProcessError) {
      if (e.data.stderr) {
        throw kink('compilation_error', { note: e.data.stderr })
      } else {
        throw kink('compilation_error', { note: e.data.stdout ?? '' })
      }
    } else if (e instanceof Error) {
      throw kink('compilation_error', { note: e.message })
    }
  }
}
