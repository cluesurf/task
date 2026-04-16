export type SubsetFontArgs = {
  input: string
  output: string
  text?: string
  unicodes?: string
  layoutFeatures?: string
  flavor?: string
}

export function buildSubsetFontCommand(args: SubsetFontArgs): { bin: string; args: string[] } {
  const bin = 'pyftsubset'
  const a: string[] = [args.input, `--output-file=${args.output}`]
  if (args.text) a.push(`--text=${args.text}`)
  if (args.unicodes) a.push(`--unicodes=${args.unicodes}`)
  if (args.layoutFeatures) {
    a.push(`--layout-features=${args.layoutFeatures}`)
  }
  if (args.flavor) a.push(`--flavor=${args.flavor}`)
  return { bin, args: a }
}
