export type ShapeFontArgs = {
  input: string
  text: string
  features?: string
  script?: string
  language?: string
  direction?: string
}

export function buildShapeFontCommand(args: ShapeFontArgs): { bin: string; args: string[] } {
  const bin = 'hb-shape'
  const a: string[] = []
  if (args.features) a.push(`--features=${args.features}`)
  if (args.script) a.push(`--script=${args.script}`)
  if (args.language) a.push(`--language=${args.language}`)
  if (args.direction) a.push(`--direction=${args.direction}`)
  a.push(args.input, args.text)
  return { bin, args: a }
}
