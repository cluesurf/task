/**
 * `task decrypt file <in> -o <out>` — decrypts via age, openssl,
 * or gpg. Backend picked from `--tool` or input extension.
 */

import type { DecryptFileNodeLocalInput } from '~/code/form/action/decrypt/file/node'
import {
  DecryptFileNodeInputParser,
  DecryptFileNodeLocalInputParser,
  DecryptFileNodeOutputParser,
} from '~/code/form/action/decrypt/file/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import {
  pickDecryptTool,
  buildAgeDecryptCommand,
  buildOpensslDecryptCommand,
  buildGpgDecryptCommand,
} from './command'

async function runLocal(input: DecryptFileNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const tool = input.tool
    ? (input.tool as 'age' | 'openssl' | 'gpg')
    : pickDecryptTool(inputPath)

  switch (tool) {
    case 'age': {
      const cmd = buildAgeDecryptCommand({
        inputPath,
        outputPath,
        passphrase: input.passphrase,
        identity: input.identity,
      })
      if (cmd.stdin) {
        await spawnAndWait({
          verb: 'decrypt file',
          bin: cmd.bin,
          args: cmd.args,
          stdin: cmd.stdin,
          pipe: true,
        })
      } else {
        await spawnAndWait({ verb: 'decrypt file', bin: cmd.bin, args: cmd.args })
      }
      return { file: { path: outputPath } }
    }
    case 'openssl': {
      if (!input.passphrase) {
        throw new Error('openssl decrypt requires `passphrase`')
      }
      const cmd = buildOpensslDecryptCommand({
        inputPath,
        outputPath,
        passphrase: input.passphrase,
        cipher: input.cipher,
      })
      await spawnAndWait({ verb: 'decrypt file', bin: cmd.bin, args: cmd.args })
      return { file: { path: outputPath } }
    }
    case 'gpg': {
      const cmd = buildGpgDecryptCommand({
        inputPath,
        outputPath,
        passphrase: input.passphrase,
      })
      await spawnAndWait({ verb: 'decrypt file', bin: cmd.bin, args: cmd.args })
      return { file: { path: outputPath } }
    }
  }
}

const [decryptFileNode, testDecryptFileNode] = createNodeHandler({
  parsers: {
    input: DecryptFileNodeInputParser,
    local: DecryptFileNodeLocalInputParser,
    output: DecryptFileNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export default decryptFileNode
export { decryptFileNode, testDecryptFileNode }
