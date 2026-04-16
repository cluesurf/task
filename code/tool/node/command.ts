import {
  runCalibreCommand,
  runDocx2pdfCommand,
  runExiftoolCommand,
  runJupyterCommand,
  runLibreOfficeCommand,
  runPandocCommand,
  runPdfLatexCommand,
  runUnoconvCommand,
} from '~/code/call/convert/document/handler'
import { runFontforgeCommand } from '~/code/call/convert/font/runner'
import {
  handleIdentifyCommand,
  runConvertCommand,
  runInkscapeCommand,
  runMogrifyCommand,
} from '~/code/call/convert/image/runner'
import {
  Command,
  CommandKey,
  CommandSequence,
} from '~/code/form/object/request'
import { exec } from './process'
import {
  handleAsmfmtCommand,
  handleBlackCommand,
  handleClangFormatCommand,
  handleKtfmtCommand,
} from '~/code/call/convert/video/local/node'
import {
  runClangCommand,
  runClangppCommand,
  runRustcCommand,
  runSwiftCommand,
} from '~/code/call/compile/code/handler'

type BinArgs = { bin: string; args: string[] }
type BinArgsHandler = (input: BinArgs) => any

export type CommandHandlerName = CommandKey

export const COMMAND_HANDLER: Record<string, BinArgsHandler> = {
  convert: runConvertCommand,
  mogrify: runMogrifyCommand,
  inkscape: runInkscapeCommand,
  calibre: runCalibreCommand, // runEbookConvertCommand
  soffice: runLibreOfficeCommand,
  pdflatex: runPdfLatexCommand,
  exiftool: runExiftoolCommand,
  jupyter: runJupyterCommand,
  docx2pdf: runDocx2pdfCommand,
  unoconv: runUnoconvCommand,
  pandoc: runPandocCommand,
  fontforge: runFontforgeCommand,
  unar: runGenericCommand,
  unzip: runGenericCommand,
  zip: runGenericCommand,
  rar: runGenericCommand,
  unrar: runGenericCommand,
  tar: runGenericCommand,
  '7z': runGenericCommand,
  atool: runGenericCommand,
  patool: runGenericCommand,
  duckdb: runGenericCommand,
  ffmpeg: runGenericCommand,
  ffprobe: runGenericCommand,
  id3v2: runGenericCommand,
  eyeD3: runGenericCommand,
  rg: runGenericCommand,
  fd: runGenericCommand,
  qpdf: runGenericCommand,
  pdfinfo: runGenericCommand,
  pdftotext: runGenericCommand,
  pdfimages: runGenericCommand,
  mutool: runGenericCommand,
  gs: runGenericCommand,
  pyftsubset: runGenericCommand,
  ttx: runGenericCommand,
  woff2_compress: runGenericCommand,
  'hb-shape': runGenericCommand,
  'hb-view': runGenericCommand,
  identify: handleIdentifyCommand,
  'clang-format': handleClangFormatCommand,
  black: handleBlackCommand,
  asmfmt: handleAsmfmtCommand,
  ktfmt: handleKtfmtCommand,
  clang: runClangCommand,
  'clang++': runClangppCommand,
  rustc: runRustcCommand,
  swift: runSwiftCommand,
}

export async function runGenericCommand(input: BinArgs) {
  await exec([input.bin, ...input.args])
}

export async function runCommandSequence(sequence: CommandSequence) {
  let output
  for (const command of sequence.call) {
    output = await runCommand(command)
  }
  return output
}

export async function runCommand(command: Command) {
  const handler = COMMAND_HANDLER[command.key]
  if (!handler) {
    throw new Error('No command handler for ' + command.key)
  }
  return await handler({
    bin: command.link[0]!,
    args: command.link.slice(1),
  })
}
