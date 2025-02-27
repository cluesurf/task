import makeTree from '@cluesurf/form/host/make'
import * as MESH from '~/code/source'
import NAME from '~/code/object/name'
// import '~/code/shared/type/source/call/convert'
import fsp from 'fs/promises'
import { BaseHash } from '@cluesurf/form'
import path from 'path'

export type Test = (text: string) => boolean

make()

async function make() {
  const link: BaseHash = MESH
  const tree = await makeTree({
    testLink: `~/code/type/code.js`,
    link,
    mesh: MESH,
    name: NAME,
  })

  for (const name in tree.type) {
    const link = name.replace('~', '.')
    const base = path.dirname(link)
    await fsp.mkdir(base, { recursive: true })
    await fsp.writeFile(`${link}.ts`, tree.type[name] as string)
  }

  for (const name in tree.parser) {
    const link = name.replace('~', '.')
    const base = path.dirname(link)
    await fsp.mkdir(base, { recursive: true })
    await fsp.writeFile(`${link}.ts`, tree.parser[name] as string)
  }

  for (const name in tree.constant) {
    const link = name.replace('~', '.')
    const base = path.dirname(link)
    await fsp.mkdir(base, { recursive: true })
    await fsp.writeFile(`${link}.ts`, tree.constant[name] as string)
  }
}
