import Kink, { KinkList } from '@termsurf/kink'
import { z } from 'zod'

export const CallBack = z.object({
  code: z.object({
    call: z.number().int(),
  }),
  form: z.enum(['rise', 'fall']),
  load: z.object({}).passthrough(),
})

export type CallBackCast = z.infer<typeof CallBack>

export type KinkBack = {
  code?: {
    call: number
  }
  form: 'fall'
  load: Array<any> | any
}

export type TimeCallLoad = RequestInit & { timeout?: number }

export function isZodError<I>(
  input: any,
): input is z.SafeParseError<I> {
  return !input.success && 'error' in input
}

export function loadKink(error: any) {
  // const back: KinkBack = loadKinkList(error)
  // if (back.load.length === 1) {
  //   back.load = back.load[0]
  // }
  // return back
}

export function loadKinkList(error: any) {
  if (error instanceof z.ZodError) {
    return loadZodErrorJSON(error)
  } else {
    let back: KinkBack
    let code
    if (error instanceof KinkList) {
      back = {
        form: 'fall',
        load: {
          form: 'kink-list',
          list: error.list.map(error => {
            Kink.saveFill(error)
            code ??= error.siteCode
            return error.toJSON()
          }),
        },
      }
    } else if (error instanceof Kink) {
      Kink.saveFill(error)
      code ??= error.siteCode
      back = { form: 'fall', load: [error.toJSON()] }
    } else if (error instanceof Error) {
      code ??= 500
      back = { form: 'fall', load: [Kink.makeBase(error)] }
    } else {
      code ??= 500
      back = {
        form: 'fall',
        load: Kink.makeBase(new Error(error as string)),
      }
    }
    return {
      code: {
        call: code ?? 500,
      },
      ...back,
    }
  }
}

export function loadZodErrorJSON(error: z.ZodError) {
  // const back: KinkBack = {
  //   code: {
  //     call: 406,
  //   },
  //   form: 'fall',
  //   load: error.issues.map(error => {
  //     switch (error.code) {
  //       case z.ZodIssueCode.invalid_type:
  //         return kink('form_fail', _.omit(error, ['code'])).toJSON()
  //       case z.ZodIssueCode.unrecognized_keys:
  //         return kink(
  //           'unrecognized_keys',
  //           _.omit(error, ['code']),
  //         ).toJSON()
  //       default:
  //         return Kink.makeBase({ name: 'z.ZodError', ...error })
  //     }
  //   }),
  // }
  // return back
}

// process.on('uncaughtException', kink => {
//   console.log(``)
//   if (kink instanceof KinkList) {
//     if (kink.list.length === 1) {
//       const k = kink.list[0]
//       if (k) {
//         Kink.saveFill(k)
//         console.log(makeKinkText(k))
//       }
//     } else {
//       console.log(makeKinkText(kink))
//       kink.list.forEach(kink => {
//         console.log(``)
//         Kink.saveFill(kink)
//         console.log(makeKinkText(kink))
//       })
//     }
//   } else if (kink instanceof Kink) {
//     Kink.saveFill(kink)
//     console.log(makeKinkText(kink))
//   } else if (kink instanceof Error) {
//     console.log(makeBaseKinkText(kink))
//   } else {
//     console.log(kink)
//   }
//   console.log(``)
// })
