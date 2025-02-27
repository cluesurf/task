export type DisassembleBinaryWithObjdump = {
  show: Array<ObjdumpShowOption>
  demangleStyle: ObjdumpDemangleStyle
  disassembleAll: boolean
  hide: ObjdumpHideOption
  color: boolean
}

export type ObjdumpDemangleStyle =
  | 'none'
  | 'auto'
  | 'gnu-v3'
  | 'java'
  | 'gnat'
  | 'dlang'
  | 'rust'

export type ObjdumpHideOption = 'address' | 'instruction_byte'

export type ObjdumpShowOption =
  | 'archive_header'
  | 'debugging_info'
  | 'section_header_summary'
  | 'source_code'
  | 'all_header'
