/**
 * Verb tables for log lines. `Converting`, `Converted`, etc. so
 * status output reads naturally instead of "Convert" / "Convert"
 * regardless of stage.
 *
 * Unknown verbs fall back to `capitalize(verb)`.
 */

const PAST: Record<string, string> = {
  archive: 'Archived',
  convert: 'Converted',
  format: 'Formatted',
  compile: 'Compiled',
  download: 'Downloaded',
  upload: 'Uploaded',
  extract: 'Extracted',
  optimize: 'Optimized',
  sanitize: 'Sanitized',
  validate: 'Validated',
  verify: 'Verified',
  inspect: 'Inspected',
  resize: 'Resized',
  crop: 'Cropped',
  slice: 'Sliced',
  generate: 'Generated',
  remove: 'Removed',
  parse: 'Parsed',
  disassemble: 'Disassembled',
  check: 'Checked',
}

const PRESENT: Record<string, string> = {
  archive: 'Archiving',
  convert: 'Converting',
  format: 'Formatting',
  compile: 'Compiling',
  download: 'Downloading',
  upload: 'Uploading',
  extract: 'Extracting',
  optimize: 'Optimizing',
  sanitize: 'Sanitizing',
  validate: 'Validating',
  verify: 'Verifying',
  inspect: 'Inspecting',
  resize: 'Resizing',
  crop: 'Cropping',
  slice: 'Slicing',
  generate: 'Generating',
  remove: 'Removing',
  parse: 'Parsing',
  disassemble: 'Disassembling',
  check: 'Checking',
}

export function verbPast(action: string): string {
  return PAST[action] ?? capitalize(action)
}

export function verbPresent(action: string): string {
  return PRESENT[action] ?? capitalize(action)
}

function capitalize(word: string): string {
  if (word.length === 0) return word
  return word[0]!.toUpperCase() + word.slice(1)
}
