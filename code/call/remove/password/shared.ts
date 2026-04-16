import { parseSingleFileInput } from '~/code/tool/shared/sanitize'
import { makeTestGuard } from '~/code/tool/shared/verb'

export type RemovePasswordNodeInput = {
  input: string
  output?: string
  password?: string
}

export type RemovePasswordNodeOutput = { file: { path: string } }

export function parseRemovePasswordNode(
  input: unknown,
): RemovePasswordNodeInput {
  return parseSingleFileInput(input, 'remove password', {
    strings: ['password'] as const,
  })
}

export const testRemovePasswordNode = makeTestGuard(
  parseRemovePasswordNode,
)
