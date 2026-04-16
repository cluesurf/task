export type RenderFontArgs = {
  input: string
  output: string
  text: string
  fontSize?: number
  features?: string
}

export function buildRenderFontCommand(args: RenderFontArgs): { bin: string; args: string[] } {
  const bin = 'hb-view'
  const a: string[] = []
  if (args.fontSize) a.push(`--font-size=${args.fontSize}`)
  if (args.features) a.push(`--features=${args.features}`)
  a.push(`--output-file=${args.output}`, args.input, args.text)
  return { bin, args: a }
}
