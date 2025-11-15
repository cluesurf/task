export type FormatTest = {
  format: string
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
}

export type FormatInputItem = {
  input: any
  extend: any
}

export type FormatInputWithExtension<T extends FormatInputItem> = {
  format: T['input']
} & FormatExtension<T['extend']>

export type FormatExtension<E extends { format: any }> = Omit<
  E,
  'format'
>

export function testFormatCode(input: any): input is FormatTest {
  if (!input) {
    return false
  }

  if (!('input' in input)) {
    return false
  }
  if (!('format' in input)) {
    return false
  }
  if (!('file' in input.input)) {
    return false
  }
  if (!('path' in input.input.file)) {
    return false
  }
  if (!('file' in input.output)) {
    return false
  }
  if (!('path' in input.output.file)) {
    return false
  }
  return true
}
