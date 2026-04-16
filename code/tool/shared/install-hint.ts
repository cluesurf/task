/**
 * Cross-platform install hints for the native binaries the `task`
 * verbs shell out to. Each entry lists the package name per
 * package manager so the ENOENT hint doesn't end up with
 * macOS-only suggestions. Used by `code/tool/node/spawn.ts` when a
 * binary isn't on `PATH`.
 *
 * Keys are bare binary names as spawned (`ffmpeg`, `qpdf`,
 * `analyzeHeadless`). If a tool isn't listed here the hint will
 * just say "install it first".
 */

export type InstallHint = {
  /** Free-form description when no package-manager form applies. */
  note?: string
  brew?: string
  apt?: string
  dnf?: string
  pacman?: string
  choco?: string
  scoop?: string
  winget?: string
  pkg?: string
}

export const INSTALL_HINTS: Record<string, InstallHint> = {
  ffmpeg: {
    brew: 'ffmpeg',
    apt: 'ffmpeg',
    dnf: 'ffmpeg',
    pacman: 'ffmpeg',
    choco: 'ffmpeg',
    scoop: 'ffmpeg',
    winget: 'Gyan.FFmpeg',
  },
  qpdf: {
    brew: 'qpdf',
    apt: 'qpdf',
    dnf: 'qpdf',
    pacman: 'qpdf',
    choco: 'qpdf',
  },
  convert: {
    note: 'imagemagick',
    brew: 'imagemagick',
    apt: 'imagemagick',
    dnf: 'ImageMagick',
    pacman: 'imagemagick',
    choco: 'imagemagick',
  },
  mogrify: {
    note: 'imagemagick',
    brew: 'imagemagick',
    apt: 'imagemagick',
    dnf: 'ImageMagick',
    pacman: 'imagemagick',
    choco: 'imagemagick',
  },
  wasm2wat: {
    note: 'wabt',
    brew: 'wabt',
    apt: 'wabt',
    dnf: 'wabt',
    pacman: 'wabt',
    choco: 'wabt',
  },
  javap: {
    note: 'a JDK (OpenJDK)',
    brew: 'openjdk',
    apt: 'default-jdk',
    dnf: 'java-latest-openjdk-devel',
    pacman: 'jdk-openjdk',
    choco: 'openjdk',
    winget: 'EclipseAdoptium.Temurin.21.JDK',
  },
  ildasm: {
    note: 'the .NET SDK',
    brew: 'dotnet-sdk',
    apt: 'dotnet-sdk-8.0',
    dnf: 'dotnet-sdk-8.0',
    pacman: 'dotnet-sdk',
    choco: 'dotnet-sdk',
    winget: 'Microsoft.DotNet.SDK.8',
  },
  radare2: {
    brew: 'radare2',
    apt: 'radare2',
    dnf: 'radare2',
    pacman: 'radare2',
    choco: 'radare2',
  },
  rizin: {
    brew: 'rizin',
    apt: 'rizin',
    dnf: 'rizin',
    pacman: 'rizin',
  },
  analyzeHeadless: {
    note:
      'Ghidra (set GHIDRA_INSTALL_DIR or pass --ghidra-home after installing)',
    brew: 'ghidra',
    apt: 'ghidra',
    choco: 'ghidra',
  },
  curl: {
    brew: 'curl',
    apt: 'curl',
    dnf: 'curl',
    pacman: 'curl',
    choco: 'curl',
  },
  wget: {
    brew: 'wget',
    apt: 'wget',
    dnf: 'wget',
    pacman: 'wget',
    choco: 'wget',
  },
  aria2c: {
    note: 'aria2',
    brew: 'aria2',
    apt: 'aria2',
    dnf: 'aria2',
    pacman: 'aria2',
    choco: 'aria2',
  },
  rsync: {
    brew: 'rsync',
    apt: 'rsync',
    dnf: 'rsync',
    pacman: 'rsync',
    choco: 'rsync',
  },
  restic: {
    brew: 'restic',
    apt: 'restic',
    dnf: 'restic',
    pacman: 'restic',
    choco: 'restic',
  },
  borg: {
    brew: 'borgbackup',
    apt: 'borgbackup',
    dnf: 'borgbackup',
    pacman: 'borg',
  },
  kopia: {
    brew: 'kopia',
    winget: 'kopia.kopia',
  },
  exiftool: {
    brew: 'exiftool',
    apt: 'libimage-exiftool-perl',
    dnf: 'perl-Image-ExifTool',
    pacman: 'perl-image-exiftool',
    choco: 'exiftool',
  },
  kubectl: {
    brew: 'kubectl',
    apt: 'kubectl',
    dnf: 'kubectl',
    pacman: 'kubectl',
    choco: 'kubernetes-cli',
    winget: 'Kubernetes.kubectl',
  },
  doctl: {
    brew: 'doctl',
    apt: 'doctl',
    choco: 'doctl',
    scoop: 'doctl',
  },
  age: {
    brew: 'age',
    apt: 'age',
    dnf: 'age',
    pacman: 'age',
    choco: 'age.portable',
  },
  gpg: {
    brew: 'gnupg',
    apt: 'gnupg',
    dnf: 'gnupg2',
    pacman: 'gnupg',
    choco: 'gnupg',
  },
  hf: {
    note:
      'Hugging Face CLI — `pip install huggingface_hub[cli]` or `brew install huggingface-cli`',
    brew: 'huggingface-cli',
  },
}

/**
 * Render a cross-platform install suggestion for the given binary.
 * Lists every known package-manager form so a user on any supported
 * OS sees at least one line they can act on.
 */

export function formatInstallHint(bin: string): string | undefined {
  const hint = INSTALL_HINTS[bin]
  if (!hint) return undefined
  const parts: string[] = []
  if (hint.brew) parts.push(`macOS: brew install ${hint.brew}`)
  if (hint.apt) parts.push(`Debian/Ubuntu: apt install ${hint.apt}`)
  if (hint.dnf) parts.push(`Fedora: dnf install ${hint.dnf}`)
  if (hint.pacman) parts.push(`Arch: pacman -S ${hint.pacman}`)
  if (hint.choco) parts.push(`Windows (choco): choco install ${hint.choco}`)
  if (hint.scoop) parts.push(`Windows (scoop): scoop install ${hint.scoop}`)
  if (hint.winget) parts.push(`Windows (winget): winget install ${hint.winget}`)
  if (hint.pkg) parts.push(`FreeBSD: pkg install ${hint.pkg}`)
  if (parts.length === 0 && hint.note) return hint.note
  const header = hint.note ? `${hint.note}. ` : ''
  return header + parts.join('  •  ')
}
