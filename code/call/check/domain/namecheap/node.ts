/**
 * Namecheap implementation of `task check domain`.
 *
 * Wraps the `namecheap.domains.check` XML endpoint, which
 * accepts up to 50 domain names per call. The worker
 * batches the input list, sleeps briefly between batches
 * to stay polite, and returns a unified
 * `DomainCheckResult[]`.
 *
 * Credentials come from environment:
 *
 *   NAMECHEAP_API_USERNAME    same as Namecheap account name
 *   NAMECHEAP_API_KEY         API key from the dashboard
 *   NAMECHEAP_USER_IP         whitelisted client IP
 */

import { parseStringPromise } from 'xml2js'

import type {
  CheckDomainNodeInput,
  CheckDomainNodeOutput,
  DomainCheckResult,
} from '../make'

/**
 * Namecheap caps a single bulk request at 50 domains.
 * Larger inputs are chunked transparently.
 */

const NAMECHEAP_BATCH_SIZE = 50

/**
 * Polite delay between consecutive bulk calls. Roughly
 * matches the cadence of the original task script and
 * stays well under Namecheap's documented rate limits.
 */

const NAMECHEAP_BATCH_DELAY_MS = 1500
const NAMECHEAP_BATCH_JITTER_MS = 500

/**
 * Endpoint URL — production. Sandbox uses
 * `api.sandbox.namecheap.com` and is not currently wired.
 */

const NAMECHEAP_ENDPOINT = 'https://api.namecheap.com/xml.response'

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `check domain (namecheap): missing required env var ${name}`,
    )
  }
  return value
}

type NamecheapDomainCheckResultRow = {
  Domain?: string
  Available?: string
  ErrorNo?: string
  Description?: string
  IsPremiumName?: string
  PremiumRegistrationPrice?: string
  IcannFee?: string
}

type NamecheapEnvelope = {
  ApiResponse?: {
    $?: { Status?: string }
    Errors?: Array<{ Error?: Array<string | { _?: string }> }>
    CommandResponse?: Array<{
      DomainCheckResult?: Array<{ $: NamecheapDomainCheckResultRow }>
    }>
  }
}

async function callNamecheap({
  domains,
  apiUser,
  apiKey,
  username,
  clientIp,
}: {
  domains: string[]
  apiUser: string
  apiKey: string
  username: string
  clientIp: string
}): Promise<DomainCheckResult[]> {
  const url = new URL(NAMECHEAP_ENDPOINT)
  url.search = new URLSearchParams({
    ApiUser: apiUser,
    ApiKey: apiKey,
    UserName: username,
    ClientIp: clientIp,
    Command: 'namecheap.domains.check',
    DomainList: domains.join(','),
  }).toString()

  const res = await fetch(url.toString())
  const xml = await res.text()
  if (!xml.trim()) {
    throw new Error('check domain (namecheap): empty response from API')
  }

  const json = (await parseStringPromise(xml)) as NamecheapEnvelope

  const status = json.ApiResponse?.$?.Status
  if (status === 'ERROR') {
    const errorNode = json.ApiResponse?.Errors?.[0]?.Error?.[0]
    const errorText =
      typeof errorNode === 'string' ? errorNode : errorNode?._
    throw new Error(
      `check domain (namecheap): API error: ${errorText ?? 'unknown'}`,
    )
  }

  const rows =
    json.ApiResponse?.CommandResponse?.[0]?.DomainCheckResult ?? []

  return rows.map(({ $: row }) => {
    const result: DomainCheckResult = {
      domain: row.Domain ?? '',
      available: row.Available === 'true',
      provider: 'namecheap',
    }
    if (row.ErrorNo && row.ErrorNo !== '0') {
      result.errorCode = row.ErrorNo
      result.errorMessage = row.Description
    }
    const details: Record<string, string | number | boolean> = {}
    if (row.IsPremiumName !== undefined) {
      details.premium = row.IsPremiumName === 'true'
    }
    if (row.PremiumRegistrationPrice !== undefined) {
      details.premiumRegistrationPrice = row.PremiumRegistrationPrice
    }
    if (row.IcannFee !== undefined) {
      details.icannFee = row.IcannFee
    }
    if (Object.keys(details).length > 0) {
      result.details = details
    }
    return result
  })
}

async function checkDomainNamecheapNode({
  source,
}: {
  source: CheckDomainNodeInput
}): Promise<CheckDomainNodeOutput> {
  const apiUser = requireEnv('NAMECHEAP_API_USERNAME')
  const apiKey = requireEnv('NAMECHEAP_API_KEY')
  const username = apiUser
  const clientIp = requireEnv('NAMECHEAP_USER_IP')

  const domains = source.input.domain
  const out: DomainCheckResult[] = []

  for (let i = 0; i < domains.length; i += NAMECHEAP_BATCH_SIZE) {
    const batch = domains.slice(i, i + NAMECHEAP_BATCH_SIZE)
    const batchResults = await callNamecheap({
      domains: batch,
      apiUser,
      apiKey,
      username,
      clientIp,
    })
    out.push(...batchResults)

    const isLastBatch = i + NAMECHEAP_BATCH_SIZE >= domains.length
    if (!isLastBatch) {
      await wait(
        NAMECHEAP_BATCH_DELAY_MS +
          Math.random() * NAMECHEAP_BATCH_JITTER_MS,
      )
    }
  }

  return { results: out }
}

export default checkDomainNamecheapNode
export { checkDomainNamecheapNode }
