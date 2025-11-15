import { fileTypeFromBuffer, fileTypeFromFile } from 'file-type'
import { CheckFileTypeUsingMagicBytes } from '~/code/form/action/check/file/index'
import { GuessLang } from 'guesslang-js'

export async function checkFileTypeUsingMagicBytes(
  input: CheckFileTypeUsingMagicBytes,
) {
  return await fileTypeFromFile(input.input.file.path)
}

export async function guessProgrammingLanguage(source) {
  const guessLang = new GuessLang()
  const result = await guessLang.runModel(source.input.file.content)
  return result.map(({ languageId, confidence }) => ({
    language: languageId,
    confidence,
  }))
}
