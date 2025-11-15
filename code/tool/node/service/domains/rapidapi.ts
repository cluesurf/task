// import z from 'zod'
// import { ErrorResponse, SuccessResponse } from '~/lib/shared/queries'

// const KEY = process.env.RAPID_API_KEY!

// export const getDefaultAPIHeaders = () => ({
//   'x-rapidapi-key': KEY,
//   accept: 'application/json',
//   'x-rapidapi-host': 'domainr.p.rapidapi.com',
// })

// const FetchDomainList = z.object({
//   registrar: z.string().optional(),
//   zones: z.array(z.string()).optional(),
//   location: z.string().default('us').optional(),
//   search: z.string(),
// })

// export type FetchDomainList = z.infer<typeof FetchDomainList>

// const FetchDomainListResponse = z.object({
//   results: z.array(
//     z.object({
//       domain: z.string(),
//       host: z.string(),
//       subdomain: z.string(),
//       path: z.string(),
//       zone: z.string(),
//       registerURL: z.string(),
//     }),
//   ),
//   errors: z
//     .array(
//       z.object({
//         code: z.number().int(),
//         message: z.string(),
//       }),
//     )
//     .optional(),
// })

// export type FetchDomainListResponse = z.infer<
//   typeof FetchDomainListResponse
// >

// export async function fetchDomainList(source: FetchDomainList) {
//   const input = FetchDomainList.parse(source)

//   const search = new URLSearchParams()
//   search.set('mashape-key', KEY)
//   search.set('query', encodeURIComponent(input.search))
//   if (input.zones) {
//     search.set('defaults', input.zones.join(','))
//   }
//   if (input.location) {
//     search.set('location', input.location)
//   }
//   if (input.registrar) {
//     search.set('registrar', input.registrar)
//   }

//   const url = `https://domainr.p.rapidapi.com/v2/search?${search}`
//   const options = {
//     method: 'GET',
//     headers: getDefaultAPIHeaders(),
//   }

//   const response = await fetch(url, options)
//   const json = (await response.json()) as FetchDomainListResponse

//   if (json.errors?.length) {
//     return <ErrorResponse>{
//       type: 'error',
//       message: json.errors.map(error => error.message).join(' '),
//     }
//   }

//   return <SuccessResponse>{
//     type: 'success',
//     data: json.results,
//   }
// }

// const FetchDomainStatus = z.object({
//   domain: z.string(),
// })

// export type FetchDomainStatus = z.infer<typeof FetchDomainStatus>

// const FetchDomainStatusResponse = z.object({
//   status: z.array(
//     z.object({
//       domain: z.string(),
//       zone: z.string(),
//       status: z.string(),
//       summary: z.enum(['unknown', 'active', 'inactive']),
//     }),
//   ),
//   errors: z
//     .array(
//       z.object({
//         code: z.number().int(),
//         message: z.string(),
//       }),
//     )
//     .optional(),
// })

// export type FetchDomainStatusResponse = z.infer<
//   typeof FetchDomainStatusResponse
// >

// export async function fetchDomainStatus(source: FetchDomainStatus) {
//   const input = FetchDomainStatus.parse(source)

//   const search = new URLSearchParams()
//   search.set('mashape-key', KEY)
//   search.set('domain', input.domain)

//   const url = `https://domainr.p.rapidapi.com/v2/status?${search}`
//   const options = {
//     method: 'GET',
//     headers: getDefaultAPIHeaders(),
//   }

//   const response = await fetch(url, options)
//   const json = (await response.json()) as FetchDomainStatusResponse

//   if (json.errors?.length) {
//     return <ErrorResponse>{
//       type: 'error',
//       message: json.errors.map(error => error.message).join(' '),
//     }
//   }

//   return <SuccessResponse>{
//     type: 'success',
//     data: json.status[0],
//   }
// }
