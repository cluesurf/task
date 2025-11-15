import { execa } from 'execa'
import path from 'path'

export async function getGitBranch({
  directory,
}): Promise<string | null> {
  const gitDirectory = path.join(directory, '.git')
  try {
    const { stdout } = await execa('git', [
      'symbolic-ref',
      `--git-dir="${gitDirectory}"`,
      '--short',
      'HEAD',
    ])
    return stdout
  } catch {
    // Command will fail with code 1 if the HEAD is detached.
    return null
  }
}
