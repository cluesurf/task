import { convertEncoding } from '~/code/tool/node/text/make'

export type SetEncodingNodeInput = {
  target: string
  file: string
  output?: string
}

async function setEncodingNode(input: SetEncodingNodeInput) {
  await convertEncoding(input.file, input.target, input.output)
  return {
    file: { path: input.output ?? input.file },
    encoding: input.target,
  }
}

export default setEncodingNode
export { setEncodingNode }
