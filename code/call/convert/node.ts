import {
  convertRouteNode,
  type ConvertRoute,
} from '~/code/form/export/action/convert/node'
import type {
  ConvertNodeInput,
  ConvertNodeOutput,
} from '~/code/form/export/node'

export type { ConvertNodeInput, ConvertNodeOutput }

type BaseSets = {
  input: ReadonlySet<string>
  output: ReadonlySet<string>
}

const BASE_CACHE = new Map<string, BaseSets>()
const ROUTE_CACHE = new Map<string, ConvertRoute>()

export async function convertNode(
  source: ConvertNodeInput,
): Promise<ConvertNodeOutput> {
  const src = source as {
    tool?: string
    input: { format: string }
    output: { format: string }
  }

  const route = await pickConvertRoute({
    input: src.input.format,
    output: src.output.format,
    tool: src.tool,
  })

  if (!route) {
    throw new Error(
      `No handler for convert ${src.input.format} → ${src.output.format}${
        src.tool ? ` (tool=${src.tool})` : ''
      }`,
    )
  }

  const call = await route.loadCall()
  return call.run(source) as Promise<ConvertNodeOutput>
}

async function pickConvertRoute({
  input,
  output,
  tool,
}: {
  input: string
  output: string
  tool?: string
}): Promise<ConvertRoute | undefined> {
  const cacheKey = tool ? `${tool}\t${input}\t${output}` : `${input}\t${output}`
  const cached = ROUTE_CACHE.get(cacheKey)
  if (cached) return cached

  for (const route of convertRouteNode) {
    if (tool && route.tool !== tool) continue

    const base = await loadBase(route)
    if (!base.input.has(input)) continue
    if (!base.output.has(output)) continue

    ROUTE_CACHE.set(cacheKey, route)
    return route
  }

  return undefined
}

async function loadBase(route: ConvertRoute): Promise<BaseSets> {
  const hit = BASE_CACHE.get(route.tool)
  if (hit) return hit

  const raw = await route.loadBase()
  const sets: BaseSets = {
    input: new Set(raw.input),
    output: new Set(raw.output),
  }
  BASE_CACHE.set(route.tool, sets)
  return sets
}
