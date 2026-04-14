export type ArchiveWithTar = {
  input: {
    path: string
  }
  output: {
    format: TarOutputFormat
    file: {
      path: string
    }
  }
  compressionLevel?: number
  dereference?: boolean
  exclude?: Array<string>
  changeDirectory?: string
  preserveOwner?: boolean
  preservePermissions?: boolean
}

export type TarOutputFormat =
  | 'tar'
  | 'tar.gz'
  | 'tgz'
  | 'tar.bz2'
  | 'tbz2'
  | 'tar.xz'
  | 'txz'
  | 'tar.zst'
  | 'tzst'
