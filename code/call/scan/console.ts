import type { CommandModule } from 'yargs'
import { registerGroupHelp, registerHelp } from '~/code/tool/node/log/registry'
import { scanEnvConsole } from './env/console'
import { scanSshConsole } from './ssh/console'

registerGroupHelp({
  command: 'task scan',
  describe: 'CVE / SBOM / secret / network / SSH probes (trivy, grype, osv, gitleaks, syft, nmap, ssh-keyscan)',
  commands: [
    { name: 'image',      describe: 'Container image CVE scan (trivy / grype)' },
    { name: 'filesystem', describe: 'Source-code / lockfile CVE scan (trivy / osv)' },
    { name: 'host',       describe: 'Local OS package CVE scan (trivy rootfs)' },
    { name: 'secrets',    describe: 'Leaked credentials in a repo (gitleaks / trufflehog)' },
    { name: 'env',        describe: 'Leaked secrets in env files / source / git history' },
    { name: 'sbom',       describe: 'Generate a software bill of materials (syft / trivy)' },
    { name: 'network',    describe: 'Port + service scan (nmap, private subnets only by default)' },
    { name: 'ssh',        describe: 'SSH host-key fingerprint probe (ssh-keyscan)' },
  ],
})

const COMMON = [
  { long: 'tool',           describe: 'Backend override' },
  { long: 'severity',       describe: 'low | medium | high | critical' },
  { long: 'format',         describe: 'table | json | sarif | cyclonedx | spdx' },
  { long: 'output', short: 'o', describe: 'Write report to file' },
  { long: 'ignore-unfixed', describe: 'Skip CVEs with no available fix' },
]

registerHelp({
  command: 'task scan image',
  describe: 'Container image CVE scan (trivy / grype)',
  options: COMMON,
  examples: [
    { comment: 'default trivy',     command: 'task scan image myapp:latest' },
    { comment: 'critical only',     command: 'task scan image myapp:latest --severity critical' },
    { comment: 'sarif for github',  command: 'task scan image myapp:1.0 --format sarif -o trivy.sarif' },
  ],
})

registerHelp({
  command: 'task scan filesystem',
  describe: 'Source / lockfile CVE scan',
  options: COMMON,
  examples: [
    { comment: 'current dir',     command: 'task scan filesystem .' },
    { comment: 'osv-scanner',     command: 'task scan filesystem . --tool osv' },
  ],
})

registerHelp({
  command: 'task scan host',
  describe: 'Local OS package CVE scan',
  options: COMMON,
  examples: [
    { comment: 'whole rootfs', command: 'task scan host' },
  ],
})

registerHelp({
  command: 'task scan secrets',
  describe: 'Find leaked credentials',
  options: COMMON,
  examples: [
    { comment: 'gitleaks',    command: 'task scan secrets .' },
    { comment: 'trufflehog',  command: 'task scan secrets . --tool trufflehog' },
  ],
})

registerHelp({
  command: 'task scan sbom',
  describe: 'Generate a software bill of materials',
  options: COMMON,
  examples: [
    { comment: 'cyclonedx for image', command: 'task scan sbom myapp:latest --format cyclonedx -o sbom.json' },
    { comment: 'spdx for folder',     command: 'task scan sbom ./ --format spdx -o sbom.json' },
  ],
})

registerHelp({
  command: 'task scan network',
  describe: 'Port + service scan (nmap). Refuses non-private targets without --i-accept-responsibility.',
  options: [
    { long: 'scan-type',                describe: 'fast | connect | syn | service | os | vuln' },
    { long: 'ports',         short: 'p',describe: 'Port spec ("22,80,443" or "1-1024")' },
    { long: 'output',        short: 'o',describe: 'Write report to file' },
    { long: 'i-accept-responsibility',  describe: 'Required for non-private targets' },
  ],
  examples: [
    { comment: 'home LAN fast scan',    command: 'task scan network 192.168.1.0/24' },
    { comment: 'specific ports',        command: 'task scan network 192.168.1.10 -p 22,80,443' },
    { comment: 'service detect',        command: 'task scan network 10.0.0.5 --scan-type service' },
    { comment: 'vuln NSE scripts',      command: 'task scan network 10.0.0.5 --scan-type vuln' },
  ],
})

