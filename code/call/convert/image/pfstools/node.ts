// HDR ↔ EXR ↔ PFS ↔ TIFF / JPEG via pfstools. Handles every
// HDR format with auto-detection, piping `pfsin` → `pfsout`.

import { spawn } from 'node:child_process'

export type ConvertImageWithPfstoolsNodeInput = {
  input: { path: string }
  output: { path: string }
}

export async function convertImageWithPfstoolsNode(
  source: ConvertImageWithPfstoolsNodeInput,
): Promise<void> {
  // pfsin | pfsout — a genuine pipe (not a shelling `&&` chain),
  // so we spawn two processes and wire their stdio.
  await new Promise<void>((resolve, reject) => {
    const input = spawn('pfsin', [source.input.path])
    const output = spawn('pfsout', [source.output.path], {
      stdio: [input.stdout, 'inherit', 'inherit'],
    })
    input.on('error', reject)
    output.on('error', reject)
    output.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`pfsout exited ${code}`)),
    )
  })
}
