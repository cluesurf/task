import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task fetch',
  describe: 'Download URLs (wget / curl / aria2c abstraction)',
  options: [
    { long: 'output',       short: 'o', describe: 'Write a single URL to this path' },
    { long: 'into',                     describe: 'Download into this directory' },
    { long: 'name',                     describe: 'Rename output (supports templates)' },
    { long: 'recursive',                describe: 'Crawl links' },
    { long: 'depth',                    describe: 'Max recursion depth' },
    { long: 'mirror',                   describe: 'Full site mirror (implies recursive)' },
    { long: 'include',                  describe: 'Only include paths matching pattern' },
    { long: 'exclude',                  describe: 'Exclude paths matching pattern' },
    { long: 'retry',                    describe: 'Retry attempts (default 3)' },
    { long: 'timeout',                  describe: 'Request timeout (ms)' },
    { long: 'resume',                   describe: 'Continue partial download' },
    { long: 'rate',                     describe: 'Limit speed (e.g. 500k, 2m)' },
    { long: 'concurrency',              describe: 'Parallel connections (routes via aria2c)' },
    { long: 'header',                   describe: 'Custom header (repeatable)' },
    { long: 'cookie',                   describe: 'Cookie file or string' },
    { long: 'auth',                     describe: 'Basic auth user:pass' },
    { long: 'token',                    describe: 'Bearer token (auto header)' },
    { long: 'agent',                    describe: 'Custom User-Agent' },
    { long: 'random-agent',             describe: 'Rotate common User-Agents' },
    { long: 'referer',                  describe: 'Set Referer' },
    { long: 'origin',                   describe: 'Set Origin' },
    { long: 'type',                     describe: 'Filter by file type (e.g. pdf,jpg)' },
    { long: 'pipe',                     describe: 'Stream to stdout instead of file' },
    { long: 'flatten',                  describe: 'Ignore directory structure (mirror mode)' },
    { long: 'dry-run',                  describe: 'Print the underlying command, do not run' },
    { long: 'verbose',                  describe: 'Detailed logs' },
    { long: 'quiet',      short: 'q',   describe: 'Minimal output' },
  ],
  examples: [
    { comment: 'single file',    command: 'task fetch https://example.com/file.pdf -o file.pdf' },
    { comment: 'into a folder',  command: 'task fetch https://example.com/a.zip https://example.com/b.zip --into downloads' },
    { comment: 'mirror a site',  command: 'task fetch https://example.com --mirror --into site/' },
    { comment: 'parallel (aria2c)', command: 'task fetch https://host/big.iso --concurrency 8' },
    { comment: 'with auth + header', command: 'task fetch https://api.example.com/data --token $TOKEN -H "Accept: application/json"' },
    { comment: 'pipe to jq',     command: 'task fetch https://api.github.com --pipe | jq .' },
  ],
})

export const fetchConsole: CommandModule = {
  command: 'fetch <url..>',
  describe: 'Download URLs (wget / curl / aria2c abstraction)',
  builder: y =>
    y
      .positional('url', { type: 'string', array: true, describe: 'One or more URLs' })
      .option('output',       { alias: 'o', type: 'string' })
      .option('into',         { type: 'string' })
      .option('name',         { type: 'string' })
      .option('recursive',    { type: 'boolean' })
      .option('depth',        { type: 'number' })
      .option('mirror',       { type: 'boolean' })
      .option('include',      { type: 'array', string: true })
      .option('exclude',      { type: 'array', string: true })
      .option('retry',        { type: 'number' })
      .option('timeout',      { type: 'number' })
      .option('resume',       { type: 'boolean' })
      .option('rate',         { type: 'string' })
      .option('concurrency',  { type: 'number' })
      .option('header',       { alias: 'H', type: 'array', string: true })
      .option('cookie',       { type: 'string' })
      .option('auth',         { type: 'string' })
      .option('token',        { type: 'string' })
      .option('agent',        { type: 'string' })
      .option('random-agent', { type: 'boolean' })
      .option('referer',      { type: 'string' })
      .option('origin',       { type: 'string' })
      .option('type',         { type: 'string' })
      .option('size',         { type: 'string' })
      .option('match',        { type: 'string' })
      .option('extract',      { type: 'boolean' })
      .option('format',       { type: 'string' })
      .option('pipe',         { type: 'boolean' })
      .option('sync',         { type: 'boolean' })
      .option('flatten',      { type: 'boolean' })
      .option('index',        { type: 'boolean' })
      .option('dry-run',      { type: 'boolean' })
      .option('verbose',      { type: 'boolean' })
      .option('quiet',        { alias: 'q', type: 'boolean' }),
  handler: async argv => {
    const { fetchNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    const input = {
      urls: (argv.url as string[]) ?? [],
      output: argv.output as string | undefined,
      into: argv.into as string | undefined,
      name: argv.name as string | undefined,
      recursive: argv.recursive as boolean | undefined,
      depth: argv.depth as number | undefined,
      mirror: argv.mirror as boolean | undefined,
      include: argv.include as string[] | undefined,
      exclude: argv.exclude as string[] | undefined,
      retry: argv.retry as number | undefined,
      timeout: argv.timeout as number | undefined,
      resume: argv.resume as boolean | undefined,
      rate: argv.rate as string | undefined,
      concurrency: argv.concurrency as number | undefined,
      header: argv.header as string[] | undefined,
      cookie: argv.cookie as string | undefined,
      auth: argv.auth as string | undefined,
      token: argv.token as string | undefined,
      agent: argv.agent as string | undefined,
      randomAgent: argv['random-agent'] as boolean | undefined,
      referer: argv.referer as string | undefined,
      origin: argv.origin as string | undefined,
      type: argv.type as string | undefined,
      size: argv.size as string | undefined,
      match: argv.match as string | undefined,
      extract: argv.extract as boolean | undefined,
      format: argv.format as string | undefined,
      pipe: argv.pipe as boolean | undefined,
      sync: argv.sync as boolean | undefined,
      flatten: argv.flatten as boolean | undefined,
      index: argv.index as boolean | undefined,
      dryRun: argv['dry-run'] as boolean | undefined,
      verbose: argv.verbose as boolean | undefined,
      quiet: argv.quiet as boolean | undefined,
    }
    await runAction({
      action: 'fetch',
      input: input as unknown as Record<string, unknown>,
      run: () => fetchNode(input),
    })
  },
}
