import type { CommandModule } from 'yargs'
import { registerHelp } from '~/code/tool/node/log/registry'

registerHelp({
  command: 'task parse html',
  describe: 'Extract tables / links / images / text from a URL or HTML file',
  options: [
    { long: 'output',   short: 'o', describe: 'Write to file instead of stdout' },
    { long: 'tables',               describe: 'Extract every <table> (default when no other flag set)' },
    { long: 'links',                describe: 'Extract every <a href>' },
    { long: 'images',               describe: 'Extract every <img src>' },
    { long: 'text',                 describe: 'Extract page text (script/style stripped)' },
    { long: 'table',                describe: 'Pick one table — index (0,1,2...) or CSS selector (#pricing)' },
    { long: 'clean',                describe: 'Trim whitespace, dedupe headers, drop empty rows (default true)' },
    { long: 'match',                describe: 'Only keep tables whose serialized content matches this substring' },
    { long: 'format',   short: 'f', describe: 'json (default) | csv' },
    { long: 'render',               describe: 'Render JS via headless browser before extracting' },
    { long: 'engine',               describe: 'puppeteer (default) | playwright' },
    { long: 'wait-ms',              describe: 'Wait N ms after page load before extracting' },
    { long: 'wait-for',             describe: 'CSS selector to wait for (overrides --wait-ms)' },
    { long: 'user-agent',           describe: 'Override the User-Agent string' },
  ],
  examples: [
    { comment: 'every table from a static page',  command: 'task parse html https://en.wikipedia.org/wiki/List_of_largest_companies' },
    { comment: 'local file → CSV',                command: 'task parse html ./page.html -f csv -o tables.csv' },
    { comment: 'pick a single table',             command: 'task parse html ./page.html --table 0' },
    { comment: 'by selector',                     command: 'task parse html ./page.html --table "#pricing"' },
    { comment: 'filter tables containing "price"',command: 'task parse html ./page.html --match price' },
    { comment: 'links + images at once',          command: 'task parse html https://example.com --links --images' },
    { comment: 'JS-rendered page (puppeteer)',    command: 'task parse html https://app.example.com --render' },
    { comment: 'render with playwright + waitFor',command: 'task parse html https://app.example.com --render --engine playwright --wait-for "table.results"' },
  ],
})

export const parseHtmlConsole: CommandModule = {
  command: 'html <input>',
  describe: 'Extract tables / links / images / text from a URL or HTML file',
  builder: y => y
    .positional('input', { type: 'string' })
    .option('output',     { alias: 'o', type: 'string' })
    .option('tables',     { type: 'boolean' })
    .option('links',      { type: 'boolean' })
    .option('images',     { type: 'boolean' })
    .option('text',       { type: 'boolean' })
    .option('table',      { type: 'string' })
    .option('clean',      { type: 'boolean' })
    .option('match',      { type: 'string' })
    .option('format',     { alias: 'f', type: 'string', choices: ['json', 'csv'] as const })
    .option('render',     { type: 'boolean' })
    .option('engine',     { type: 'string', choices: ['puppeteer', 'playwright'] as const })
    .option('wait-ms',    { type: 'number' })
    .option('wait-for',   { type: 'string' })
    .option('user-agent', { type: 'string' }),
  handler: async argv => {
    const { parseHtmlNode } = await import('./node')
    const { runAction } = await import('~/code/tool/node/log')
    // `--table 0` parses as string "0"; promote to number when it
    // looks like an index, otherwise keep as a CSS selector.
    const rawTable = argv.table as string | undefined
    const table = rawTable !== undefined && /^\d+$/.test(rawTable)
      ? Number(rawTable)
      : rawTable
    const input = {
      input: argv.input as string,
      output: argv.output as string | undefined,
      tables: argv.tables as boolean | undefined,
      links: argv.links as boolean | undefined,
      images: argv.images as boolean | undefined,
      text: argv.text as boolean | undefined,
      table,
      clean: argv.clean as boolean | undefined,
      match: argv.match as string | undefined,
      format: argv.format as 'json' | 'csv' | undefined,
      render: argv.render as boolean | undefined,
      engine: argv.engine as 'puppeteer' | 'playwright' | undefined,
      waitMs: argv['wait-ms'] as number | undefined,
      waitFor: argv['wait-for'] as string | undefined,
      userAgent: argv['user-agent'] as string | undefined,
    }
    await runAction({
      action: 'parse',
      input: input as unknown as Record<string, unknown>,
      run: () => parseHtmlNode(input),
    })
  },
}
