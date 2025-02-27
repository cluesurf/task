export type ForgeMessageDigest =
  | 'sha1'
  | 'sha256'
  | 'sha384'
  | 'sha512'
  | 'sha512/224'
  | 'sha512/256'
export type GenerateHash = {
  class: ForgeMessageDigest
  content: string | ArrayBuffer
}
