export type ArchiveWithSevenzip = {
  input: {
    path: string
  }
  output: {
    format: SevenzipOutputFormat
    file: {
      path: string
    }
  }
  level?: number
  method?: 'lzma2' | 'lzma' | 'bzip2' | 'ppmd' | 'deflate' | 'copy'
  password?: string
  encryptHeaders?: boolean
  solid?: boolean
  multithread?: number
  volumeSize?: string
  exclude?: Array<string>
}

export type SevenzipOutputFormat =
  | '7z'
  | 'zip'
  | 'tar'
  | 'tar.gz'
  | 'tar.bz2'
  | 'tar.xz'
  | 'gz'
  | 'bz2'
  | 'xz'
  | 'zst'
