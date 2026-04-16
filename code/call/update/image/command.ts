/**
 * Pure argv builder for `task update image`. Assembles ImageMagick
 * `convert` flags for grayscale / brightness / contrast / saturation.
 */

import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'

export function buildUpdateImageCommand(input: {
  inputPath: string
  outputPath: string
  grayscale?: boolean
  brightness?: string
  contrast?: string
  saturation?: string
}) {
  const cmd = getCommand('convert')
  const ops: Array<string> = []

  if (input.grayscale) {
    ops.push('-colorspace', 'Gray')
  }

  if (input.brightness || input.contrast) {
    const b = normalizeSigned(input.brightness)
    const c = normalizeSigned(input.contrast)
    ops.push('-brightness-contrast', `${b},${c}`)
  }

  if (input.saturation) {
    const s = 100 + parseSigned(input.saturation)
    ops.push('-modulate', `100,${s},100`)
  }

  cmd.link.push(input.inputPath, ...ops, input.outputPath)
  return buildCommandSequence(cmd)
}

function parseSigned(value?: string): number {
  if (!value) return 0
  const n = Number(value)
  if (!Number.isFinite(n)) {
    throw new Error(
      `update image: expected a signed number (e.g. "+10"), got "${value}"`,
    )
  }
  return n
}

function normalizeSigned(value?: string): string {
  const n = parseSigned(value)
  return String(n)
}
