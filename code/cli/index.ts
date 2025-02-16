#!/usr/bin/env -S node --no-warnings=ExperimentalWarning

import * as task from './task.js'
import { Task } from '~/code/type/node/parser.js'
import { read } from './parse.js'
import { logError } from './logging.js'

process.on('uncaughtException', kink => {
  logError(kink)
  process.exit(1)
})

call(process.argv)

/**
 * Parse the input into an action and state.
 */

async function call(argv: Array<string>) {
  const call = read(argv)
  try {
    return await task.call(call)
  } catch (e) {
    logError(e)
    process.exit(1)
  }
}
