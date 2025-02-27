export type UnarchiverFormat =
  | 'zip'
  | 'rar'
  | '7z'
  | 'tar'
  | 'gzip'
  | 'bzip2'
  | 'lzma'
  | 'cab'
  | 'msi'
  | 'nsis'
  | 'exe'
  | 'iso'
export type UnarchiverFormatContentValue = UnarchiverFormatData

export type UnarchiverFormatContent = Record<
  UnarchiverFormat,
  UnarchiverFormatContentValue
>
export type UnarchiverFormatData = {
  head: string
}