const imageCmd: CommandModule = {
  command: 'image <image>',
  describe: 'Container image CVE scan',
  builder: y => y.positional('image', { type: 'string' })
    .option('tool', { type: 'string', choices: ['trivy', 'grype'] as const })
    .option('severity', { type: 'string' })
    .option('format', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('ignore-unfixed', { type: 'boolean' })
    .option('extra', { type: 'array', string: true }),
  handler: async argv => {
    const { runScanImage } = await import('~/code/tool/node/scan/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = anyOf(argv, { image: argv.image as string })
    await runAction({ action: 'scan', input, run: () => runScanImage(input as never) })
  },
}

const fsCmd: CommandModule = {
  command: 'filesystem <path>',
  describe: 'Source / lockfile CVE scan',
  builder: y => y.positional('path', { type: 'string' })
    .option('tool', { type: 'string', choices: ['trivy', 'osv'] as const })
    .option('severity', { type: 'string' })
    .option('format', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('extra', { type: 'array', string: true }),
  handler: async argv => {
    const { runScanFilesystem } = await import('~/code/tool/node/scan/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = anyOf(argv, { path: argv.path as string })
    await runAction({ action: 'scan', input, run: () => runScanFilesystem(input as never) })
  },
}

const hostCmd: CommandModule = {
  command: 'host',
  describe: 'Local OS package CVE scan',
  builder: y => y.option('root', { type: 'string' })
    .option('severity', { type: 'string' })
    .option('format', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('extra', { type: 'array', string: true }),
  handler: async argv => {
    const { runScanHost } = await import('~/code/tool/node/scan/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = anyOf(argv, { root: argv.root as string | undefined })
    await runAction({ action: 'scan', input, run: () => runScanHost(input as never) })
  },
}

const secretsCmd: CommandModule = {
  command: 'secrets <path>',
  describe: 'Find leaked credentials',
  builder: y => y.positional('path', { type: 'string' })
    .option('tool', { type: 'string', choices: ['gitleaks', 'trufflehog'] as const })
    .option('format', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('extra', { type: 'array', string: true }),
  handler: async argv => {
    const { runScanSecrets } = await import('~/code/tool/node/scan/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = anyOf(argv, { path: argv.path as string })
    await runAction({ action: 'scan', input, run: () => runScanSecrets(input as never) })
  },
}

const sbomCmd: CommandModule = {
  command: 'sbom <input>',
  describe: 'Generate a software bill of materials',
  builder: y => y.positional('input', { type: 'string' })
    .option('tool', { type: 'string', choices: ['syft', 'trivy'] as const })
    .option('format', { type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('extra', { type: 'array', string: true }),
  handler: async argv => {
    const { runScanSbom } = await import('~/code/tool/node/scan/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = anyOf(argv, { input: argv.input as string })
    await runAction({ action: 'scan', input, run: () => runScanSbom(input as never) })
  },
}

const networkCmd: CommandModule = {
  command: 'network <target>',
  describe: 'Port + service scan',
  builder: y => y.positional('target', { type: 'string' })
    .option('scan-type', { type: 'string', choices: ['fast','connect','syn','service','os','vuln'] as const })
    .option('ports', { alias: 'p', type: 'string' })
    .option('output', { alias: 'o', type: 'string' })
    .option('i-accept-responsibility', { type: 'boolean' }),
  handler: async argv => {
    const { runScanNetwork } = await import('~/code/tool/node/scan/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      target: argv.target as string,
      scanType: argv['scan-type'] as 'fast'|'connect'|'syn'|'service'|'os'|'vuln'|undefined,
      ports: argv.ports as string | undefined,
      output: argv.output as string | undefined,
      iAcceptResponsibility: argv['i-accept-responsibility'] as boolean | undefined,
    }
    await runAction({ action: 'scan', input: input as unknown as Record<string, unknown>, run: () => runScanNetwork(input) })
  },
}

function anyOf(argv: Record<string, unknown>, base: Record<string, unknown>): Record<string, unknown> {
  return {
    ...base,
    tool: argv.tool,
    severity: argv.severity,
    format: argv.format,
    output: argv.output,
    ignoreUnfixed: argv['ignore-unfixed'],
    extra: argv.extra,
  }
}

export const scanConsole: CommandModule = {
  command: 'scan <thing>',
  describe: 'CVE / SBOM / secret / network / SSH probes',
  builder: y => y
    .command(imageCmd)
    .command(fsCmd)
    .command(hostCmd)
    .command(secretsCmd)
    .command(sbomCmd)
    .command(networkCmd)
    .command(scanEnvConsole)
    .command(scanSshConsole)
    .demandCommand(1, 'Specify a scan type'),
  handler: () => {},
}
