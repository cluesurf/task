// `task do <action>` — DigitalOcean helpers over `doctl`.
// Assumes `doctl auth init` has been run (or $DIGITALOCEAN_ACCESS_TOKEN
// is set). This is a thin registry over doctl — for anything not
// exposed here, shell out to `doctl` directly.

import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'

registerGroupHelp({
  command: 'task do',
  describe: 'DigitalOcean helpers (droplets, k8s, firewalls, domains)',
  commands: [
    { name: 'droplets',    describe: 'List droplets' },
    { name: 'ips',         describe: 'List droplet IPs (public + private + v6)' },
    { name: 'droplet',     describe: 'Inspect a droplet by name' },
    { name: 'metrics',     describe: 'CPU / memory / bandwidth of a droplet' },
    { name: 'clusters',    describe: 'List DOKS clusters' },
    { name: 'kubeconfig',  describe: 'Save kubeconfig for a DOKS cluster' },
    { name: 'firewalls',   describe: 'List firewalls' },
    { name: 'domains',     describe: 'List DNS domains' },
    { name: 'records',     describe: 'List DNS records for a domain' },
  ],
})

const droplets: CommandModule = {
  command: 'droplets',
  describe: 'List droplets',
  builder: y => y.option('json', { type: 'boolean', default: false }),
  handler: async argv => {
    const { listDroplets } = await import('./droplet/node')
    process.stdout.write(
      await listDroplets(argv.json ? 'json' : 'text'),
    )
  },
}

const ips: CommandModule = {
  command: 'ips',
  describe: 'Name + public IPv4 + private IPv4 + IPv6 per droplet',
  handler: async () => {
    const { listDropletIps } = await import('./droplet/node')
    process.stdout.write(await listDropletIps())
  },
}

const droplet: CommandModule = {
  command: 'droplet <name>',
  describe: 'Inspect a droplet',
  builder: y => y.positional('name', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { inspectDroplet } = await import('./droplet/node')
    process.stdout.write(await inspectDroplet(argv.name as string))
  },
}

const metrics: CommandModule = {
  command: 'metrics <id>',
  describe: 'Droplet monitoring metrics (cpu | memory | load | bandwidth | filesystem-free)',
  builder: y =>
    y
      .positional('id', { type: 'string', demandOption: true })
      .option('type', {
        choices: ['cpu', 'memory', 'load', 'filesystem-free', 'bandwidth'] as const,
        default: 'cpu',
      }),
  handler: async argv => {
    const { dropletMetrics } = await import('./droplet/node')
    process.stdout.write(
      await dropletMetrics(
        argv.id as string,
        argv.type as 'cpu' | 'memory' | 'load' | 'filesystem-free' | 'bandwidth',
      ),
    )
  },
}

const clusters: CommandModule = {
  command: 'clusters',
  describe: 'List DOKS (DigitalOcean Kubernetes) clusters',
  handler: async () => {
    const { listClusters } = await import('./k8s/node')
    process.stdout.write(await listClusters())
  },
}

const kubeconfig: CommandModule = {
  command: 'kubeconfig <name>',
  describe: 'Save kubeconfig for a DOKS cluster so `task k8s ...` targets it',
  builder: y => y.positional('name', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { saveClusterConfig } = await import('./k8s/node')
    process.stdout.write(await saveClusterConfig(argv.name as string))
  },
}

const firewalls: CommandModule = {
  command: 'firewalls',
  describe: 'List firewalls',
  handler: async () => {
    const { listFirewalls } = await import('./firewall/node')
    process.stdout.write(await listFirewalls())
  },
}

const domains: CommandModule = {
  command: 'domains',
  describe: 'List DNS domains',
  handler: async () => {
    const { listDomains } = await import('./domain/node')
    process.stdout.write(await listDomains())
  },
}

const records: CommandModule = {
  command: 'records <domain>',
  describe: 'List DNS records for a domain',
  builder: y => y.positional('domain', { type: 'string', demandOption: true }),
  handler: async argv => {
    const { listDomainRecords } = await import('./domain/node')
    process.stdout.write(await listDomainRecords(argv.domain as string))
  },
}

export const doConsole: CommandModule = {
  command: 'do <action>',
  describe: 'DigitalOcean helpers over doctl',
  builder: y =>
    y
      .command(droplets)
      .command(ips)
      .command(droplet)
      .command(metrics)
      .command(clusters)
      .command(kubeconfig)
      .command(firewalls)
      .command(domains)
      .command(records)
      .demandCommand(1, 'Specify an action'),
  handler: () => {},
}
