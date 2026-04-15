import type { CommandModule } from 'yargs'
import { registerGroupHelp } from '~/code/tool/node/log/registry'
import { inspectAnalyticsConsole } from './analytics/console'
import { inspectBotConsole } from './bot/console'
import { inspectBucketConsole } from './bucket/console'
import { inspectCacheConsole } from './cache/console'
import { inspectClusterConsole } from './cluster/console'
import { inspectColorConsole } from './color/console'
import { inspectDbConsole } from './db/console'
import { inspectDnsConsole } from './dns/console'
import { inspectFileConsole } from './file/console'
import { inspectFirewallConsole } from './firewall/console'
import { inspectMachineConsole } from './machine/console'
import { inspectMetadataConsole } from './metadata/console'
import { inspectNetworkConsole } from './network/console'
import { inspectPodConsole } from './pod/console'
import { inspectPortConsole } from './port/console'
import { inspectProcessConsole } from './process/console'
import { inspectRequestConsole } from './request/console'
import { inspectSecurityConsole } from './security/console'
import { inspectServiceConsole } from './service/console'
import { inspectSystemConsole } from './system/console'
import { inspectTableConsole } from './table/console'
import { inspectTrafficConsole } from './traffic/console'
import { inspectUsageConsole } from './usage/console'
import { inspectWafConsole } from './waf/console'
import { inspectWorkerConsole } from './worker/console'
import { inspectZoneConsole } from './zone/console'

registerGroupHelp({
  command: 'task inspect',
  describe: 'Inspect a file, process, network state, cloud resource, or analytics surface',
  commands: [
    { name: 'analytics', describe: 'Cloudflare combined analytics' },
    { name: 'bot', describe: 'Cloudflare Bot Management events' },
    { name: 'bucket', describe: 'Cloudflare R2 bucket details' },
    { name: 'cache', describe: 'Cloudflare cache breakdown' },
    { name: 'cluster', describe: 'Kubernetes cluster (cloud-managed)' },
    { name: 'color', describe: 'Inspect colors in an image' },
    { name: 'db', describe: 'Inspect a Postgres database' },
    { name: 'dns', describe: 'Cloudflare DNS records for a zone' },
    { name: 'file', describe: 'Inspect a file and print a key/value table of its metadata' },
    { name: 'firewall', describe: 'Cloudflare firewall events (last N)' },
    { name: 'machine', describe: 'Cloud machine / VM details' },
    { name: 'metadata', describe: 'Inspect file metadata (EXIF, XMP, ...)' },
    { name: 'network', describe: 'Summarize network state or look up DNS for a host' },
    { name: 'pod', describe: 'Describe a Kubernetes pod (kubectl describe)' },
    { name: 'port', describe: 'Show who owns a port (PID, command, user)' },
    { name: 'process', describe: 'Inspect a running process by PID' },
    { name: 'request', describe: 'Cloudflare request analytics' },
    { name: 'security', describe: 'Cloudflare security summary' },
    { name: 'service', describe: 'List or inspect system services' },
    { name: 'system', describe: 'System summary: CPU / memory / disk / uptime' },
    { name: 'table', describe: 'Inspect a Postgres table' },
    { name: 'traffic', describe: 'Cloudflare traffic (requests + bytes)' },
    { name: 'usage', describe: 'Cloud machine usage over time (chart / table / json)' },
    { name: 'waf', describe: 'Cloudflare WAF events' },
    { name: 'worker', describe: 'Cloudflare Worker deployment or metrics' },
    { name: 'zone', describe: 'Cloudflare zone details' },
  ],
})

export const inspectConsole: CommandModule = {
  command: 'inspect <thing>',
  describe: 'Inspect a file, process, network state, cloud resource, or analytics surface',
  builder: y =>
    y
      .command(inspectAnalyticsConsole)
      .command(inspectBotConsole)
      .command(inspectBucketConsole)
      .command(inspectCacheConsole)
      .command(inspectClusterConsole)
      .command(inspectColorConsole)
      .command(inspectDbConsole)
      .command(inspectDnsConsole)
      .command(inspectFileConsole)
      .command(inspectFirewallConsole)
      .command(inspectMachineConsole)
      .command(inspectMetadataConsole)
      .command(inspectNetworkConsole)
      .command(inspectPodConsole)
      .command(inspectPortConsole)
      .command(inspectProcessConsole)
      .command(inspectRequestConsole)
      .command(inspectSecurityConsole)
      .command(inspectServiceConsole)
      .command(inspectSystemConsole)
      .command(inspectTableConsole)
      .command(inspectTrafficConsole)
      .command(inspectUsageConsole)
      .command(inspectWafConsole)
      .command(inspectWorkerConsole)
      .command(inspectZoneConsole)
      .demandCommand(1, 'Specify what to inspect'),
  handler: () => {},
}
