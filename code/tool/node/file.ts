import pathParser from 'path'
import fsp from 'fs/promises'
import fs from 'fs'
import { Readable } from 'stream'
import { ReadableStream as ReadableStreamWeb } from 'stream/web'
import tmp, { tmpName } from 'tmp-promise'
import { fetchWithTimeout } from '../shared/request'
import { FileLink } from '../shared/file'
import { tmpdir } from 'os'
import { getRandomId } from './id'

export async function resolveRemoteFile({
  path,
  scope,
  extension,
  signal,
}: {
  path: string
  scope: string
  extension: string
  signal?: AbortSignal
}) {
  const localPath = await generateFilePath(scope, extension)
  await saveRemoteFileNodeAndCleanupOnError(path, localPath, signal)
  return localPath
}

export async function createStreamableFile(
  path: string,
): Promise<File> {
  const name = pathParser.basename(path)
  const handle = await fsp.open(path)
  const { size } = await handle.stat()

  const file = new File([], name)
  file.stream = () => handle.readableWebStream() as ReadableStream

  // Set correct size otherwise, fetch will encounter UND_ERR_REQ_CONTENT_LENGTH_MISMATCH
  Object.defineProperty(file, 'size', { get: () => size })

  return file
}

export async function saveRemoteFileNode(
  remotePath: string,
  outputPath: string,
  signal?: AbortSignal,
) {
  return new Promise((res, rej) => {
    fetchWithTimeout(remotePath, { signal }).then(r => {
      if (r.body) {
        return Readable.fromWeb(r.body as ReadableStreamWeb<any>)
          .pipe(
            fs.createWriteStream(outputPath, {
              signal,
            }),
          )
          .on('error', rej)
          .on('close', () => res(outputPath))
      }
    })
  })
}

export async function readRemoteFileNode(
  remotePath: string,
  signal?: AbortSignal,
) {
  const r = await fetchWithTimeout(remotePath, { signal })
  const buffer = await r.arrayBuffer()
  return buffer
}

export async function saveRemoteFileNodeAndCleanupOnError(
  remotePath: string,
  outputPath: string,
  signal?: AbortSignal,
) {
  try {
    await saveRemoteFileNode(remotePath, outputPath, signal)
  } catch (e) {
    if (await fsp.stat(outputPath)) {
      await fsp.unlink(outputPath)
    }
    throw e
  }
}

export async function saveAllRemoteFilesLocally(
  files: Array<FileLink>,
  signal?: AbortSignal,
) {
  return Promise.all(
    files.map(async fileLink => {
      switch (fileLink.path.type) {
        case 'https-uri':
        case 'http-uri': {
          const tmpPath = await tmpName()
          return saveRemoteFileNodeAndCleanupOnError(
            fileLink.path.href,
            tmpPath,
            signal,
          )
        }
        case 'ftps-uri':
        case 'ftp-uri': {
        }
      }
    }),
  )
}

export function getScopeDirectory(possibility?: string) {
  return possibility ?? tmpdir()
}

export async function getFallbackFilePath(
  possibility: string | undefined,
  directory: string,
  extension?: string,
) {
  if (possibility) {
    return possibility
  }

  return await generateFilePath(directory, extension)
}

export async function generateTemporaryFilePath(extension?: string) {
  return generateFilePath(tmpdir(), extension)
}

export async function generateFilePath(
  directory: string,
  extension?: string,
) {
  const name = getRandomId(64)
  const fullName = extension ? `${name}.${extension}` : name
  const path = await tmpName({ tmpdir: directory, name: fullName })
  return path
}

export async function generateDirectoryPath(directory: string) {
  const name = getRandomId(64)
  const { path } = await tmp.dir({ tmpdir: directory, name })
  return path
}

export async function generateTemporaryDirectoryPath() {
  return await generateDirectoryPath(tmpdir())
}

export async function removeDirectory(path: string) {
  await fsp.rmdir(path, { recursive: true })
}
