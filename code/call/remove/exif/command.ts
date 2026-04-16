export type RemoveExifPreset = 'gps' | 'device' | 'user'

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

export function collectExifTags(input: {
  tag?: string[]
  preset?: string[]
}): string[] {
  return [
    ...(input.tag ?? []),
    ...(input.preset ?? []).flatMap(
      p => PRESET_TAGS[p as RemoveExifPreset] ?? [],
    ),
  ]
}

export function buildCommandToRemoveExif(input: {
  tags: string[]
  outputPath: string
}): { bin: 'exiftool'; args: string[] } {
  const args: string[] = ['-overwrite_original']
  for (const tag of input.tags) args.push(`-${tag}=`)
  args.push(input.outputPath)
  return { bin: 'exiftool', args }
}
