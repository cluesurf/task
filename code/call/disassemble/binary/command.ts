import { getCommand } from '~/code/tool/shared/command'
import {
  DisassembleBinaryWithObjdump,
} from '~/code/form/action/convert/disassemble/binary/shared'
export async function buildCommandToDisassembleBinaryWithObjdump(
  input: DisassembleBinaryWithObjdump & { tool?: 'objdump' | 'llvm-objdump' },
) {
  // `llvm-objdump` takes the same long-form flags we use here, so
  // the builder is shared. Pick the binary via `tool` — useful on
  // macOS where GNU binutils isn't the default.
  const cmd = getCommand((input.tool ?? 'objdump') as never)
  if (input.show?.includes('archive_header')) {
    cmd.link.push(`--archive-header`)
  }
  if (input.show?.includes('debugging_info')) {
    cmd.link.push(`--debugging`)
  }
  if (input.show?.includes('section_header_summary')) {
    cmd.link.push(`--section-headers`)
  }
  if (input.show?.includes('source_code')) {
    cmd.link.push(`--source`)
  }
  if (input.show?.includes('all_header')) {
    cmd.link.push(`--all-headers`)
  }
  if (input.hide?.includes('address')) {
    cmd.link.push(`--no-addresses`)
  }
  if (input.hide?.includes('instruction_byte')) {
    cmd.link.push(`--no-show-raw-insn`)
  }
  if (input.demangleStyle) {
    cmd.link.push(`--demangle=${input.demangleStyle}`)
  }
  if (input.color) {
    cmd.link.push(`--disassembler-color=terminal`)
  }
  if (input.disassembleAll) {
    cmd.link.push(`--disassemble-all`)
  }
  return cmd
}
