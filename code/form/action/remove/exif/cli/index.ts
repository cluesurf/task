export type RemoveExifCommandInput = {
  input: {
    file: {
      path: string
    }
  }
  output?: {
    file?: {
      path?: string
    }
  }
  tag?: Array<string>
  preset?: Array<string>
  overwrite?: boolean
}
