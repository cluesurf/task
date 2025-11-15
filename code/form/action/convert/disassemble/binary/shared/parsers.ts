import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  DisassembleBinaryWithObjdump,
  ObjdumpDemangleStyle,
  ObjdumpHideOption,
  ObjdumpShowOption,
} from '~/code/form/action/convert/disassemble/binary/shared/index'

let DisassembleBinaryWithObjdumpModel: z.ZodType<DisassembleBinaryWithObjdump>

export const DisassembleBinaryWithObjdumpParser =
  (): z.ZodType<DisassembleBinaryWithObjdump> => {
    if (!DisassembleBinaryWithObjdumpModel) {
      DisassembleBinaryWithObjdumpModel = z.object({
        show: z.array(z.lazy(() => ObjdumpShowOptionParser())),
        demangleStyle: z.lazy(() => ObjdumpDemangleStyleParser()),
        disassembleAll: z.boolean(),
        hide: z.lazy(() => ObjdumpHideOptionParser()),
        color: z.boolean(),
      }) as z.ZodType<DisassembleBinaryWithObjdump>
    }
    return DisassembleBinaryWithObjdumpModel!
  }

let ObjdumpDemangleStyleModel: z.ZodType<ObjdumpDemangleStyle>

export const ObjdumpDemangleStyleParser = () => {
  if (!ObjdumpDemangleStyleModel) {
    ObjdumpDemangleStyleModel = z.enum(
      LOAD('objdump_demangle_style') as readonly [string, ...string[]],
    ) as z.ZodType<ObjdumpDemangleStyle>
  }
  return ObjdumpDemangleStyleModel!
}

let ObjdumpHideOptionModel: z.ZodType<ObjdumpHideOption>

export const ObjdumpHideOptionParser = () => {
  if (!ObjdumpHideOptionModel) {
    ObjdumpHideOptionModel = z.enum(
      LOAD('objdump_hide_option') as readonly [string, ...string[]],
    ) as z.ZodType<ObjdumpHideOption>
  }
  return ObjdumpHideOptionModel!
}

let ObjdumpShowOptionModel: z.ZodType<ObjdumpShowOption>

export const ObjdumpShowOptionParser = () => {
  if (!ObjdumpShowOptionModel) {
    ObjdumpShowOptionModel = z.enum(
      LOAD('objdump_show_option') as readonly [string, ...string[]],
    ) as z.ZodType<ObjdumpShowOption>
  }
  return ObjdumpShowOptionModel!
}
