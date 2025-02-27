export type Cipher =
  | 'aes_ecb'
  | 'aes_cbc'
  | 'aes_cfb'
  | 'aes_ofb'
  | 'aes_ctr'
  | 'aes_gcm'
  | '3_des_ecb'
  | '3_des_cbc'
  | 'des_ecb'
  | 'des_cbc'
export type CipherContentValue = CipherData

export type CipherContent = Record<Cipher, CipherContentValue>
export type CipherData = {
  head: string
}
export type GenerateMurmurHash = {
  input: string
  seed: number
  version?: string
}
