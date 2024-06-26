import { Form, Hash, List } from '@termsurf/form'
import murmurhash from 'murmurhash'
import forge from 'node-forge'
// https://github.com/vkandy/jenkins-hash-js/blob/master/src/jenkins.js
// npm install blake3-wasm

// https://en.wikipedia.org/wiki/List_of_hash_functions
// https://www.npmjs.com/package/node-hashes

export const cipher: List = {
  form: 'list',
  list: [
    'aes_ecb',
    'aes_cbc',
    'aes_cfb',
    'aes_ofb',
    'aes_ctr',
    'aes_gcm',
    '3_des_ecb',
    '3_des_cbc',
    'des_ecb',
    'des_cbc',
  ],
}

export const cipher_data: Form = {
  form: 'form',
  link: {
    head: { like: 'string' },
  },
}

export const cipher_content: Hash = {
  form: 'hash',
  file: 'cipher',
  link: 'cipher',
  bond: {
    like: 'cipher_data',
  },
  hash: {
    aes_ecb: { head: 'AES-ECB' },
    aes_cbc: { head: 'AES-CBC' },
    aes_cfb: { head: 'AES-CFB' },
    aes_ofb: { head: 'AES-OFB' },
    aes_ctr: { head: 'AES-CTR' },
    aes_gcm: { head: 'AES-GCM' },
    '3_des_ecb': { head: '3DES-ECB' },
    '3_des_cbc': { head: '3DES-CBC' },
    des_ecb: { head: 'DES-ECB' },
    des_cbc: { head: 'DES-CBC' },
  },
}

export const generate_murmur_hash: Form = {
  form: 'form',
  link: {
    input: { like: 'string' },
    seed: { like: 'integer' },
    version: {
      like: 'string',
      take: ['2', '3'],
      fall: '3',
      need: false,
    },
  },
}

// export function generateMurmurHash(source: GenerateMurmurHash) {
//   const { input, seed, version } = GenerateMurmurHashParser().parse(source)
//   if (version === '2') {
//     return murmurhash.v2(input, seed)
//   }
//   return murmurhash.v3(input, seed)
// }

// export const get_random_bytes = {
//   form: 'form',
//   link: {
//     size: { like: 'natural_number' },
//   },
// }

// // var key = forge.random.getBytesSync(16)
// // var iv = forge.random.getBytesSync(16)
// export async function getRandomBytes(source: GetRandomBytes) {
//   return new Promise((res, rej) => {
//     return forge.random.getBytes(
//       source.size,
//       (err: Error | null, bytes) => {
//         if (err) {
//           return rej(err)
//         }
//         return res(bytes)
//       },
//     )
//   })
// }

// export const encrypt_bytes_with_aes = {
//   form: 'form',
//   link: {
//     mode: { like: 'string' },
//   },
// }

// export async function encryptBytesWithAes(source: EncryptBytesWithAes) {
//   const cipher = forge.cipher.createCipher(`AES-${mode}`, key)
//   cipher.start({ iv: iv })
//   cipher.update(forge.util.createBuffer(input))
//   cipher.finish()
//   return cipher.output.bytes()
// }

// export async function decryptBytesWithAes() {
//   const decipher = forge.cipher.createDecipher(`AES-${mode}`, key)
//   decipher.start({ iv: iv })
//   decipher.update(input) // input == encryptedBytes
//   if (decipher.finish()) {
//     return decipher.output.bytes()
//   }
// }
