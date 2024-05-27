import { execa } from 'execa'
import path from 'path'

// git checks logic is from https://github.com/sindresorhus/np/blob/master/source/git-tasks.js

export async function checkIsGitRepo({ directory }): Promise<boolean> {
  const gitDirectory = path.join(directory, '.git')

  try {
    await execa('git', ['rev-parse', `--git-dir="${gitDirectory}"`])
  } catch {
    return false
  }
  return true
}

export async function checkIsGitWorkingTreeClean({
  directory,
}): Promise<boolean> {
  const gitDirectory = path.join(directory, '.git')

  try {
    const { stdout: status } = await execa('git', [
      'status',
      `--git-dir="${gitDirectory}"`,
      '--porcelain',
    ])
    if (status !== '') {
      return false
    }
    return true
  } catch {
    return false
  }
}

export async function checkIsGitRemoteHistoryClean({
  directory,
}): Promise<boolean> {
  const gitDirectory = path.join(directory, '.git')

  let history
  try {
    // Gracefully handle no remote set up.
    const { stdout } = await execa('git', [
      'rev-list',
      `--git-dir="${gitDirectory}"`,
      '--count',
      '--left-only',
      '@{u}...HEAD',
    ])
    history = stdout
  } catch {
    history = null
  }
  if (history && history !== '0') {
    return false
  }
  return true
}
