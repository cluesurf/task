/**
 * Pure scan command builders. CVE / SBOM / secret / network scans
 * across trivy, grype, osv-scanner, gitleaks, nmap, etc.
 */

export type ScanCommand = { bin: string; args: string[]; install: string }

const INSTALL = {
  trivy:    'brew install trivy',
  grype:    'brew install grype',
  osv:      'brew install osv-scanner / go install github.com/google/osv-scanner/cmd/osv-scanner@latest',
  gitleaks: 'brew install gitleaks',
  trufflehog: 'brew install trufflehog',
  syft:     'brew install syft',
  nmap:     'brew install nmap / apt install nmap',
}

export type Severity = 'low' | 'medium' | 'high' | 'critical'
export type ScanFormat = 'table' | 'json' | 'sarif' | 'cyclonedx' | 'spdx'

type CommonOptions = {
  severity?: Severity
  format?: ScanFormat
  output?: string
  ignoreUnfixed?: boolean
  extra?: string[]
}

// ---- image scan (trivy / grype) ---------------------------------

export function buildScanImageCommand(o: CommonOptions & { image: string; tool?: 'trivy' | 'grype' }): ScanCommand {
  if ((o.tool ?? 'trivy') === 'trivy') {
    const args = ['image']
    if (o.severity) args.push('--severity', o.severity.toUpperCase())
    if (o.format)   args.push('--format', o.format)
    if (o.output)   args.push('--output', o.output)
    if (o.ignoreUnfixed) args.push('--ignore-unfixed')
    args.push(...(o.extra ?? []), o.image)
    return { bin: 'trivy', args, install: INSTALL.trivy }
  }
  const args: string[] = []
  if (o.format) args.push('-o', o.format)
  if (o.output) args.push('--file', o.output)
  if (o.severity) args.push('--fail-on', o.severity)
  args.push(...(o.extra ?? []), o.image)
  return { bin: 'grype', args, install: INSTALL.grype }
}

// ---- filesystem (source code) scan ------------------------------

export function buildScanFilesystemCommand(o: CommonOptions & { path: string; tool?: 'trivy' | 'osv' }): ScanCommand {
  if ((o.tool ?? 'trivy') === 'trivy') {
    const args = ['fs']
    if (o.severity) args.push('--severity', o.severity.toUpperCase())
    if (o.format)   args.push('--format', o.format)
    if (o.output)   args.push('--output', o.output)
    args.push(...(o.extra ?? []), o.path)
    return { bin: 'trivy', args, install: INSTALL.trivy }
  }
  // osv-scanner walks lockfiles transitively
  const args = ['-r']
  if (o.format === 'json') args.push('--format', 'json')
  if (o.format === 'sarif') args.push('--format', 'sarif')
  if (o.output) args.push('--output', o.output)
  args.push(...(o.extra ?? []), o.path)
  return { bin: 'osv-scanner', args, install: INSTALL.osv }
}

// ---- host (system packages on local OS) -------------------------

export function buildScanHostCommand(o: CommonOptions & { root?: string }): ScanCommand {
  const args = ['rootfs']
  if (o.severity) args.push('--severity', o.severity.toUpperCase())
  if (o.format)   args.push('--format', o.format)
  if (o.output)   args.push('--output', o.output)
  args.push(...(o.extra ?? []), o.root ?? '/')
  return { bin: 'trivy', args, install: INSTALL.trivy }
}

// ---- secrets ----------------------------------------------------

export function buildScanSecretsCommand(o: CommonOptions & { path: string; tool?: 'gitleaks' | 'trufflehog' }): ScanCommand {
  if ((o.tool ?? 'gitleaks') === 'gitleaks') {
    const args = ['detect', '--source', o.path, '--no-banner']
    if (o.format === 'json') args.push('--report-format', 'json')
    if (o.format === 'sarif') args.push('--report-format', 'sarif')
    if (o.output) args.push('--report-path', o.output)
    args.push(...(o.extra ?? []))
    return { bin: 'gitleaks', args, install: INSTALL.gitleaks }
  }
  const args = ['filesystem', o.path, '--no-update']
  if (o.format === 'json') args.push('--json')
  args.push(...(o.extra ?? []))
  return { bin: 'trufflehog', args, install: INSTALL.trufflehog }
}

// ---- sbom -------------------------------------------------------

export function buildScanSbomCommand(o: CommonOptions & { input: string; tool?: 'syft' | 'trivy' }): ScanCommand {
  if ((o.tool ?? 'syft') === 'syft') {
    const args = [o.input]
    if (o.format) args.push('-o', o.format === 'cyclonedx' ? 'cyclonedx-json' : o.format === 'spdx' ? 'spdx-json' : o.format)
    if (o.output) args.push('--file', o.output)
    args.push(...(o.extra ?? []))
    return { bin: 'syft', args, install: INSTALL.syft }
  }
  // trivy can also emit SBOMs
  const args = ['image', '--format', o.format ?? 'cyclonedx']
  if (o.output) args.push('--output', o.output)
  args.push(o.input)
  return { bin: 'trivy', args, install: INSTALL.trivy }
}

// ---- network (nmap, safety-gated to private subnets) ------------

export type NetworkScanOptions = {
  target: string                    // host / CIDR / range
  scanType?: 'fast' | 'connect' | 'syn' | 'service' | 'os' | 'vuln'
  ports?: string                    // "22,80,443" or "1-1024"
  output?: string
  /** Required: explicit user opt-in for non-private targets. */
  iAcceptResponsibility?: boolean
}

export function buildScanNetworkCommand(o: NetworkScanOptions): ScanCommand {
  if (!isPrivateTarget(o.target) && !o.iAcceptResponsibility) {
    throw new Error(
      `scan network: refusing to scan a non-private target "${o.target}". ` +
      `Port scanning a network you don't own is illegal in many jurisdictions. ` +
      `Re-run with --i-accept-responsibility if you have authorization to scan it.`,
    )
  }
  const args: string[] = []
  switch (o.scanType ?? 'fast') {
    case 'fast':    args.push('-T4', '-F'); break
    case 'connect': args.push('-sT'); break
    case 'syn':     args.push('-sS'); break       // requires sudo
    case 'service': args.push('-sV'); break
    case 'os':      args.push('-O'); break        // requires sudo
    case 'vuln':    args.push('--script', 'vuln'); break
  }
  if (o.ports)  args.push('-p', o.ports)
  if (o.output) args.push('-oN', o.output)
  args.push(o.target)
  return { bin: 'nmap', args, install: INSTALL.nmap }
}

function isPrivateTarget(t: string): boolean {
  // localhost / loopback / RFC1918 / link-local
  return (
    t === 'localhost' ||
    t === '127.0.0.1' ||
    t === '::1' ||
    /^10\./.test(t) ||
    /^192\.168\./.test(t) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(t) ||
    /^169\.254\./.test(t) ||
    /^fe80:/i.test(t)
  )
}
