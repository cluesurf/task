import { exec } from '~/code/tool/node/process'

async function listDomains(): Promise<string> {
  const { stdout } = await exec(['doctl', 'compute', 'domain', 'list', '-o', 'json'])
  return stdout
}

export async function listDomainRecords(domain: string): Promise<string> {
  const { stdout } = await exec([
    'doctl',
    'compute',
    'domain',
    'records',
    'list',
    domain,
    '-o',
    'json',
  ])
  return stdout
}

export default listDomains
export { listDomains }
