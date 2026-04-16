import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type RemoveProfileNodeInput = {
  input: string
  output?: string
}

export type RemoveProfileNodeOutput = { file: { path: string } }

export function parseRemoveProfileNode(
  input: unknown,
): RemoveProfileNodeInput {
  return parseSingleFileInput(input, 'remove profile', {})
}

export const testRemoveProfileNode = makeTestGuard(
  parseRemoveProfileNode,
)
