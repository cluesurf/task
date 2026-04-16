/**
 * Factory for the canonical four-branch node handler. Replaces the
 * ~100-line boilerplate in each `code/call/<verb>/<thing>/node.ts`
 * with a single declarative call:
 *
 *   export const { handler, test } = createNodeHandler({
 *     inputParser: RemovePasswordNodeInputParser,
 *     localParser: RemovePasswordNodeLocalInputParser,
 *     outputParser: RemovePasswordNodeOutputParser,
 *     resolveExternal: resolveInputForSingleFileExternalNode,
 *     resolveInternal: resolveInputForSingleFileInternalNode,
 *     runLocal: async (input) => {
 *       const cmd = buildCommandToRemovePassword(...)
 *       await spawnAndWait(...)
 *       return { file: { path: ... } }
 *     },
 *   })
 *
 * The factory wires up parse → switch(handle) → resolve → local
 * worker. Remote support is opt-in via `remote` config.
 */

import { extend } from '~/code/tool/shared/object'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import type { NativeOptions } from '~/code/tool/shared/request'

export type NodeHandlerParsers<
  TInput,
  TLocal,
  TClient,
  TOutput,
> = {
  input: { parse(source: unknown): TInput }
  local: { parse(source: unknown): TLocal }
  output: { parse(source: unknown): TOutput }
  client?: { parse(source: unknown): TClient }
}

export type NodeHandlerResolvers<TInput, TLocal> = {
  external(source: TInput): Promise<TLocal> | TLocal
  internal(source: TInput): Promise<TLocal> | TLocal
  remote?(source: TInput): Promise<TInput>
}

export type NodeHandlerConfig<
  TInput,
  TLocal,
  TClient,
  TOutput,
> = {
  parsers: NodeHandlerParsers<TInput, TLocal, TClient, TOutput>
  resolvers: NodeHandlerResolvers<TInput, TLocal>
  runLocal(input: TLocal): Promise<TOutput>
  remote?: {
    buildRequest(input: TClient): { url: string; body: unknown }
    getOutputPath(input: TInput): string
  }
}

export type NodeHandlerResult<TInput, TOutput> = [
  handler: (source: TInput, native?: NativeOptions) => Promise<TOutput>,
  test: (input: unknown) => input is TInput,
]

export function createNodeHandler<
  TInput extends { handle?: string },
  TLocal,
  TClient,
  TOutput,
>(
  config: NodeHandlerConfig<TInput, TLocal, TClient, TOutput>,
): NodeHandlerResult<TInput, TOutput> {
  const { parsers, resolvers } = config

  const handler = async (
    source: TInput,
    native?: NativeOptions,
  ): Promise<TOutput> => {
    // Default to 'internal' when no handle is provided — the
    // programmatic API and CLI both omit it for local calls.
    const withHandle =
      (source as { handle?: string }).handle
        ? source
        : ({ ...source, handle: 'internal' } as TInput)
    const input = parsers.input.parse(withHandle)

    switch ((input as { handle?: string }).handle) {
      case 'remote':
        return handleRemote(input)
      case 'external':
        return handleExternal(input)
      default:
        return handleInternal(input)
    }
  }

  async function handleExternal(source: TInput): Promise<TOutput> {
    const resolved = await resolvers.external(source)
    return config.runLocal(resolved)
  }

  async function handleInternal(source: TInput): Promise<TOutput> {
    const resolved = await resolvers.internal(source)
    return config.runLocal(resolved)
  }

  async function handleRemote(
    source: TInput,
    native?: NativeOptions,
  ): Promise<TOutput> {
    if (!config.remote || !resolvers.remote || !parsers.client) {
      throw new Error('remote handle not configured for this verb')
    }
    const resolved = await resolvers.remote(source)
    const clientInput = parsers.client.parse(
      extend(resolved, { handle: 'client' }),
    )
    const request = config.remote.buildRequest(clientInput)
    const outputPath = config.remote.getOutputPath(resolved)
    await resolveWorkFileNode(request as never, outputPath)
    return parsers.output.parse({ file: { path: outputPath } })
  }

  const test = (input: unknown): input is TInput => {
    try {
      parsers.input.parse(input)
      return true
    } catch {
      return false
    }
  }

  return [handler, test] as NodeHandlerResult<TInput, TOutput>
}
