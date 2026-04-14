import { z } from 'zod'

import {
  ObjdumpDemangleStyle,
  ObjdumpHideOption,
  ObjdumpShowOption,
} from '~/code/form/action/convert/disassemble/binary/shared'
import {
  OBJDUMP_DEMANGLE_STYLE,
  OBJDUMP_HIDE_OPTION,
  OBJDUMP_SHOW_OPTION,
} from '~/code/form/action/convert/disassemble/binary/shared/base'

export const DisassembleBinaryWithObjdumpParser = z.object({
  show: z.array(z.lazy(() => ObjdumpShowOptionParser)),
  demangleStyle: z.lazy(() => ObjdumpDemangleStyleParser),
  disassembleAll: z.boolean(),
  hide: z.lazy(() => ObjdumpHideOptionParser),
  color: z.boolean(),
})

export type DisassembleBinaryWithObjdumpRecord = z.infer<
  typeof DisassembleBinaryWithObjdumpParser
>

export const ObjdumpDemangleStyleParser = z.enum(
  OBJDUMP_DEMANGLE_STYLE as readonly [string, ...string[]],
) as z.ZodType<ObjdumpDemangleStyle>

export const ObjdumpHideOptionParser = z.enum(
  OBJDUMP_HIDE_OPTION as readonly [string, ...string[]],
) as z.ZodType<ObjdumpHideOption>

export const ObjdumpShowOptionParser = z.enum(
  OBJDUMP_SHOW_OPTION as readonly [string, ...string[]],
) as z.ZodType<ObjdumpShowOption>
