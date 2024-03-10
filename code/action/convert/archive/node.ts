import archiver from 'archiver'
import fs from 'fs'
import {
  ConvertArchiveNodeInput,
  ConvertArchiveNodeInputResolver,
  ConvertArchiveNodeOutputResolver,
  ConvertArchiveNodeLocalInternalInput,
  ConvertArchiveNodeLocalExternalInput,
  ConvertArchiveNodeRemoteInput,
  ConvertArchiveNodeClientInputResolver,
  ExtractWithUnarchiverResolver,
  ArchiveResolver,
} from '~/code/type/node'
import { runCommandSequence } from '~/code/tool/node/command'
import {
  resolveInputForConvertLocalExternalNode,
  resolveInputForConvertLocalInternalNode,
  resolveInputForConvertRemoteNode,
} from '../tool/node'
import { extend } from '~/code/tool/shared/object'
import { buildRequestToConvert } from '../shared'
import { resolveWorkFileNode } from '~/code/tool/node/request'
import { NativeOptions } from '~/code/tool/shared/request'
import { buildCommandToExtractWithUnarchiver } from '../../extract/archive/command'
import {
  generateTemporaryDirectoryPath,
  removeDirectory,
} from '~/code/tool/node/file'
import _ from 'lodash'
import {
  buildCommandToArchiveWithRar,
  buildCommandToArchiveWithZip,
} from '../../archive/command'
import kink from '~/code/tool/shared/kink'
import { testConvertArchive } from './shared'

export async function convertArchiveNode(
  source: ConvertArchiveNodeInput,
  native?: NativeOptions,
) {
  const input = ConvertArchiveNodeInputResolver().parse(source)

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
  const clientInput = ConvertArchiveNodeClientInputResolver().parse(
    extend(input, { handle: 'client' }),
  )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertArchiveNodeOutputResolver().parse({
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
  const unarchiveInput = ExtractWithUnarchiverResolver().parse(
    _.merge(input, {
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

  const archiveInput = ArchiveResolver().parse(
    _.merge(input, {
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
