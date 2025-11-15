export type VerifyTest = {
  format: string
  file: {
    path: string
  }
}

export type VerifyExtension<E extends { format: any }> = Omit<
  E,
  'format'
>

export function testVerify(input) {
  if (!input) {
    return false
  }

  if (!('format' in input)) {
    return false
  }
  if (!('file' in input)) {
    return false
  }
  if (!('path' in input.file)) {
    return false
  }
  return true
}
