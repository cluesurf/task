import {
  FileContent,
  FileReaderEncoding,
} from '~/code/type/shared/index.js'

export async function readFileContentAsString(
  content: FileContent,
  encoding?: FileReaderEncoding,
) {
  if (content instanceof ArrayBuffer) {
    return await readBlobAsString(new Blob([content]), encoding)
  } else if (content instanceof Blob) {
    return await readBlobAsString(content, encoding)
  } else if (typeof content === 'string') {
    return Promise.resolve(content)
  }
}

export async function readBlobAsString(
  blob: Blob,
  encoding: FileReaderEncoding = 'utf-8',
) {
  const reader = new FileReader()

  return new Promise((res, rej) => {
    const handleLoad = () => {
      res(reader.result)
    }

    const handleError = e => {
      reader.removeEventListener('load', handleLoad)
      rej(e)
    }

    reader.addEventListener('load', handleLoad, false)
    reader.addEventListener('error', handleError, false)

    reader.readAsText(blob, encoding)
  })
}
