import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
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
    `${input.output.file!.path}`,
    `${input.input.file.path}`,
  )

  return buildCommandSequence(cmd)
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
) {
  const engine = input.engine ?? 'pdflatex'
  const cmd = getCommand(engine)
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
}) {
  const cmd = getCommand('make4ht')
  cmd.link.push('--utf8')
  cmd.link.push('--output-dir', input.output.directory.path)
  cmd.link.push(input.input.file.path)
  cmd.link.push(input.buildFile ?? 'html5')
  return buildCommandSequence(cmd)
}

export function buildCommandToConvertDocumentWithCalibre(
  input: ConvertDocumentWithCalibreCommandInput,
) {
  const cmd = getCommand(`ebook-convert`)
  cmd.link.push(input.input.file.path, input.output.file!.path)
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
