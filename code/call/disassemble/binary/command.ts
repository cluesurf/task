import {
  DisassembleBinaryWithObjdump,
} from '~/code/form/action/convert/disassemble/binary/shared'
export async function buildCommandToDisassembleBinaryWithObjdump(
  input: DisassembleBinaryWithObjdump & { tool?: 'objdump' | 'llvm-objdump' },
): Promise<{ bin: string; args: string[] }> {
  // `llvm-objdump` takes the same long-form flags we use here, so
  // the builder is shared. Pick the binary via `tool` -- useful on
  // macOS where GNU binutils isn't the default.
  const bin = input.tool ?? 'objdump'
  const args: string[] = []
  if (input.show?.includes('archive_header')) {
    args.push(`--archive-header`)
  }
  if (input.show?.includes('debugging_info')) {
    args.push(`--debugging`)
  }
  if (input.show?.includes('section_header_summary')) {
    args.push(`--section-headers`)
  }
  if (input.show?.includes('source_code')) {
    args.push(`--source`)
  }
  if (input.show?.includes('all_header')) {
    args.push(`--all-headers`)
  }
  if (input.hide?.includes('address')) {
    args.push(`--no-addresses`)
  }
  if (input.hide?.includes('instruction_byte')) {
    args.push(`--no-show-raw-insn`)
  }
  if (input.demangleStyle) {
    args.push(`--demangle=${input.demangleStyle}`)
  }
  if (input.color) {
    args.push(`--disassembler-color=terminal`)
  }
  if (input.disassembleAll) {
    args.push(`--disassemble-all`)
  }
  return { bin, args }
}
