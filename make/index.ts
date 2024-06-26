import makeTree from '@termsurf/form/host/make'
import * as MESH from '~/code/source'
import NAME from '~/code/object/name'
// import '~/code/shared/type/source/call/convert'
import fsp from 'fs/promises'
import { BaseHash } from '@termsurf/form'
import path from 'path'
import { Hold } from '@termsurf/form/host/make/type'

export type Test = (text: string) => boolean

make()

async function make() {
  const hold: Hold = { save: {}, load: {} }
  await makeShared(hold)
  await makeNode(hold)
  await makeBrowser(hold)
}

async function makeShared(hold: Hold) {
  await makeForm(hold, 'shared', (text: string) =>
    Boolean(!text.match('_browser_') && !text.match('_node_')),
  )
}

async function makeNode(hold: Hold) {
  await makeForm(hold, 'node', (text: string) =>
    Boolean(text.match('_node_')),
  )
}

async function makeBrowser(hold: Hold) {
  await makeForm(hold, 'browser', (text: string) =>
    Boolean(text.match('_browser_')),
  )
}

async function makeForm(hold: Hold, type: string, test: Test) {
  const link: BaseHash = makeMesh(test)
  const tree = await makeTree({
    testLink: `~/code/type/code`,
    baseLink: `~/code/type/${type}`,
    link,
    mesh: MESH,
    name: NAME,
    ...hold,
  })

  await fsp.mkdir(`./code/type/${type}`, { recursive: true })

  const castLoad: Record<string, boolean> = {}

  if (type !== 'shared') {
    castLoad[`export * from '../shared'`] = true
  }

  for (const name in tree.cast) {
    const text = tree.cast[name]
    if (text) {
      const link = name.replace('~', '.')
      const base = path.dirname(link)
      await fsp.mkdir(base, { recursive: true })
      await fsp.writeFile(`${link}.ts`, text)

      castLoad[`export * from '${name}'`] = true
    }
  }

  await fsp.writeFile(
    `./code/type/${type}/form.ts`,
    Object.keys(castLoad).join('\n'),
  )

  const takeLoad: Record<string, boolean> = {}

  if (type !== 'shared') {
    takeLoad[`export * from '../shared/parser'`] = true
  }

  takeLoad[`export * from './form'`] = true

  for (const name in tree.take) {
    const text = tree.take[name]
    if (text) {
      const link = name.replace('~', '.')
      const base = path.dirname(link)
      await fsp.mkdir(base, { recursive: true })
      await fsp.writeFile(`${link}.ts`, text)

      takeLoad[`export * from '${name}'`] = true
    }
  }

  await fsp.writeFile(
    `./code/type/${type}/parser.ts`,
    Object.keys(takeLoad).join('\n'),
  )

  const baseLoad: Record<string, boolean> = {}

  if (type !== 'shared') {
    baseLoad[`export * from '../shared/data'`] = true
  }

  for (const name in tree.base) {
    const text = tree.base[name]
    if (text) {
      const link = name.replace('~', '.')
      const base = path.dirname(link)
      await fsp.mkdir(base, { recursive: true })
      await fsp.writeFile(`${link}.ts`, text)

      baseLoad[`export * from '${name}'`] = true
    }
  }

  await fsp.writeFile(
    `./code/type/${type}/data.ts`,
    Object.keys(baseLoad).join('\n'),
  )
}

function makeMesh(test: Test) {
  const mesh: BaseHash = {}
  for (const name in MESH) {
    if (test(name)) {
      mesh[name] = MESH[name]
    }
  }
  return mesh
}
