import * as forge from 'node-forge'
import {
  ForgeMessageDigest,
  GenerateHash,
  GenerateHashParser,
} from '~/code/type/shared/parser.js'

export function generateHash(source: GenerateHash) {
  const input = GenerateHashParser().parse(source)
  const digest = createMessageDigest({ class: input.class })
  updateMessageDigest(digest, { content: input.content })
  return stringifyMessageDigest(digest)
}

export function createMessageDigest(input: {
  class: ForgeMessageDigest
}) {
  switch (input.class) {
    case 'sha1':
      return forge.md.sha1.create()
    case 'sha256':
      return forge.md.sha256.create()
    case 'sha384':
      return forge.md.sha384.create()
    case 'sha512':
      return forge.md.sha512.create()
    case 'sha512/224':
      return forge.md.sha512.sha224.create()
    case 'sha512/256':
      return forge.md.sha512.sha256.create()
  }
}

export function updateMessageDigest(
  digest,
  { content }: { content: string | ArrayBuffer },
) {
  if (content instanceof ArrayBuffer) {
    digest.update(forge.util.createBuffer(content).toHex())
  } else {
    digest.update(content)
  }
}

export function stringifyMessageDigest(digest) {
  return digest.digest().toHex()
}
