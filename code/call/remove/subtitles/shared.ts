import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type RemoveSubtitlesNodeInput = {
  input: string
  output?: string
}

export type RemoveSubtitlesNodeOutput = {
  file: { path: string }
}

export function parseRemoveSubtitlesNode(
  input: unknown,
): RemoveSubtitlesNodeInput {
  return parseSingleFileInput(input, 'remove subtitles', {})
}

export const testRemoveSubtitlesNode = makeTestGuard(
  parseRemoveSubtitlesNode,
)
