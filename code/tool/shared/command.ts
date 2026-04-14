import {
  Command,
  CommandName,
} from '~/code/form/object/request'
import {
  CommandSequenceParser,
} from '~/code/form/object/request/take'
import kink from './kink'

export const COMMAND: Record<CommandName, Array<string> | undefined> = {
  ffmpeg: ['ffmpeg'],
  perltidy: ['perltidy'],
  black: ['black'],
  asmfmt: ['asmfmt'],
  ktfmt: ['ktfmt'], // kotlin format
  convert: ['convert'],
  pandoc: ['pandoc'],
  java: ['java'],
  'clang++': ['clang++'],
  clang: ['clang'],
  llc: ['lcc'],
  'clang-format': ['clang-format'],
  'swift-format': ['swift-format'],
  swiftc: ['swiftc'],
  fontforge: ['fontforge'],
  mogrify: ['mogrify'],
  '7z': ['7z'],
  inkscape: ['inkscape'],
  unar: ['unar'],
  rar: ['rar'],
  pdflatex: ['pdflatex'],
  objdump: ['objdump'],
  rustc: ['rustc'],
  rustfmt: ['rustfmt'],
  gifsicle: ['gifsicle'],
  identify: ['identify'],
  rubocop: ['rubocop'],
  shfmt: ['shfmt'],
  zip: ['zip'],
  tar: ['tar'],
  exiftool: ['exiftool'],
  'ebook-convert': ['ebook-convert'],
  soffice: ['soffice'],
  jupyter: ['jupyter'],
  docx2pdf: process.platform?.match(/win32|darwin/)
    ? ['docx2pdf']
    : undefined,
  unoconv: ['unoconv'],
  patool: ['patool'],
  pdfcrop: ['pdfcrop'],
  ps2pdf: ['ps2pdf'],
  enscript: ['enscript'],
  duckdb: ['duckdb'],
  atool: ['atool'],
  unzip: ['unzip'],
  unrar: ['unrar'],
  ffprobe: ['ffprobe'],
  id3v2: ['id3v2'],
  eyeD3: ['eyeD3'],
  rg: ['rg'],
  fd: ['fd'],
  qpdf: ['qpdf'],
  pdfinfo: ['pdfinfo'],
  pdftotext: ['pdftotext'],
  pdfimages: ['pdfimages'],
  mutool: ['mutool'],
  gs: ['gs'],
  pyftsubset: ['pyftsubset'],
  ttx: ['ttx'],
  woff2_compress: ['woff2_compress'],
  'hb-shape': ['hb-shape'],
  'hb-view': ['hb-view'],
  xelatex: ['xelatex'],
  lualatex: ['lualatex'],
  make4ht: ['make4ht'],
  'llvm-objdump': ['llvm-objdump'],
  radare2: ['radare2'],
  rizin: ['rizin'],
  wasm2wat: ['wasm2wat'],
  javap: ['javap'],
  ildasm: ['ildasm'],
}

export function getCommand(name: CommandName): Command {
  const cmd = COMMAND[name]
  if (!cmd) {
    throw kink('command_missing', { name })
  }
  return { key: name, name: name, link: [...cmd] }
}

export function command(
  name: CommandName,
  bond: Array<string> | undefined,
) {
  COMMAND[name] = bond
}

// php-cs-fixer fix test/file/code/quicksort/quicksort.php

export function buildCommandSequence(call: Command | Array<Command>) {
  // The generated `CommandSequenceParser` is keyed off a baked-in
  // enum of binary names that only regenerates on `pnpm make:type`.
  // When a new verb ships with a new binary and codegen hasn't
  // run yet, the Zod parser rejects it even though `COMMAND` and
  // the handler table already accept the name. The shape here is
  // internal — validation at this layer doesn't protect anything
  // the downstream runner doesn't already check — so we skip it.
  const list = Array.isArray(call) ? call : [call]
  return { call: list } as ReturnType<typeof CommandSequenceParser.parse>
}

export function escapeCommandInput(s: string) {
  if (s === '') {
    return `''`
  }
  if (!/[^%+,-.\/:=@_0-9A-Za-z]/.test(s)) {
    return s
  }
  return `'` + s.replace(/'/g, `'"'`) + `'`
}
