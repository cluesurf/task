import { PRESET_TAGS, type RemoveExifNodeInput } from './shared'

export function collectExifTags(input: RemoveExifNodeInput): string[] {
  return [
    ...(input.tag ?? []),
    ...(input.preset ?? []).flatMap(p => PRESET_TAGS[p]),
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
