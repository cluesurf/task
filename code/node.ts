import {
  convertNode,
  type ConvertNodeInput,
  type ConvertNodeOutput,
} from '~/code/call/convert/node'

export type TaskOptions = {
  host?: string
  code?: string
}

const DEFAULT_HOST = 'https://task.surf'

export default class Task {
  private host: string
  private code?: string

  constructor({ host, code }: TaskOptions = {}) {
    this.host = host ?? DEFAULT_HOST
    this.code = code
  }

  convert(source: ConvertNodeInput): Promise<ConvertNodeOutput> {
    return convertNode(source)
  }
}
