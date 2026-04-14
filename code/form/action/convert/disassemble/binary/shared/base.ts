import {
  ObjdumpDemangleStyle,
  ObjdumpHideOption,
  ObjdumpShowOption,
} from '~/code/form/action/convert/disassemble/binary/shared'

export const OBJDUMP_DEMANGLE_STYLE: ReadonlyArray<ObjdumpDemangleStyle> =
  ['none', 'auto', 'gnu-v3', 'java', 'gnat', 'dlang', 'rust']
export const OBJDUMP_HIDE_OPTION: ReadonlyArray<ObjdumpHideOption> = [
  'address',
  'instruction_byte',
]
export const OBJDUMP_SHOW_OPTION: ReadonlyArray<ObjdumpShowOption> = [
  'archive_header',
  'debugging_info',
  'section_header_summary',
  'source_code',
  'all_header',
]
