import {
  ConvertDocumentWithCalibreCommandInput,
} from '~/code/form/action/convert/calibre/cli'
import {
  ConvertDocumentWithEnscriptCommandInput,
} from '~/code/form/action/convert/enscript/cli'
import {
  ConvertDocumentWithJupyterCommandInput,
} from '~/code/form/action/convert/jupyter/cli'
import {
  ConvertDocumentWithLibreOfficeCommandInput,
} from '~/code/form/action/convert/libre-office/cli'
import {
  ConvertDocumentWithPandocCommandInput,
} from '~/code/form/action/convert/pandoc/cli'
import {
  ConvertLatexWithPdfLatexCommandInput,
} from '~/code/form/action/convert/pdf-latex/cli'
export function buildCommandToConvertDocumentWithLibreOffice(
  input: ConvertDocumentWithLibreOfficeCommandInput,
): { bin: string; args: string[] } {
  const bin = 'soffice'
  const args: string[] = [
    '--headless',
    '--convert-to',
    input.output.format,
    '--outdir',
    input.output.directory.path,
    input.input.file.path,
  ]
  return { bin, args }
}

export function buildCommandToConvertDocumentWithPandoc(
  input: ConvertDocumentWithPandocCommandInput,
): { bin: string; args: string[] } {
  const bin = 'pandoc'
  const args: string[] = [
    `--sandbox`,
    `-f`,
    input.input.format,
    `-t`,
    input.output.format,
    `-o`,
    input.output.file!.path,
    input.input.file.path,
  ]

  return { bin, args }
}

// https://www.reddit.com/r/hacking/comments/108sp8f/how_to_know_if_a_pdf_contains_malware/

/**
 * `pdflatex` is the default engine. `xelatex` is the pick for
 * OpenType / system fonts (Unicode, RTL, CJK). `lualatex` is the
 * modern successor that embeds Lua scripting. All three accept the
 * same top-level flags we use here. Pick via `engine`.
 */
export function buildCommandToConvertLatexWithPdfLatex(
  input: ConvertLatexWithPdfLatexCommandInput & {
    engine?: 'pdflatex' | 'xelatex' | 'lualatex'
  },
): { bin: string; args: string[] } {
  const engine = input.engine ?? 'pdflatex'
  const bin = engine
  const args: string[] = [
    `-interaction=nonstopmode`,
    `-halt-on-error`,
    `-output-directory`,
    input.output.directory.path,
    `-jobname=document`,
    input.input.file.path,
  ]

  return { bin, args }
}

/**
 * `make4ht` drives tex4ht to produce HTML (+ CSS + images) from
 * `.tex`. Output format strings are the make4ht build-file names
 * (`html5`, `mathml`, `odt`, etc.). `--output-dir` keeps generated
 * sidecars contained.
 */
export function buildCommandToConvertLatexWithMake4ht(input: {
  input: { file: { path: string } }
  output: { directory: { path: string }; format?: string }
  /** Build file format, e.g. `html5`, `mathml`. Default `html5`. */
  buildFile?: string
}): { bin: string; args: string[] } {
  const bin = 'make4ht'
  const args: string[] = [
    '--utf8',
    '--output-dir',
    input.output.directory.path,
    input.input.file.path,
    input.buildFile ?? 'html5',
  ]
  return { bin, args }
}

export function buildCommandToConvertDocumentWithCalibre(
  input: ConvertDocumentWithCalibreCommandInput,
): { bin: string; args: string[] } {
  const bin = 'ebook-convert'
  const args: string[] = [input.input.file.path, input.output.file!.path]
  return { bin, args }
}

export function buildCommandToConvertDocumentWithJupyter(
  input: ConvertDocumentWithJupyterCommandInput,
): { bin: string; args: string[] } {
  const bin = 'jupyter'
  const args: string[] = [
    `nbconvert`,
    `--to`,
    input.output.format,
    input.input.file.path,
  ]

  return { bin, args }
}

export function buildCommandToConvertDocumentWithEnscript(
  input: ConvertDocumentWithEnscriptCommandInput,
): { bin: string; args: string[] } {
  const bin = 'enscript'
  const args: string[] = []

  // --margins=left:right:top:bottom
  // --ps-level=2
  // --word-wrap
  /// --language=PostScript,html,rtf

  // args.push(
  //   `nbconvert`,
  //   `--to`,
  //   input.output.format,
  //   input.input.file.path,
  // )

  return { bin, args }
}
