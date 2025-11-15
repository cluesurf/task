import pathParser from 'path'
import kink from './kink'

export type FileLink = {
  path: ParsePath
  link: Array<string>
}

export function addRemoteFilesToList(
  files: Array<FileLink>,
  input: string | Array<string>,
  link: Array<string>,
) {
  if (Array.isArray(input)) {
    input.forEach(path => {
      const parsed = parsePath(path)
      if (parsed.type.match(/http|ftp/)) {
        files.push({
          path: parsed,
          link,
        })
      }
    })
  } else {
    const parsed = parsePath(input)
    if (parsed.type.match(/http|ftp/)) {
      files.push({
        path: parsed,
        link,
      })
    }
  }
}

export function addLocalFilesToList(
  files: Array<FileLink>,
  input: string | Array<string>,
  link: Array<string>,
) {
  if (Array.isArray(input)) {
    input.forEach(path => {
      const parsed = parsePath(path)
      if (parsed.type === 'file-uri') {
        files.push({
          path: parsed,
          link,
        })
      }
    })
  } else {
    const parsed = parsePath(input)
    if (parsed.type === 'file-uri') {
      files.push({
        path: parsed,
        link,
      })
    }
  }
}

export function resolvePath(path: string) {
  return pathParser.resolve(path)
}

export function resolvePathRelativeToScope(
  child: string,
  parent?: string | undefined,
) {
  const resolvedChild = pathParser.resolve(child)

  if (!parent) {
    return resolvedChild
  }

  const resolvedParent = pathParser.resolve(parent)

  if (resolvedChild.indexOf(resolvedParent) === 0) {
    return resolvedChild
  }

  throw kink('invalid_file_access', { path: resolvedChild })
}

export const PATH_TYPE = [
  'https-uri',
  'http-uri',
  'ftps-uri',
  'ftp-uri',
  'file-uri',
  'file-path',
]

export type PathType = (typeof PATH_TYPE)[number]

export type ParsePath =
  | {
      type: 'file-uri'
      protocol: 'file:'
      href: string
    }
  | {
      type: Exclude<PathType, 'file-path'>
      protocol: string
      hostname?: string
      username?: string
      password?: string
      port?: number
      pathname?: string
      search?: string
      href: string
    }

export function parsePath(path: string): ParsePath {
  const type = getPathType(path)
  switch (type) {
    case 'file-path':
      return { type: 'file-uri', protocol: 'file:', href: path }
    case 'file-uri':
      return {
        type: 'file-uri',
        protocol: 'file:',
        href: path.slice('file://'.length),
      }
    default:
      const url = new URL(path)
      return {
        type,
        protocol: url.protocol,
        hostname: url.hostname,
        username: url.username ? url.username : undefined,
        password: url.password ? url.password : undefined,
        port: url.port ? parseInt(url.port, 10) : undefined,
        pathname: url.pathname ? url.pathname : undefined,
        search: url.search ? url.search : undefined,
        href: url.href,
      }
  }
}

export function getPathType(path: string): PathType {
  if (path.startsWith('https://')) {
    return 'https-uri'
  }
  if (path.startsWith('http://')) {
    return 'http-uri'
  }
  if (path.startsWith('ftps://')) {
    return 'ftps-uri'
  }
  if (path.startsWith('ftp://')) {
    return 'ftp-uri'
  }
  if (path.startsWith('file://')) {
    return 'file-uri'
  }
  if (path.match(/^\w+:\/\//)) {
    throw kink('invalid_path', { path })
  }
  return 'file-path'
}
