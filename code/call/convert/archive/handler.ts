import { spawnAndWait } from '~/code/tool/node/spawn'

export async function handleZipCommand(input: {
  bin: string
  args: string[]
}) {
  await spawnAndWait({ verb: 'archive', ...input })
}

export async function handleTarCommand(input: {
  bin: string
  args: string[]
}) {
  await spawnAndWait({ verb: 'archive', ...input })
}

export async function handle7zCommand(input: {
  bin: string
  args: string[]
}) {
  await spawnAndWait({ verb: 'archive', ...input })
}

export async function handleUnarCommand(input: {
  bin: string
  args: string[]
}) {
  await spawnAndWait({ verb: 'archive', ...input })
}

export async function handleRarCommand(input: {
  bin: string
  args: string[]
}) {
  await spawnAndWait({ verb: 'archive', ...input })
}
