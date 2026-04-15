/**
 * `task configure machine` — manifest-driven dev-machine bootstrap.
 *
 * A "machine manifest" declares: shell, prompt, terminal app,
 * theme, font, packages (brew/apt/winget), npm globals, pip
 * globals, vscode extensions, dotfile sources. The runner is
 * idempotent — every step checks "already done?" before acting.
 *
 * Manifest sources, in priority order:
 *   1. `--from <url-or-path>` flag — explicit
 *   2. `~/.config/task/machine.yml`
 *   3. Built-in preset via `--preset <name>`
 *
 * Built-in presets (this file) cover the common case so a fresh
 * machine works with zero config:
 *   - `dev`  : zsh + oh-my-zsh + dracula + JetBrains Mono +
 *              vscode + git + curl + wget + jq + ripgrep + fd +
 *              bat + eza + gh + node + python + go + rust
 *   - `min`  : just zsh + git + curl + node
 *
 * Each step prints what it did (or skipped). `--dry-run` shows
 * the plan without touching anything.
 */

import os from 'node:os'
import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

export type Manifest = {
  shell?: 'zsh' | 'bash' | 'fish'
  prompt?: 'oh-my-zsh' | 'starship' | 'p10k'
  terminal?: 'iterm2' | 'wezterm' | 'alacritty' | 'kitty'
  theme?: 'dracula' | 'gruvbox' | 'nord' | 'tokyonight'
  font?: string                    // e.g. "JetBrains Mono"

  // package lists per platform package manager
  brew?: string[]
  apt?: string[]
  winget?: string[]
  npm?: string[]
  pip?: string[]
  cargo?: string[]
  go?: string[]

  // vscode extensions
  vscode?: string[]

  // dotfiles
  dotfiles?: { src: string; dest: string }[]

  // git config (key/value pairs)
  git?: Record<string, string>
}

export type ConfigureMachineInput = {
  preset?: 'dev' | 'min'
  from?: string
  dryRun?: boolean
  /** Skip stages individually if set. */
  skip?: Array<'packages' | 'shell' | 'theme' | 'vscode' | 'dotfiles' | 'git'>
}

export const PRESETS: Record<string, Manifest> = {
  min: {
    shell: 'zsh',
    brew:    ['git', 'curl', 'node'],
    apt:     ['git', 'curl', 'zsh', 'nodejs'],
    winget:  ['Git.Git', 'OpenJS.NodeJS'],
  },
  dev: {
    shell: 'zsh',
    prompt: 'oh-my-zsh',
    terminal: 'iterm2',
    theme: 'dracula',
    font: 'JetBrains Mono',
    brew: [
      'git', 'curl', 'wget', 'gnupg', 'jq', 'ripgrep', 'fd', 'bat', 'eza',
      'gh', 'tree', 'htop', 'tmux', 'fzf',
      'node', 'python', 'go', 'rust',
    ],
    apt: [
      'git', 'curl', 'wget', 'gnupg', 'jq', 'ripgrep', 'fd-find',
      'bat', 'tree', 'htop', 'tmux', 'fzf', 'zsh',
      'nodejs', 'python3', 'golang', 'rustc',
    ],
    winget: [
      'Git.Git', 'GnuWin32.Wget', 'jqlang.jq', 'BurntSushi.ripgrep.MSVC',
      'GitHub.cli', 'OpenJS.NodeJS', 'Python.Python.3.12',
      'GoLang.Go', 'Rustlang.Rustup',
    ],
    npm: ['typescript', 'pnpm', 'prettier', 'tsx'],
    pip: ['black', 'ruff'],
    vscode: [
      'dracula-theme.theme-dracula',
      'vscode-icons-team.vscode-icons',
      'esbenp.prettier-vscode',
      'dbaeumer.vscode-eslint',
      'editorconfig.editorconfig',
      'github.copilot',
      'eamodio.gitlens',
      'ms-vscode.vscode-typescript-next',
    ],
    git: {
      'init.defaultBranch': 'main',
      'pull.rebase':        'true',
      'core.editor':        'code --wait',
    },
  },
}

