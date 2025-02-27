export type FileContent = {
  content: ArrayBuffer | Blob | string
}
export type FileContentWithSha256 = {
  sha256: string
  content: ArrayBuffer | Blob | string
}
export type FileHasOutputContent = {
  content: boolean
}
export type FileInputPath = {
  path: string
}
export type FileOutputPath = {
  path: string
}
export type FilePath = {
  path: string
}

export type FileReaderEncoding =
  | 'utf-8'
  | 'ibm866'
  | 'iso-8859-2'
  | 'iso-8859-3'
  | 'iso-8859-4'
  | 'iso-8859-5'
  | 'iso-8859-6'
  | 'iso-8859-7'
  | 'iso-8859-8'
  | 'iso-8859-8-i'
  | 'iso-8859-10'
  | 'iso-8859-13'
  | 'iso-8859-14'
  | 'iso-8859-15'
  | 'iso-8859-16'
  | 'koi8-r'
  | 'koi8-u'
  | 'macintosh'
  | 'windows-874'
  | 'windows-1250'
  | 'windows-1251'
  | 'windows-1252'
  | 'windows-1253'
  | 'windows-1254'
  | 'windows-1255'
  | 'windows-1256'
  | 'windows-1257'
  | 'windows-1258'
  | 'x-mac-cyrillic'
export type LocalInputPath = {
  path: string
}
export type LocalOutputPath = {
  path: string
}
export type LocalPath = {
  path: string
}
export type RemoteInputPath = {
  path: string
}
export type RemoteOutputPath = {
  path: string
}
export type RemotePath = {
  path: string
}
