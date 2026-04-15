/**
 * Pure command builders for the `task container` verb family.
 * No I/O, no spawn — every export returns `{ bin, args, install }`.
 * The Node-side runner at `~/code/tool/node/container/base` shells
 * them out via `spawn`.
 */

export type ContainerCommand = {
  bin: string
  args: string[]
  install: string
}

const INSTALL = {
  docker: 'install Docker Desktop / OrbStack / colima',
  pack:   'brew install buildpacks/tap/pack  /  https://buildpacks.io/docs/install-pack',
  trivy:  'brew install trivy',
  grype:  'brew install grype  /  curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh',
  dive:   'brew install dive  /  https://github.com/wagoodman/dive#installation',
}

// ---- build ------------------------------------------------------

export type BuildOptions = {
  context: string
  tag: string
  dockerfile?: string
  /** When `true`, force buildpacks via `pack build` even if a
   * Dockerfile exists. When `false`, force `docker build`. When
   * absent, auto-detect (use Dockerfile if present, else pack). */
  buildpacks?: boolean
  builder?: string         // pack builder image
  platform?: string        // linux/amd64 etc.
  push?: boolean
  noCache?: boolean
  target?: string          // multi-stage target
  buildArg?: string[]      // KEY=VALUE
  extra?: string[]
}

export function buildDockerBuildCommand(o: BuildOptions): ContainerCommand {
  const args = ['build']
  if (o.dockerfile) args.push('-f', o.dockerfile)
  if (o.platform) args.push('--platform', o.platform)
  if (o.target) args.push('--target', o.target)
  if (o.noCache) args.push('--no-cache')
  if (o.push) args.push('--push')
  for (const ba of o.buildArg ?? []) args.push('--build-arg', ba)
  args.push('-t', o.tag)
  args.push(...(o.extra ?? []), o.context)
  return { bin: 'docker', args, install: INSTALL.docker }
}

export function buildPackBuildCommand(o: BuildOptions): ContainerCommand {
  // `pack build <tag> --path <ctx> --builder <builder>`. Default
  // builder is paketo for jvm/node/python/go autodetect.
  const args = ['build', o.tag, '--path', o.context]
  args.push('--builder', o.builder ?? 'paketobuildpacks/builder-jammy-base')
  if (o.platform) args.push('--platform', o.platform)
  if (o.push) args.push('--publish')
  if (o.noCache) args.push('--clear-cache')
  for (const ba of o.buildArg ?? []) args.push('--env', ba)
  args.push(...(o.extra ?? []))
  return { bin: 'pack', args, install: INSTALL.pack }
}

// ---- scan -------------------------------------------------------

export type ScanOptions = {
  image: string
  tool?: 'trivy' | 'grype'
  severity?: 'unknown' | 'low' | 'medium' | 'high' | 'critical'
  format?: 'table' | 'json' | 'sarif' | 'cyclonedx'
  output?: string
  ignoreUnfixed?: boolean
  extra?: string[]
}

export function buildScanCommand(o: ScanOptions): ContainerCommand {
  const tool = o.tool ?? 'trivy'
  if (tool === 'trivy') {
    const args = ['image']
    if (o.severity) args.push('--severity', o.severity.toUpperCase())
    if (o.format)   args.push('--format', o.format)
    if (o.output)   args.push('--output', o.output)
    if (o.ignoreUnfixed) args.push('--ignore-unfixed')
    args.push(...(o.extra ?? []), o.image)
    return { bin: 'trivy', args, install: INSTALL.trivy }
  }
  // grype
  const args: string[] = []
  if (o.format) args.push('-o', o.format === 'sarif' ? 'sarif' : o.format)
  if (o.output) args.push('--file', o.output)
  if (o.ignoreUnfixed) args.push('--only-fixed')
  if (o.severity) args.push('--fail-on', o.severity.toLowerCase())
  args.push(...(o.extra ?? []), o.image)
  return { bin: 'grype', args, install: INSTALL.grype }
}

// ---- size -------------------------------------------------------

export type SizeOptions = {
  image: string
  /** CI mode: dive --ci → no TUI, pass/fail based on layer waste. */
  ci?: boolean
  /** Threshold for highest-layer waste % (default 10). */
  highestWasted?: number
  extra?: string[]
}

export function buildSizeCommand(o: SizeOptions): ContainerCommand {
  const args: string[] = []
  if (o.ci) {
    args.push('--ci')
    if (o.highestWasted != null) {
      args.push('--highestUserWastedPercent', String(o.highestWasted / 100))
    }
  }
  args.push(...(o.extra ?? []), o.image)
  return { bin: 'dive', args, install: INSTALL.dive }
}

// ---- shell ------------------------------------------------------

export type ShellOptions = {
  image: string
  /** Specific shell to try first. `auto` (default) tries bash → sh. */
  shell?: 'bash' | 'sh' | 'zsh' | 'fish' | 'auto'
  /** User to drop into inside the container. */
  user?: string
  workdir?: string
  /** Mount the host cwd at this path (great for poking at code). */
  mountCwd?: string
  /** Network mode passthrough. */
  network?: string
  env?: string[]
  extra?: string[]
}

export function buildShellCommand(o: ShellOptions): ContainerCommand {
  const args = ['run', '--rm', '-it']
  if (o.user)    args.push('--user', o.user)
  if (o.workdir) args.push('--workdir', o.workdir)
  if (o.mountCwd) args.push('-v', `${process.cwd()}:${o.mountCwd}`)
  if (o.network) args.push('--network', o.network)
  for (const e of o.env ?? []) args.push('-e', e)
  args.push(...(o.extra ?? []))
  args.push(o.image)
  // `auto` → fall back to sh if bash not present in the image.
  // Wrapped in `sh -c` so the fallback works without invoking
  // a separate shell-detect step on the host.
  if (!o.shell || o.shell === 'auto') {
    args.push('sh', '-c', 'command -v bash >/dev/null && exec bash || exec sh')
  } else {
    args.push(o.shell)
  }
  return { bin: 'docker', args, install: INSTALL.docker }
}

// ---- clean ------------------------------------------------------

export type CleanOptions = {
  /** Also nuke volumes (default false — destructive). */
  volumes?: boolean
  /** Drop everything, even tagged images. Default keeps tagged. */
  all?: boolean
  /** Skip the disk-usage before/after probe (faster for CI). */
  noStats?: boolean
}

export function buildCleanCommand(o: CleanOptions): ContainerCommand {
  const args = ['system', 'prune', '-f']
  if (o.all) args.push('-a')
  if (o.volumes) args.push('--volumes')
  return { bin: 'docker', args, install: INSTALL.docker }
}

export function buildDiskUsageCommand(): ContainerCommand {
  return {
    bin: 'docker',
    args: ['system', 'df', '--format', 'json'],
    install: INSTALL.docker,
  }
}

// ---- helpers ----------------------------------------------------

export function buildDockerfileExistsCheck(context: string): {
  paths: string[]
} {
  // Conventional names docker tries by default.
  return {
    paths: [`${context}/Dockerfile`, `${context}/dockerfile`, `${context}/Containerfile`],
  }
}
