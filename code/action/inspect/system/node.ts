import si from 'systeminformation'
import omit from 'lodash/omit.js'

export async function inspectSystem() {
  return await inspectBasicSystem()
}

export async function inspectBasicSystem() {
  const os = omit(await si.osInfo(), [
    'serial',
    'servicepack',
    'logofile',
    'fqdn',
    'uefi',
  ])
  const system = omit(await si.system(), [
    'serial',
    'uuid',
    'sku',
    'uuid',
  ])
  const cpu = omit(await si.cpu(), [
    'cache',
    'governor',
    'flags',
    'virtualization',
    'revision',
    'voltage',
    'vendor',
    'speedMin',
    'speedMax',
  ])
  return { os, system, cpu }
}
