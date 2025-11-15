export type GenerateTest = {
  format: string
}

export function testGenerate(input): input is GenerateTest {
  if (!input) {
    return false
  }

  if (!('format' in input)) {
    return false
  }
  return true
}
