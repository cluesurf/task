import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { listAttackConsole } from './attack/console'
import { listBucketConsole } from './bucket/console'
import { listClusterConsole } from './cluster/console'
import { listDomainConsole } from './domain/console'
import { listFirewallConsole } from './firewall/console'
import { listMachineConsole } from './machine/console'
import { listNetworkConsole } from './network/console'
import { listPodConsole } from './pod/console'
import { listPortConsole } from './port/console'
import { listProcessConsole } from './process/console'
import { listRecordConsole } from './record/console'
import { listSshConsole } from './ssh/console'
import { listWorkerConsole } from './worker/console'
import { listZoneConsole } from './zone/console'

registerGroupHelp({
  command: 'task list',
  describe: 'List running resources, cloud entities, or stored entries',
  commands: [
    { name: 'attack',   describe: 'Cloudflare firewall events' },
    { name: 'bucket',   describe: 'Cloudflare R2 buckets' },
    { name: 'cluster',  describe: 'Kubernetes clusters (cloud-managed)' },
    { name: 'domain',   describe: 'DNS domains (`record <domain>` for records)' },
    { name: 'firewall', describe: 'Cloud firewalls' },
    { name: 'machine',  describe: 'Cloud machines / VMs (--show ip for a summary)' },
    { name: 'network',  describe: 'Network interfaces / connections / routes' },
    { name: 'pod',      describe: 'Kubernetes pods' },
    { name: 'port',     describe: 'Open TCP / UDP ports' },
    { name: 'process',  describe: 'Running processes with filter / sort / group / tree' },
    { name: 'record',   describe: 'Cloudflare DNS records for the active zone' },
    { name: 'ssh',      describe: 'Every Host entry in ~/.ssh/config' },
    { name: 'worker',   describe: 'Cloudflare Workers scripts' },
    { name: 'zone',     describe: 'Cloudflare zones' },
  ],
})

export const listConsole: CommandModule = {
  command: 'list <thing>',
  describe: 'List running resources, cloud entities, or stored entries',
  builder: y =>
    y
      .command(listAttackConsole)
      .command(listBucketConsole)
      .command(listClusterConsole)
      .command(listDomainConsole)
      .command(listFirewallConsole)
      .command(listMachineConsole)
      .command(listNetworkConsole)
      .command(listPodConsole)
      .command(listPortConsole)
      .command(listProcessConsole)
      .command(listRecordConsole)
      .command(listSshConsole)
      .command(listWorkerConsole)
      .command(listZoneConsole)
      .demandCommand(1, 'Specify what to list'),
  handler: () => {},
}
