export type ArchiveWithRar = {
  input: {
    path: string
  }
  output: {
    format: RarOutputFormat
    file: {
      path: string
    }
  }
  level?: number
  password?: string
  solid?: boolean
  recovery?: number
  exclude?: Array<string>
  recursive?: boolean
  volumeSize?: string
}

export type RarOutputFormat = 'rar'
