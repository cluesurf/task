import {
  Command,
  CommandName,
  CommandSequenceParser,
} from '~/code/type/shared/parser'
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
  if (Array.isArray(call)) {
    return CommandSequenceParser().parse({ call })
  }
  return CommandSequenceParser().parse({ call: [call] })
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
