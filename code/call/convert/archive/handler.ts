import { exec } from '~/code/tool/node/process'
import {
  Command,
} from '~/code/form/object/request'export async function handleZipCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleTarCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handle7zCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleUnarCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleRarCommand(cmd: Command) {
  return await exec(cmd.link)
}
