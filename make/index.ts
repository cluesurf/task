import makeTree from '@cluesurf/form/make'
import type { Load } from '@cluesurf/form'
import * as MESH from '~/code/source'
import NAME from '~/code/base/name'
import fsp from 'fs/promises'
import path from 'path'

void make()

async function make(): Promise<void> {
  const options: Load = {
    name: NAME,
    mesh: MESH,
    link: MESH,
    testLink: '~/code/form/code',
    codeLink: './code',
  }

  const tree = await makeTree(options)

  for (const name in tree.form) {
    const link = name.replace('~', '.')
    const base = path.dirname(link)
    await fsp.mkdir(base, { recursive: true })
    await fsp.writeFile(`${link}.ts`, tree.form[name] as string)
  }

  for (const name in tree.take) {
    const link = name.replace('~', '.')
    const base = path.dirname(link)
    await fsp.mkdir(base, { recursive: true })
    await fsp.writeFile(`${link}.ts`, tree.take[name] as string)
  }

  for (const name in tree.base) {
    const link = name.replace('~', '.')
    const base = path.dirname(link)
    await fsp.mkdir(base, { recursive: true })
    await fsp.writeFile(`${link}.ts`, tree.base[name] as string)
  }
}
