import path from 'path'

// Walk up from `code/tool/shared/directory.ts` (or its compiled
// counterpart at `host/code/tool/shared/directory.js`) to the
// project root. CJS-friendly: `__filename` is auto-injected by
// Node, so this works in both the dev (`pnpm tsx`) and built
// (`host/`) trees without an `import.meta.url` polyfill.
const projectRoot = path.dirname(
  path.dirname(path.dirname(path.dirname(__filename))),
)

export default projectRoot
