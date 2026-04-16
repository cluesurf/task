import { convertEol, type Eol } from '~/code/tool/node/text/make'

export type SetEolNodeInput = {
  target: Eol
  file: string
  output?: string
}

async function setEolNode(input: SetEolNodeInput) {
  await convertEol(input.file, input.target, input.output)
  return {
    file: { path: input.output ?? input.file },
    eol: input.target,
  }
}

export default setEolNode
export { setEolNode }
