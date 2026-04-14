export type ArchiveWithZip = {
  input: {
    path: string
  }
  output: {
    format: ZipOutputFormat
    file: {
      path: string
    }
  }
  level?: number
  password?: string
  encryption?: 'zip-2.0' | 'aes-128' | 'aes-256'
  exclude?: Array<string>
  recursive?: boolean
  junkPaths?: boolean
  splitSize?: string
}

export type ZipOutputFormat = 'zip'
