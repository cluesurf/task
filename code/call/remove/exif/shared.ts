import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type RemoveExifPreset = 'gps' | 'device' | 'user'

export type RemoveExifNodeInput = {
  input: string
  output?: string
  tag?: string[]
  preset?: RemoveExifPreset[]
  overwrite?: boolean
}

export type RemoveExifNodeOutput = { file: { path: string } }

export const PRESET_TAGS: Record<RemoveExifPreset, string[]> = {
  gps: ['GPS:all'],
  device: [
    'Make',
    'Model',
    'SerialNumber',
    'LensSerialNumber',
    'InternalSerialNumber',
  ],
  user: [
    'OwnerName',
    'Creator',
    'Artist',
    'Copyright',
    'By-line',
  ],
}

export function parseRemoveExifNode(
  input: unknown,
): RemoveExifNodeInput {
  return parseSingleFileInput(input, 'remove exif', {
    booleans: ['overwrite'] as const,
    arrays: ['tag', 'preset'] as const,
  }) as RemoveExifNodeInput
}

export const testRemoveExifNode = makeTestGuard(parseRemoveExifNode)
