import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command.js'
import {
  ConvertDocumentWithCalibreCommandInput,
  ConvertDocumentWithEnscriptCommandInput,
  ConvertDocumentWithJupyterCommandInput,
  ConvertDocumentWithLibreOfficeCommandInput,
  ConvertDocumentWithPandocCommandInput,
  ConvertLatexWithPdfLatexCommandInput,
} from '~/code/type/shared/index.js'

export function buildCommandToConvertDocumentWithLibreOffice(
  input: ConvertDocumentWithLibreOfficeCommandInput,
) {
  const cmd = getCommand('soffice')
  cmd.link.push('--headless')
  cmd.link.push('--convert-to')
  cmd.link.push(input.output.format)
  cmd.link.push('--outdir')
  cmd.link.push(input.output.directory.path)
  cmd.link.push(input.input.file.path)
  return buildCommandSequence(cmd)
}

export function buildCommandToConvertDocumentWithPandoc(
  input: ConvertDocumentWithPandocCommandInput,
) {
  const cmd = getCommand(`pandoc`)
  cmd.link.push(
    `--sandbox`,
    `-f`,
    `${input.input.format}`,
    `-t`,
    `${input.output.format}`,
    `-o`,
    `${input.output.file.path}`,
    `${input.input.file.path}`,
  )

  return buildCommandSequence(cmd)
}

// https://www.reddit.com/r/hacking/comments/108sp8f/how_to_know_if_a_pdf_contains_malware/

export function buildCommandToConvertLatexWithPdfLatex(
  input: ConvertLatexWithPdfLatexCommandInput,
) {
  const cmd = getCommand(`pdflatex`)
  cmd.link.push(
    `-interaction=nonstopmode`,
    `-halt-on-error`,
    `-output-directory`,
    `${input.output.directory.path}`,
    `-jobname=document`,
    `${input.input.file.path}`,
  )

  return buildCommandSequence(cmd)
}

export function buildCommandToConvertDocumentWithCalibre(
  input: ConvertDocumentWithCalibreCommandInput,
) {
  const cmd = getCommand(`ebook-convert`)
  cmd.link.push(input.input.file.path, input.output.file.path)
  return buildCommandSequence(cmd)
}

export function buildCommandToConvertDocumentWithJupyter(
  input: ConvertDocumentWithJupyterCommandInput,
) {
  const cmd = getCommand(`jupyter`)

  cmd.link.push(
    `nbconvert`,
    `--to`,
    input.output.format,
    input.input.file.path,
  )

  return buildCommandSequence(cmd)
}

export function buildCommandToConvertDocumentWithEnscript(
  input: ConvertDocumentWithEnscriptCommandInput,
) {
  const cmd = getCommand(`enscript`)

  // --margins=left:right:top:bottom
  // --ps-level=2
  // --word-wrap
  /// --language=PostScript,html,rtf

  // cmd.link.push(
  //   `nbconvert`,
  //   `--to`,
  //   input.output.format,
  //   input.input.file.path,
  // )

  return buildCommandSequence(cmd)
}
