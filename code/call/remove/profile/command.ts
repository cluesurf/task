export function buildCommandToRemoveProfile(
  inputPath: string,
  outputPath: string,
): { bin: 'convert'; args: string[] } {
  return {
    bin: 'convert',
    args: [inputPath, '+profile', '*', outputPath],
  }
}
