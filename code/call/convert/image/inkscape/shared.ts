import { testConvertFileInputOutput } from '../../shared'

export function testConvertImageWithInkscape(input: any) {
  if (!testConvertFileInputOutput(input)) {
    return false
  }

  const {
    input: { format: a },
    output: { format: b },
  } = input

  if (a === b) {
    return false
  }
  if (a !== 'ai') {
    return false
  }
  if (b !== 'svg') {
    return false
  }
  return true
}
