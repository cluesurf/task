import fsp from 'fs/promises'
import set from 'lodash/set'
import unset from 'lodash/unset'
import {
  createStreamableFile,
  getFallbackFilePath,
  getScopeDirectory,
  readRemoteFileNode,
  resolveRemoteFile,
} from '~/code/tool/node/file'
import debug from '~/code/tool/shared/debug'
import {
  parsePath,
  resolvePathRelativeToScope,
} from '~/code/tool/shared/file'
import { cloneOptions } from '~/code/tool/shared/object'
import {
  ResolveInputForFormatLocalExternal,
  ResolveInputForFormatLocalInternal,
  ResolveInputForFormatRemote,
} from '~/code/type/shared'

/**
 * 1. Format local files into streams.
 * 2. Leave remote file links.
 * 3. Leave content.
 */

export async function resolveInputForFormatRemoteNode<
  T extends ResolveInputForFormatRemote,
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
        through.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }
  }

  return through as Omit<T, 'output'> & {
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}

export async function resolveInputForFormatLocalExternalNode<
  T extends ResolveInputForFormatLocalExternal,
>(input: T) {
  const through = cloneOptions(input)
  debug('resolveInputForFormatLocalExternalNode', through.input.file)

  if ('path' in through.input.file) {
    const inputPath = parsePath(through.input.file.path)
    switch (inputPath.type) {
      case 'https-uri':
      case 'http-uri': {
        const newInputPath = await resolveRemoteFile({
          path: inputPath.href,
          scope: getScopeDirectory(through.pathScope),
          extension: through.format,
        })
        set(through.input.file, ['path'], newInputPath)

        debug(
          'resolveInputForFormatLocalExternalNode input',
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
        through.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }

    debug(
      'resolveInputForFormatLocalExternalNode output file',
      through.output.file,
    )
  }

  return through as Omit<T, 'output'> & {
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}

export async function resolveInputContentForFormatLocalExternalNode<
  T extends ResolveInputForFormatLocalExternal,
>(input: T) {
  const through = cloneOptions(input)
  debug(
    'resolveInputContentForFormatLocalExternalNode',
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
        through.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }

    debug(
      'resolveInputContentForFormatLocalExternalNode output file',
      through.output.file,
    )
  }

  return through as Omit<T, 'output' | 'input'> & {
    input: Omit<T['input'], 'file'> & { file: { content: ArrayBuffer } }
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}

export async function resolveInputForFormatLocalInternalNode<
  T extends ResolveInputForFormatLocalInternal,
>(input: T) {
  const through = cloneOptions(input)

  debug('resolveInputForFormatLocalInternalNode')
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
        through.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }
    debug(
      'resolveInputForFormatLocalInternalNode output',
      through.input.file,
    )
  }

  return through as Omit<T, 'output' | 'input'> & {
    input: Omit<T['input'], 'file'> & { file: { content: ArrayBuffer } }
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}

export async function resolveInputContentForFormatLocalInternalNode<
  T extends ResolveInputForFormatLocalInternal,
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
        through.format,
      ),
      scope,
    )

    through.output.file = { path: outputPath }
    debug(
      'resolveInputForFormatLocalInternalNode output',
      through.input.file,
    )
  }

  return through as Omit<T, 'output'> & {
    output: Omit<T['output'], 'file'> & { file: { path: string } }
  }
}
