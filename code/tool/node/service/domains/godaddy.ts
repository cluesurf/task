// import { z } from 'zod'
// import { ErrorResponse, SuccessResponse } from '~/lib/shared/queries'

// const HOST = `https://api.godaddy.com`
// const KEY = process.env.GODADDY_KEY!
// const SECRET = process.env.GODADDY_SECRET!

// export const getDefaultAPIHeaders = () => ({
//   authorization: `sso-key ${KEY}:${SECRET}`,
//   accept: 'application/json',
// })

// const FetchDomainStatuses = z.object({
//   domains: z.array(z.string()),
// })

// export type FetchDomainStatuses = z.infer<typeof FetchDomainStatuses>

// const FetchDomainStatusesSuccessResponse = z.object({
//   available: z.boolean(),
//   currency: z.string(), // Assuming currency is a 3-letter code like "USD"
//   definitive: z.boolean(),
//   domain: z.string(),
//   period: z.number(), // Assuming period is an integer
//   price: z.number(), // Assuming price can be a float or integer
// })

// export type FetchDomainStatusesSuccessResponse = z.infer<
//   typeof FetchDomainStatusesSuccessResponse
// >

// const GoDaddyErrorResponse = z.object({
//   code: z.string(),
//   message: z.string(),
// })

// export type GoDaddyErrorResponse = z.infer<typeof GoDaddyErrorResponse>

// export async function fetchDomainStatuses(source: FetchDomainStatuses) {
//   const input = FetchDomainStatuses.parse(source)
//   const search = new URLSearchParams()
//   search.set('checkType', 'FULL')
//   search.set('forTransfer', 'false')
//   const url = `${HOST}/v1/domains/available?${search}`

//   const res = await fetch(url, {
//     method: 'POST',
//     headers: getDefaultAPIHeaders(),
//     body: JSON.stringify(input),
//   })

//   const json = (await res.json()) as
//     | FetchDomainStatusesSuccessResponse
//     | GoDaddyErrorResponse

//   if ('code' in json) {
//     return <ErrorResponse>{
//       type: 'error',
//       message: json.message,
//     }
//   }

//   return <SuccessResponse>{
//     type: 'success',
//     data: json,
//   }
// }
