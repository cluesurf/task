import { CipherContent } from '~/code/type/shared/cipher'

export const CIPHER_CONTENT: CipherContent = {
  aes_ecb: {
    head: 'AES-ECB',
  },
  aes_cbc: {
    head: 'AES-CBC',
  },
  aes_cfb: {
    head: 'AES-CFB',
  },
  aes_ofb: {
    head: 'AES-OFB',
  },
  aes_ctr: {
    head: 'AES-CTR',
  },
  aes_gcm: {
    head: 'AES-GCM',
  },
  '3_des_ecb': {
    head: '3DES-ECB',
  },
  '3_des_cbc': {
    head: '3DES-CBC',
  },
  des_ecb: {
    head: 'DES-ECB',
  },
  des_cbc: {
    head: 'DES-CBC',
  },
}
