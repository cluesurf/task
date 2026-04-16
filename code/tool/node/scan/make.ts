import { spawn } from 'node:child_process'
import {
  buildScanFilesystemCommand,
  buildScanHostCommand,
  buildScanImageCommand,
  buildScanNetworkCommand,
  buildScanSbomCommand,
  buildScanSecretsCommand,
  type ScanCommand,
} from '~/code/tool/shared/scan/command'

export * from '~/code/tool/shared/scan/command'

export const runScanImage      = (o: Parameters<typeof buildScanImageCommand>[0])      => exec(buildScanImageCommand(o))
export const runScanFilesystem = (o: Parameters<typeof buildScanFilesystemCommand>[0]) => exec(buildScanFilesystemCommand(o))
export const runScanHost       = (o: Parameters<typeof buildScanHostCommand>[0])       => exec(buildScanHostCommand(o))
export const runScanSecrets    = (o: Parameters<typeof buildScanSecretsCommand>[0])    => exec(buildScanSecretsCommand(o))
export const runScanSbom       = (o: Parameters<typeof buildScanSbomCommand>[0])       => exec(buildScanSbomCommand(o))
export const runScanNetwork    = (o: Parameters<typeof buildScanNetworkCommand>[0])    => exec(buildScanNetworkCommand(o))

function exec(cmd: ScanCommand): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd.bin, cmd.args, { stdio: 'inherit' })
    child.on('error', err => reject(makeErr(cmd, err)))
    child.on('exit', code => {
      // trivy/grype exit non-zero when vulnerabilities found above
      // threshold — that's "successful run, found stuff." Treat 1 as
      // success too; only crash on 2+.
      if (code === 0 || code === 1) resolve()
      else reject(new Error(`scan: ${cmd.bin} exited with code ${code}`))
    })
  })
}

function makeErr(cmd: ScanCommand, err: unknown): Error {
  return new Error(
    (err as NodeJS.ErrnoException).code === 'ENOENT'
      ? `scan: \`${cmd.bin}\` not found. Install: ${cmd.install}`
      : `scan: ${cmd.bin} failed — ${(err as Error).message}`,
  )
}
