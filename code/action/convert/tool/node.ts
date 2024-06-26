import set from 'lodash/set'
import unset from 'lodash/unset'
import fsp from 'fs/promises'
import debug from '~/code/tool/shared/debug.js'
import {
  createStreamableFile,
  getFallbackFilePath,
  getScopeDirectory,
  readRemoteFileNode,
  resolveRemoteFile,
} from '~/code/tool/node/file.js'
import {
  parsePath,
  resolvePathRelativeToScope,
} from '~/code/tool/shared/file.js'
import { cloneOptions } from '~/code/tool/shared/object.js'
import {
  ResolveInputForConvertLocalExternal,
  ResolveInputForConvertLocalInternal,
  ResolveInputForConvertRemote,
} from '~/code/type/node/parser.js'
// import debug from '~/code/tool/shared/debug.js'

// https://www.npmjs.com/package/ftp

/**
 * 1. Convert local files into streams.
 * 2. Leave remote file links.
 * 3. Leave content.
 */

export async function resolveInputForConvertRemoteNode<
  T extends ResolveInputForConvertRemote,
>(input: T) {
  const through = cloneOptions(input)

  if ('path' in through.input.file) {
    const inputPath = parsePath(through.input.file.path)
    if (inputPath.type === 'file-uri') {
      const file = await createStreamableFile(inputPath.href)
      unset(through.input.file, ['path'])
      set(through.input.file, ['content'], file)
    }
  }

  if (!through.output.file?.path) {
    const scope = getScopeDirectory(input.pathScope)
    const outputPath = resolvePathRelativeToScope(
      await getFallbackFilePath(
        input.output.file?.path,
        scope,
        through.output.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }
  }

  return through as Omit<T, 'output'> & {
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}

/**
 * 1. Convert remote files into local files.
 * 2. Convert content to local files.
 * 3. Leave local file paths.
 */

export async function resolveInputForConvertLocalExternalNode<
  T extends ResolveInputForConvertLocalExternal,
>(input: T) {
  const through = cloneOptions(input)
  debug('resolveInputForConvertLocalExternalNode', through.input.file)

  if ('path' in through.input.file) {
    const inputPath = parsePath(through.input.file.path)
    switch (inputPath.type) {
      case 'https-uri':
      case 'http-uri': {
        const newInputPath = await resolveRemoteFile({
          path: inputPath.href,
          scope: getScopeDirectory(through.pathScope),
          extension: through.input.format,
        })
        set(through.input.file, ['path'], newInputPath)

        debug(
          'resolveInputForConvertLocalExternalNode input',
          newInputPath,
        )
        break
      }
    }
  }

  if ('content' in through.input.file) {
    // TODO: for the CLI.
  }

  if (!through.output.file?.path) {
    const scope = getScopeDirectory(input.pathScope)
    const outputPath = resolvePathRelativeToScope(
      await getFallbackFilePath(
        input.output.file?.path,
        scope,
        through.output.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }

    debug(
      'resolveInputForConvertLocalExternalNode output file',
      through.output.file,
    )
  }

  return through as Omit<T, 'output'> & {
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}

export async function resolveInputContentForConvertLocalExternalNode<
  T extends ResolveInputForConvertLocalExternal,
>(input: T) {
  const through = cloneOptions(input)
  debug(
    'resolveInputContentForConvertLocalExternalNode',
    through.input.file,
  )

  if ('path' in through.input.file) {
    const inputPath = parsePath(through.input.file.path)
    switch (inputPath.type) {
      case 'https-uri':
      case 'http-uri': {
        const content = await readRemoteFileNode(inputPath.href)
        unset(through.input.file, ['path'])
        set(through.input.file, ['content'], content)
        break
      }
    }
  }

  if (!through.output.file?.path) {
    const scope = getScopeDirectory(input.pathScope)
    const outputPath = resolvePathRelativeToScope(
      await getFallbackFilePath(
        input.output.file?.path,
        scope,
        through.output.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }

    debug(
      'resolveInputContentForConvertLocalExternalNode output file',
      through.output.file,
    )
  }

  return through as Omit<T, 'output' | 'input'> & {
    input: Omit<T['input'], 'file'> & { file: { content: ArrayBuffer } }
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}

export async function resolveInputForConvertLocalInternalNode<
  T extends ResolveInputForConvertLocalInternal,
>(input: T) {
  const through = cloneOptions(input)

  debug('resolveInputForConvertLocalInternalNode')
  if ('path' in through.input.file) {
    const inputPath = parsePath(through.input.file.path)
    switch (inputPath.type) {
      case 'https-uri':
      case 'http-uri': {
        const content = await readRemoteFileNode(inputPath.href)
        unset(through.input.file, ['path'])
        set(through.input.file, ['content'], content)
        break
      }
    }
  }

  if ('content' in through.input.file) {
    // TODO: for the CLI.
  }

  if (!through.output.file?.path) {
    const scope = getScopeDirectory(input.pathScope)
    const outputPath = resolvePathRelativeToScope(
      await getFallbackFilePath(
        input.output.file?.path,
        scope,
        through.output.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }
    debug(
      'resolveInputForConvertLocalInternalNode output',
      through.input.file,
    )
  }

  return through as Omit<T, 'output' | 'input'> & {
    input: Omit<T['input'], 'file'> & { file: { content: ArrayBuffer } }
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}

export async function resolveInputContentForConvertLocalInternalNode<
  T extends ResolveInputForConvertLocalInternal,
>(input: T) {
  const through = cloneOptions(input)

  if ('path' in through.input.file) {
    const inputPath = parsePath(through.input.file.path)
    switch (inputPath.type) {
      case 'https-uri':
      case 'http-uri': {
        const content = await readRemoteFileNode(inputPath.href)
        unset(through.input.file, ['path'])
        set(through.input.file, ['content'], content)
        break
      }
      case 'file-uri':
        const content = (await fsp.readFile(inputPath.href, null))
          .buffer
        unset(through.input.file, ['path'])
        set(through.input.file, ['content'], content)
        break
    }
  }

  if (!through.output.file?.path) {
    const scope = getScopeDirectory(input.pathScope)
    const outputPath = resolvePathRelativeToScope(
      await getFallbackFilePath(
        input.output.file?.path,
        scope,
        through.output.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }
    debug(
      'resolveInputForConvertLocalInternalNode output',
      through.input.file,
    )
  }

  return through as Omit<T, 'output'> & {
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}
