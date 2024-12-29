import archiver from 'archiver'
import fs from 'fs'
import {
  ConvertArchiveNodeInput,
  ConvertArchiveNodeInputParser,
  ConvertArchiveNodeOutputParser,
  ConvertArchiveNodeLocalInternalInput,
  ConvertArchiveNodeLocalExternalInput,
  ConvertArchiveNodeRemoteInput,
  ConvertArchiveNodeClientInputParser,
  ExtractWithUnarchiverParser,
  ArchiveParser,
} from '~/code/type/node/parser.js'
import { runCommandSequence } from '~/code/tool/node/command.js'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../tool/node.js'
import { extend } from '~/code/tool/shared/object.js'
import { buildRequestToConvert } from '../shared.js'
import { resolveWorkFileNode } from '~/code/tool/node/request.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import { buildCommandToExtractWithUnarchiver } from '../../extract/archive/command.js'
import {
  generateTemporaryDirectoryPath,
  removeDirectory,
} from '~/code/tool/node/file.js'
import merge from 'lodash/merge.js'
import { buildCommandToArchiveWithRar } from '../../archive/command.js'
import kink from '~/code/tool/shared/kink.js'
import { testConvertArchive } from './shared.js'

export async function convertArchiveNode(
  source: ConvertArchiveNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertArchiveNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertArchiveNodeRemote(input, native)
    case 'external':
      return await convertArchiveNodeLocalExternal(input, native)
    default:
      return await convertArchiveNodeLocalInternal(input, native)
  }
}

async function convertArchiveNodeLocalExternal(
  source: ConvertArchiveNodeLocalExternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalExternalNode(source)
  return await convertArchiveNodeLocal(input, native)
}

async function convertArchiveNodeLocalInternal(
  source: ConvertArchiveNodeLocalInternalInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertLocalInternalNode(source)
  return await convertArchiveNodeLocal(input, native)
}

export async function convertArchiveNodeRemote(
  source: ConvertArchiveNodeRemoteInput,
  native?: NativeOptions,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput = ConvertArchiveNodeClientInputParser().parse(
    extend(input, { handle: 'client' }),
  )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertArchiveNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertArchiveNodeLocal(
  input,
  native?: NativeOptions,
) {
  const onUpdate = native?.onUpdate

  const directory = await generateTemporaryDirectoryPath()
  const unarchiveInput = ExtractWithUnarchiverParser().parse(
    merge(input, {
      output: {
        directory: {
          path: directory,
        },
      },
    }),
  )

  const unarchiveSequence =
    await buildCommandToExtractWithUnarchiver(unarchiveInput)
  await runCommandSequence(unarchiveSequence)

  const archiveInput = ArchiveParser().parse(
    merge(input, {
      input: {
        path: directory,
      },
    }),
  )

  switch (archiveInput.output.format) {
    case 'zip': {
      await archiveWithArchiver(
        archiveInput.input.path,
        archiveInput.output.file.path,
      )
      break
    }
    case 'rar': {
      const archiveSequence =
        await buildCommandToArchiveWithRar(archiveInput)
      await runCommandSequence(archiveSequence)
      break
    }
    default:
      throw kink('task_not_implemented')
  }

  await removeDirectory(directory)

  return {
    file: {
      path: archiveInput.output.file.path,
    },
  }
}

export function testConvertArchiveNode(
  input: any,
): input is ConvertArchiveNodeInput {
  return testConvertArchive(input)
}

export function archiveWithArchiver(
  sourceDir: string,
  outPath: string,
) {
  const archive = archiver('zip', { zlib: { level: 9 } })
  const stream = fs.createWriteStream(outPath)

  return new Promise<void>((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)

    stream.on('close', () => resolve())
    archive.finalize()
  })
}
