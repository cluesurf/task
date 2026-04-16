export function buildCompressFontCommand({
  input,
}: {
  input: string
}): { bin: string; args: string[] } {
  const bin = 'woff2_compress'
  const args: string[] = [input]
  return { bin, args }
}
