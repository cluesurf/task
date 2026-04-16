import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type RemoveTransparencyNodeInput = {
  input: string
  output?: string
  background?: string
}

export type RemoveTransparencyNodeOutput = {
  file: { path: string }
}

export function parseRemoveTransparencyNode(
  input: unknown,
): RemoveTransparencyNodeInput {
  return parseSingleFileInput(input, 'remove transparency', {
    strings: ['background'] as const,
  })
}

export const testRemoveTransparencyNode = makeTestGuard(
  parseRemoveTransparencyNode,
)
