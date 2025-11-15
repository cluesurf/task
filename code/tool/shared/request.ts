import assert from 'assert'
import { getConfig } from './config'
import Kink from '@termsurf/kink'
import { wait } from './timer'

export type RequestBody = FormData | object

export type NativeOptions = {
  signal?: AbortSignal
  onUpdate?: (update: RequestResponseCycle) => void | Promise<void>
}

export type RequestBase = {
  path: string
  method: string
  body?: RequestBody
  key?: string
}

export type Request = {
  type: 'request'
} & RequestBase

export type RequestProgress = RequestBase & {
  type: 'request-progress'
  percentComplete: number
}

export type ResponseWaiting = RequestBase & {
  type: 'response-waiting'
}

export type ResponseProgress = RequestBase & {
  type: 'response-progress'
  data?: any
}

export type Response = RequestBase & {
  type: 'response'
  data?: any
  status: 'success' | 'failure'
  code: number
}

export type RequestResponseCycle =
  | Request
  | RequestProgress
  | ResponseWaiting
  | ResponseProgress
  | Response

export async function checkRemote(
  {
    maxAttempts = 10,
    signal,
  }: { maxAttempts: number; signal?: AbortSignal } = {
    maxAttempts: 10,
  },
) {
  let i = 1
  while (true) {
    const res = await getRemote(`/check`, signal)
    if (res.status >= 400) {
      if (i === maxAttempts) {
        const error = await res.json()
        throw new Kink(error)
      } else {
        i++
        await wait(10000, signal)
        continue
      }
    } else {
      const json = await res.json()
      return json
    }
  }
}

export async function postRemote(input: Request, signal?: AbortSignal) {
  const remote = getConfig('remote')
  assert(typeof remote === 'string')

  let body
  let headers: Record<string, string> = {}

  if (typeof input.body === 'string') {
    body = input.body
    headers['content-type'] = 'application/json'
  } else if (input.body instanceof FormData) {
    body = input.body
    // headers['content-type'] = 'multipart/form-data'
  } else {
    body = JSON.stringify(body)
    headers['content-type'] = 'application/json'
  }

  return fetchWithTimeout(`${remote}${input.path}`, {
    method: 'POST',
    headers,
    body,
    signal,
  })
}

export async function getRemote(path: string, signal?: AbortSignal) {
  const remote = getConfig('remote')
  assert(typeof remote === 'string')

  return fetchWithTimeout(`${remote}${path}`, {
    method: 'GET',
    signal,
  })
}

export function buildRemoteRequest(
  method: string,
  path: string,
  body: RequestBody,
): Request {
  return {
    type: 'request',
    method,
    path: `${getConfig('remote')}${path}`,
    body,
  }
}

export function isRemoteRequest(input) {
  return Boolean(input.remote)
}

export type FetchOptions = RequestInit & {
  timeout?: number
}

export async function fetchWithTimeout(
  resource: string,
  options: FetchOptions = {},
) {
  const { timeout = 20000 } = options

  const response = await fetch(resource, {
    ...options,
    signal: (AbortSignal as any).any(
      [options.signal, AbortSignal.timeout(timeout)].filter(x => x),
    ),
  })

  return response
}

export async function requestMany(
  controller: AbortController,
  list: Array<Promise<Response>>,
) {
  return Promise.all(
    list.map((req, i) => {
      req.catch(e => {
        controller.abort(e)
      })
      return req
    }),
  )
}
