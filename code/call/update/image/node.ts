import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { runCommandSequence } from '~/code/tool/node/command'

export type UpdateImageNodeInput = {
  input: { file: { path: string } }
  output?: { file?: { path?: string } }
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}

export async function updateImageNode(source: UpdateImageNodeInput) {
  const inputPath = source.input.file.path
  const outputPath = source.output?.file?.path ?? inputPath

  const ops: string[] = []
  if (source.grayscale) ops.push('-colorspace', 'Gray')
  // ImageMagick's `-brightness-contrast` takes `brightness,contrast`
  // as signed percentages; `-modulate` takes brightness-saturation-
  // hue as absolute percents. Map the friendlier signed flags to
  // `-brightness-contrast` and saturation to `-modulate`.
  if (source.brightness || source.contrast) {
    const b = normalizeSigned(source.brightness)
    const c = normalizeSigned(source.contrast)
    ops.push('-brightness-contrast', `${b},${c}`)
  }
  if (source.saturation) {
    const s = 100 + parseSigned(source.saturation)
    ops.push('-modulate', `100,${s},100`)
  }

  if (ops.length === 0) {
    throw new Error(
      'update image: pass at least one of --grayscale / --brightness / --contrast / --saturation',
    )
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  const cmd = getCommand('convert')
  cmd.link.push(inputPath, ...ops, outputPath)
  await runCommandSequence(buildCommandSequence(cmd))
  return { file: { path: outputPath } }
}

function parseSigned(value?: string): number {
  if (!value) return 0
  const n = Number(value)
  if (!Number.isFinite(n)) {
    throw new Error(`update image: expected a signed number (e.g. "+10"), got "${value}"`)
  }
  return n
}

function normalizeSigned(value?: string): string {
  const n = parseSigned(value)
  return String(n)
}
