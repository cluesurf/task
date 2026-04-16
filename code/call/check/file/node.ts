import fs from 'node:fs/promises'

export type CheckFileNodeInput = {
  input: { file: { path: string } }
}

export type CheckFileNodeOutput = {
  file: { path: string }
  exists: boolean
  size: number
}

async function checkFileNode(
  source: CheckFileNodeInput,
): Promise<CheckFileNodeOutput> {
  const inputPath = source.input.file.path
  try {
    const stats = await fs.stat(inputPath)
    return {
      file: { path: inputPath },
      exists: true,
      size: stats.size,
    }
  } catch {
    throw new Error(`check file: "${inputPath}" does not exist or is not readable`)
  }
}

export default checkFileNode
export { checkFileNode }
