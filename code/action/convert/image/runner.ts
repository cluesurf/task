import { ChildProcessError, exec } from '~/code/tool/node/process'
import { Command } from '~/code/type/index'

export async function runConvertCommand(cmd: Command) {
  try {
    return await exec(cmd.link)
  } catch (e) {
    if (e instanceof ChildProcessError) {
      if (e.data.stderr) {
        if (e.data.stderr.match(/^convert: unable to open image/i)) {
          // throw new Kink
          throw new Error(`Cannot process image.`)
        }
      }
    } else {
      throw new Error(`System error`)
    }
  }
}

export async function runMogrifyCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function runInkscapeCommand(cmd: Command) {
  return await exec(cmd.link)
}
