import { logError } from './logging.js'

export function exitWithError(e) {
  logError(e)
  process.exit(1)
}
