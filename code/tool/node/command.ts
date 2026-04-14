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

export type CommandHandlerName = CommandKey

export const COMMAND_HANDLER: Record<string, (cmd: Command) => any> = {
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
  zip: runGenericCommand,
  duckdb: runGenericCommand,
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

export async function runGenericCommand(cmd: Command) {
  await exec(cmd.link)
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
  return await handler(command)
}
