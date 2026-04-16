export type GetDurationCommandInput = {
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
  unit?: 'ms' | 's' | 'clock'
  video?: boolean
}
