/**
 * Generic input resolvers for single-file verbs. The canonical
 * convert resolvers (`resolveInputForConvertLocalExternalNode` etc.)
 * live at `code/call/convert/tool/node.ts` and handle format
 * transforms, content downloads, and scope scoping. These simpler
 * versions cover the common case: file path in, file path out,
 * ensure output dir exists.
 *
 * For verbs with richer needs (format pairs, content streaming),
 * write a custom resolver instead.
 */

import { ensureParentDir, generateTemporaryFilePath } from './file'
import path from 'node:path'

type HasFileInput = {
  input: { file: Record<string, unknown> }
  output?: { file?: { path?: string } }
}

type LocalShape = {
  input: { file: { path: string } }
  output: { file: { path: string } }
}

/**
 * Resolver for `handle: 'internal'`. Input paths are already inside
 * the working area. Ensures an output path exists (generates a temp
 * path when the caller didn't supply one).
 */

export async function resolveInternalInput<
  T extends HasFileInput,
>(
  source: T,
  opts?: { suffix?: string },
): Promise<T & LocalShape> {
  const inputPath = (source.input.file as { path?: string }).path
  if (!inputPath) throw new Error('internal resolve: input.file.path required')
  const outputPath =
    source.output?.file?.path ??
    (await generateTemporaryFilePath(
      opts?.suffix ?? path.extname(inputPath),
    ))
  await ensureParentDir(outputPath)
  return {
    ...source,
    input: { ...source.input, file: { path: inputPath } },
    output: { ...source.output, file: { path: outputPath } },
  } as T & LocalShape
}

/**
 * Resolver for `handle: 'external'`. Same as internal for now —
 * external just means the paths live outside the task working
 * area. For verbs that need to pull remote URLs or normalize
 * content, override with a custom resolver.
 */

export async function resolveExternalInput<
  T extends HasFileInput,
>(
  source: T,
  opts?: { suffix?: string },
): Promise<T & LocalShape> {
  return resolveInternalInput(source, opts)
}
