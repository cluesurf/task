/**
 * Filesystem-based ecosystem detection. Scans the cwd for marker
 * files and returns a ranked list of matching ecosystems. First
 * entry is the "default pick"; callers inspect the rest when a
 * repo is polyglot (`.taskrc` can then disambiguate).
 */

import fs from 'node:fs'
import path from 'node:path'
import { REGISTRY } from './registry'
import type { Ecosystem, Marker } from './types'

export type Detection = {
  /** Best match (first in the ranked list), if any. */
  best?: Ecosystem
  /** Every matching ecosystem. Could be multiple for a polyglot
   * repo (e.g. Node frontend + Rust backend at the same level). */
  all: Ecosystem[]
}

export function detect(cwd: string): Detection {
  const all = REGISTRY.filter(eco => eco.markers.every(m => matches(cwd, m)))
  return { best: all[0], all }
}

function matches(cwd: string, marker: Marker): boolean {
  switch (marker.form) {
    case 'file':
      return fs.existsSync(path.join(cwd, marker.path))
    case 'any':
      return marker.paths.some(p => fs.existsSync(path.join(cwd, p)))
    case 'all':
      return marker.paths.every(p => fs.existsSync(path.join(cwd, p)))
    case 'contains': {
      const full = path.join(cwd, marker.path)
      if (!fs.existsSync(full)) return false
      try {
        return marker.pattern.test(fs.readFileSync(full, 'utf-8'))
      } catch {
        return false
      }
    }
  }
}