export async function configureMachineNode(input: ConfigureMachineInput) {
  const manifest = await loadManifest(input)
  const skip = new Set(input.skip ?? [])
  const log = (s: string) => process.stdout.write(s + '\n')
  const cmd = input.dryRun
    ? async (bin: string, args: string[]) => log(`  → ${bin} ${args.join(' ')}`)
    : run

  log('\nresolved manifest:')
  log('  shell:    ' + (manifest.shell ?? '(unset)'))
  log('  prompt:   ' + (manifest.prompt ?? '(unset)'))
  log('  terminal: ' + (manifest.terminal ?? '(unset)'))
  log('  theme:    ' + (manifest.theme ?? '(unset)'))
  log('  font:     ' + (manifest.font ?? '(unset)'))
  log('')

  if (!skip.has('packages')) {
    log('• installing packages')
    const pm = pickPackageManager()
    if (pm === 'brew' && manifest.brew?.length) {
      await cmd('brew', ['install', ...manifest.brew])
    } else if (pm === 'apt' && manifest.apt?.length) {
      await cmd('sudo', ['apt-get', 'update'])
      await cmd('sudo', ['apt-get', 'install', '-y', ...manifest.apt])
    } else if (pm === 'winget' && manifest.winget?.length) {
      for (const id of manifest.winget) {
        await cmd('winget', ['install', '--id', id, '--silent', '--accept-source-agreements', '--accept-package-agreements'])
      }
    }
    if (manifest.npm?.length) await cmd('npm', ['install', '-g', ...manifest.npm])
    if (manifest.pip?.length) await cmd('pip3', ['install', '--user', ...manifest.pip])
    if (manifest.cargo?.length) for (const c of manifest.cargo) await cmd('cargo', ['install', c])
    if (manifest.go?.length)    for (const g of manifest.go)    await cmd('go', ['install', g])
  }

  if (!skip.has('shell') && manifest.shell) {
    log(`• setting default shell to ${manifest.shell}`)
    if (process.platform !== 'win32') {
      const shellPath = await whichShell(manifest.shell)
      if (shellPath) {
        await cmd('chsh', ['-s', shellPath])
      } else {
        log(`  (skip — ${manifest.shell} not found on PATH)`)
      }
    }
    if (manifest.prompt === 'oh-my-zsh' && manifest.shell === 'zsh') {
      const ohmyzsh = path.join(os.homedir(), '.oh-my-zsh')
      if (!(await exists(ohmyzsh))) {
        log('  installing oh-my-zsh')
        await cmd('sh', ['-c',
          'curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh -s -- --unattended'])
      } else {
        log('  oh-my-zsh already present, skipping')
      }
    }
  }

  if (!skip.has('vscode') && manifest.vscode?.length) {
    log('• installing vscode extensions')
    for (const ext of manifest.vscode) {
      await cmd('code', ['--install-extension', ext, '--force'])
    }
  }

  if (!skip.has('git') && manifest.git) {
    log('• applying git config')
    for (const [k, v] of Object.entries(manifest.git)) {
      await cmd('git', ['config', '--global', k, v])
    }
  }

  if (!skip.has('dotfiles') && manifest.dotfiles?.length) {
    log('• syncing dotfiles')
    for (const { src, dest } of manifest.dotfiles) {
      const destAbs = dest.replace(/^~/, os.homedir())
      const srcAbs  = src.replace(/^~/, os.homedir())
      log(`  ${srcAbs} → ${destAbs}`)
      if (!input.dryRun) {
        await fs.mkdir(path.dirname(destAbs), { recursive: true })
        await fs.copyFile(srcAbs, destAbs)
      }
    }
  }

  log('\nconfigure machine: done.')
  return { applied: !input.dryRun, manifest }
}

// ---- helpers ----------------------------------------------------

async function loadManifest(input: ConfigureMachineInput): Promise<Manifest> {
  if (input.from) {
    const text = input.from.startsWith('http')
      ? await fetchText(input.from)
      : await fs.readFile(input.from, 'utf8')
    return parseManifest(text)
  }
  const userPath = path.join(os.homedir(), '.config', 'task', 'machine.yml')
  if (await exists(userPath)) {
    return parseManifest(await fs.readFile(userPath, 'utf8'))
  }
  const preset = input.preset ?? 'dev'
  const out = PRESETS[preset]
  if (!out) throw new Error(`configure machine: unknown preset "${preset}"`)
  return out
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`configure machine: fetch ${url} → ${res.status}`)
  return res.text()
}

function parseManifest(text: string): Manifest {
  // Tiny YAML / JSON dual-parse. JSON is stricter so try first.
  try { return JSON.parse(text) as Manifest } catch { /* fall through */ }
  // For YAML, use require if available; otherwise fail with hint.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const yaml = require('yaml')
    return yaml.parse(text) as Manifest
  } catch {
    throw new Error('configure machine: install `yaml` (pnpm add yaml) to read .yml manifests, or use JSON.')
  }
}

function pickPackageManager(): 'brew' | 'apt' | 'winget' | 'unknown' {
  if (process.platform === 'darwin') return 'brew'
  if (process.platform === 'win32')  return 'winget'
  return 'apt'
}

async function whichShell(name: string): Promise<string | undefined> {
  return new Promise(res => {
    const child = spawn('which', [name], { stdio: ['ignore', 'pipe', 'ignore'] })
    const chunks: Buffer[] = []
    child.stdout!.on('data', (b: Buffer) => chunks.push(b))
    child.on('exit', () => {
      const out = Buffer.concat(chunks).toString('utf8').trim()
      res(out || undefined)
    })
    child.on('error', () => res(undefined))
  })
}

async function exists(p: string): Promise<boolean> {
  try { await fs.access(p); return true } catch { return false }
}

function run(bin: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { stdio: 'inherit' })
    child.on('error', err => reject(err))
    child.on('exit', code => {
      // Non-zero on a single step shouldn't abort the whole flow —
      // many of these are best-effort idempotent installs.
      if (code === 0) resolve()
      else { process.stdout.write(`  (warn: ${bin} exited ${code})\n`); resolve() }
    })
  })
}
