import fs from 'fs'
import pkg from './package.json'

const TOOL = `tool/chocolateyinstall.ps1`
const SPEC = `load/choco/task.nuspec`
const VERSION = pkg.chocoVersion

fs.writeFileSync(
  SPEC,
  fs
    .readFileSync(SPEC, 'utf-8')
    .replace(
      /\<version\>([^<]+)\<\/version\>/,
      () => `<version>${VERSION}</version>`,
    ),
)

// fs.writeFileSync(
//   TOOL,
//   fs
//     .readFileSync(TOOL, 'utf-8')
//     .replace(/\$version = '([^']+)'/g, () => `$version = '${VERSION}'`),
// )

console.log(`Bumped to version ${VERSION}`)
