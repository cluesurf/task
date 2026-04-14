import { convertEncoding } from '~/code/tool/node/text/base'

export type SetEncodingNodeInput = {
  target: string
  file: string
  output?: string
}

export async function setEncodingNode(input: SetEncodingNodeInput) {
  await convertEncoding(input.file, input.target, input.output)
  return {
    file: { path: input.output ?? input.file },
    encoding: input.target,
  }
}
