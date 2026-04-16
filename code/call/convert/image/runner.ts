import snakeCase from 'lodash/snakeCase'
import {
  spawnAndWait,
  spawnAndCapture,
} from '~/code/tool/node/spawn'

type BinArgs = { bin: string; args: string[] }

export async function runConvertCommand(input: BinArgs) {
  try {
    return await spawnAndCapture({ verb: 'convert', ...input })
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.match(/convert: unable to open image/i)) {
        throw new Error(`Cannot process image.`)
      }
    }
    throw new Error(`System error`)
  }
}

export async function runMogrifyCommand(input: BinArgs) {
  await spawnAndWait({ verb: 'convert', ...input })
}

export async function runInkscapeCommand(input: BinArgs) {
  await spawnAndWait({ verb: 'convert', ...input })
}

export async function handleIdentifyCommand(input: BinArgs) {
  const stdout = await spawnAndCapture({ verb: 'identify', ...input })
  const pattern = new RegExp(`^([^\\s]+)\\s+(\\w+)`, 'i')
  const match = stdout.match(pattern)
  return {
    path: match?.[1] ?? '',
    format: snakeCase(match?.[2] ?? ''),
  }
}
