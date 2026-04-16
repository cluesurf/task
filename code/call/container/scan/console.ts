import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task container scan',
  describe: 'Scan an image for vulnerabilities (trivy or grype)',
  options: [
    { long: 'tool',                   describe: 'trivy (default) | grype' },
    { long: 'severity',               describe: 'unknown | low | medium | high | critical' },
    { long: 'format',                 describe: 'table (default) | json | sarif | cyclonedx' },
    { long: 'output',     short: 'o', describe: 'Write report to file (default: stdout)' },
    { long: 'ignore-unfixed',         describe: 'Skip CVEs with no available fix' },
  ],
  examples: [
    { comment: 'default trivy scan',     command: 'task container scan myapp:latest' },
    { comment: 'critical only',          command: 'task container scan myapp:latest --severity critical' },
    { comment: 'sarif for github code-scanning', command: 'task container scan myapp:1.0 --format sarif -o trivy.sarif' },
    { comment: 'use grype',              command: 'task container scan myapp:latest --tool grype' },
  ],
})

export const containerScanConsole: CommandModule = {
  command: 'scan <image>',
  describe: 'Scan an image for vulnerabilities',
  builder: y => y
    .positional('image', { type: 'string' })
    .option('tool',           { type: 'string', choices: ['trivy', 'grype'] as const })
    .option('severity',       { type: 'string', choices: ['unknown','low','medium','high','critical'] as const })
    .option('format',         { type: 'string', choices: ['table','json','sarif','cyclonedx'] as const })
    .option('output',         { alias: 'o', type: 'string' })
    .option('ignore-unfixed', { type: 'boolean' }),
  handler: async argv => {
    const { runScan } = await import('~/code/tool/node/container/make')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      image: argv.image as string,
      tool: argv.tool as 'trivy' | 'grype' | undefined,
      severity: argv.severity as 'unknown'|'low'|'medium'|'high'|'critical'|undefined,
      format: argv.format as 'table'|'json'|'sarif'|'cyclonedx'|undefined,
      output: argv.output as string | undefined,
      ignoreUnfixed: argv['ignore-unfixed'] as boolean | undefined,
    }
    await runAction({
      action: 'scan',
      input: input as unknown as Record<string, unknown>,
      run: () => runScan(input),
    })
  },
}
