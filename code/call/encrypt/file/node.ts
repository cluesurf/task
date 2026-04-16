/**
 * `task encrypt file <in> -o <out>` — encrypts via age, openssl,
 * or gpg. Backend picked from `--tool` or output extension.
 */

import type { EncryptFileNodeLocalInput } from '~/code/form/action/encrypt/file/node'
import {
  EncryptFileNodeInputParser,
  EncryptFileNodeLocalInputParser,
  EncryptFileNodeOutputParser,
} from '~/code/form/action/encrypt/file/node/take'
import { createNodeHandler } from '~/code/tool/node/handler'
import {
  resolveExternalInput,
  resolveInternalInput,
} from '~/code/tool/node/resolve'
import { spawnAndWait } from '~/code/tool/node/spawn'
import { exec } from '~/code/tool/node/process'
import {
  pickEncryptTool,
  buildAgeEncryptCommand,
  buildOpensslEncryptCommand,
  buildGpgEncryptCommand,
} from './command'

async function runLocal(input: EncryptFileNodeLocalInput) {
  const inputPath = input.input.file.path
  const outputPath = input.output.file.path
  const tool = input.tool
    ? (input.tool as 'age' | 'openssl' | 'gpg')
    : pickEncryptTool(outputPath)

  switch (tool) {
    case 'age': {
      const cmd = buildAgeEncryptCommand({
        inputPath,
        outputPath,
        passphrase: input.passphrase,
        recipients: input.recipients,
      })
      if (cmd.stdin) {
        await spawnAndWait({
          verb: 'encrypt file',
          bin: cmd.bin,
          args: cmd.args,
          stdin: cmd.stdin,
          pipe: true,
        })
      } else {
        await exec([cmd.bin, ...cmd.args])
      }
      return { file: { path: outputPath } }
    }
    case 'openssl': {
      if (!input.passphrase) {
        throw new Error('openssl encrypt requires `passphrase`')
      }
      const cmd = buildOpensslEncryptCommand({
        inputPath,
        outputPath,
        passphrase: input.passphrase,
        cipher: input.cipher,
      })
      await exec([cmd.bin, ...cmd.args])
      return { file: { path: outputPath } }
    }
    case 'gpg': {
      const cmd = buildGpgEncryptCommand({
        inputPath,
        outputPath,
        passphrase: input.passphrase,
        recipients: input.recipients,
        armor: input.armor,
      })
      await exec([cmd.bin, ...cmd.args])
      return { file: { path: outputPath } }
    }
  }
}

const [encryptFileNode, testEncryptFileNode] = createNodeHandler({
  parsers: {
    input: EncryptFileNodeInputParser,
    local: EncryptFileNodeLocalInputParser,
    output: EncryptFileNodeOutputParser,
  },
  resolvers: {
    external: resolveExternalInput,
    internal: resolveInternalInput,
  },
  runLocal,
})

export { encryptFileNode, testEncryptFileNode }
