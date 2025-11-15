// import z from 'zod'
// import { ErrorResponse, SuccessResponse } from '~/lib/shared/queries'

// const KEY = process.env.SPACESHIP_KEY!
// const SECRET = process.env.SPACESHIP_SECRET!

// export const getDefaultAPIHeaders = () => ({
//   'x-api-key': KEY,
//   'x-api-secret': SECRET,
// })

// const FetchDomainStatus = z.object({
//   domain: z.string(),
// })

// export type FetchDomainStatus = z.infer<typeof FetchDomainStatus>

// const FetchDomainStatusSuccessResponse = z.object({
//   name: z.string(),
//   unicodeName: z.string(),
//   isPremium: z.boolean(),
//   autoRenew: z.boolean(),
//   registrationDate: z.string().datetime(), // ISO 8601 date-time format
//   expirationDate: z.string().datetime(), // ISO 8601 date-time format
//   lifecycleStatus: z.enum([
//     'registered',
//     'pending',
//     'expired',
//     'suspended',
//   ]), // Adjust possible values as necessary
//   verificationStatus: z.enum(['success', 'pending', 'failed']), // Adjust possible values as necessary
//   eppStatuses: z.array(z.string()), // Array of status strings
//   suspensions: z.array(
//     z.object({
//       reasonCode: z.string(), // Adjust specific possible values if known
//     }),
//   ),
//   privacyProtection: z.object({
//     contactForm: z.boolean(),
//     level: z.enum(['low', 'medium', 'high']), // Adjust possible values as necessary
//   }),
//   nameservers: z.object({
//     provider: z.enum(['basic', 'advanced', 'premium']), // Adjust possible values if known
//     hosts: z.array(z.string()), // Array of host strings
//   }),
//   contacts: z.object({
//     registrant: z.string(),
//     admin: z.string(),
//     tech: z.string(),
//     billing: z.string(),
//     attributes: z.array(z.string()), // Array of attribute strings
//   }),
// })

// export type FetchDomainStatusSuccessResponse = z.infer<
//   typeof FetchDomainStatusSuccessResponse
// >

// const FetchDomainStatusErrorResponse = z.object({
//   detail: z.string(),
// })

// export type FetchDomainStatusErrorResponse = z.infer<
//   typeof FetchDomainStatusErrorResponse
// >

// export type FetchDomainStatusResponse =
//   | FetchDomainStatusSuccessResponse
//   | FetchDomainStatusErrorResponse

// export async function fetchDomainStatus(source: FetchDomainStatus) {
//   const input = FetchDomainStatus.parse(source)

//   const url = `https://spaceship.dev/api/v1/domains/${input.domain}`

//   const options = {
//     method: 'GET',
//     headers: getDefaultAPIHeaders(),
//   }

//   const res = await fetch(url, options)
//   const json = (await res.json()) as FetchDomainStatusResponse

//   if ('detail' in json) {
//     return <ErrorResponse>{
//       type: 'error',
//       message: json.detail,
//     }
//   }

//   return <SuccessResponse>{
//     type: 'success',
//     data: json,
//   }
// }
