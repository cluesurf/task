/**
 * Pure command-line builders for cloud / network transports.
 *
 * No I/O, no spawn — every export is a pure function returning
 * `{ bin, args }`. Safe to import from the browser to render
 * preview commands or generate scripts.
 *
 * The Node-side runner at `~/code/tool/node/transport/base` consumes
 * these and shells out via `spawn`.
 */

export type Direction = 'get' | 'put'

export type TransportOptions = {
  src: string
  dst: string
  recursive?: boolean
  dryRun?: boolean
  verbose?: boolean
  quiet?: boolean

  // S3 / R2 / generic S3-compatible
  endpoint?: string
  profile?: string
  region?: string

  // Azure
  account?: string
  container?: string
  accountKey?: string
  sasToken?: string

  // FTP / SFTP / WebDAV
  user?: string
  password?: string
  port?: number
  key?: string

  // IPFS
  cidVersion?: number
  pin?: boolean

  // Torrent
  seedTime?: number
}

export type TransportCommand = {
  bin: string
  args: string[]
  install: string
}

const INSTALL = {
  aws:    'pip install awscli  or  brew install awscli',
  gsutil: 'install the gcloud SDK: https://cloud.google.com/sdk/docs/install',
  az:     'brew install azure-cli  or  https://aka.ms/installazurecli',
  curl:   'curl is a system tool; install from your package manager',
  scp:    'ships with openssh-client',
  ipfs:   'brew install ipfs  or  https://dist.ipfs.tech/#kubo',
  aria2c: 'brew install aria2  or  apt install aria2',
}

export function buildS3Command(direction: Direction, o: TransportOptions): TransportCommand {
  const args = ['s3', o.recursive ? 'sync' : 'cp', o.src, o.dst]
  if (o.endpoint) args.push('--endpoint-url', o.endpoint)
  if (o.profile)  args.push('--profile', o.profile)
  if (o.region)   args.push('--region', o.region)
  if (o.dryRun)   args.push('--dryrun')
  if (o.quiet)    args.push('--quiet')
  if (o.recursive) args.push('--no-progress')
  void direction // direction is encoded by src/dst order
  return { bin: 'aws', args, install: INSTALL.aws }
}

export function buildGcsCommand(direction: Direction, o: TransportOptions): TransportCommand {
  const args = o.recursive ? ['rsync', '-r'] : ['cp']
  args.push(o.src, o.dst)
  if (o.dryRun) args.unshift('-n')
  if (o.quiet)  args.unshift('-q')
  void direction
  return { bin: 'gsutil', args, install: INSTALL.gsutil }
}

export function buildAzureCommand(direction: Direction, o: TransportOptions): TransportCommand {
  const args = ['storage', 'blob', direction === 'get' ? 'download' : 'upload']
  if (o.recursive) args[2] = direction === 'get' ? 'download-batch' : 'upload-batch'
  if (direction === 'get') args.push('--file', o.dst, '--name', o.src)
  else                     args.push('--file', o.src, '--name', o.dst)
  if (o.account)    args.push('--account-name', o.account)
  if (o.container)  args.push('--container-name', o.container)
  if (o.accountKey) args.push('--account-key', o.accountKey)
  if (o.sasToken)   args.push('--sas-token', o.sasToken)
  return { bin: 'az', args, install: INSTALL.az }
}

export function buildFtpCommand(direction: Direction, o: TransportOptions): TransportCommand {
  const args = ['--ssl-reqd', '--fail', '--location']
  if (o.user) {
    const cred = o.password ? `${o.user}:${o.password}` : o.user
    args.push('--user', cred)
  }
  if (o.quiet)   args.push('--silent', '--show-error')
  if (o.verbose) args.push('--verbose')
  if (direction === 'get') args.push('--output', o.dst, o.src)
  else                     args.push('--upload-file', o.src, o.dst)
  return { bin: 'curl', args, install: INSTALL.curl }
}

export function buildSftpCommand(_direction: Direction, o: TransportOptions): TransportCommand {
  const args: string[] = []
  if (o.port)      args.push('-P', String(o.port))
  if (o.key)       args.push('-i', o.key)
  if (o.recursive) args.push('-r')
  if (o.quiet)     args.push('-q')
  args.push(o.src, o.dst)
  return { bin: 'scp', args, install: INSTALL.scp }
}

export function buildWebdavCommand(direction: Direction, o: TransportOptions): TransportCommand {
  const args = ['--fail', '--location']
  if (o.user) {
    const cred = o.password ? `${o.user}:${o.password}` : o.user
    args.push('--user', cred)
  }
  if (o.quiet) args.push('--silent', '--show-error')
  if (direction === 'get') args.push('--output', o.dst, o.src)
  else                     args.push('--upload-file', o.src, o.dst)
  return { bin: 'curl', args, install: INSTALL.curl }
}

export function buildIpfsCommand(direction: Direction, o: TransportOptions): TransportCommand {
  const args: string[] = []
  if (direction === 'get') {
    args.push('get', o.src, '-o', o.dst)
  } else {
    args.push('add', o.src)
    if (o.recursive) args.push('-r')
    if (o.pin === false) args.push('--pin=false')
    if (typeof o.cidVersion === 'number') args.push(`--cid-version=${o.cidVersion}`)
  }
  if (o.quiet) args.push('-q')
  return { bin: 'ipfs', args, install: INSTALL.ipfs }
}

export function buildTorrentCommand(o: TransportOptions): TransportCommand {
  const args = [
    o.src,
    `--dir=${o.dst}`,
    '--seed-time=' + String(o.seedTime ?? 0),
    '--enable-dht=true',
    '--bt-enable-lpd=true',
    '--summary-interval=0',
  ]
  if (o.quiet) args.push('--quiet=true')
  return { bin: 'aria2c', args, install: INSTALL.aria2c }
}
