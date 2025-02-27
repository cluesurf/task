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
  await makeShared()
  await makeNode()
  await makeBrowser()
}

async function makeShared() {
  await makeForm('shared', (text: string) =>
    Boolean(!text.match('_browser_') && !text.match('_node_')),
  )
}

async function makeNode() {
  await makeForm('node', (text: string) =>
    Boolean(text.match('_node_')),
  )
}

async function makeBrowser() {
  await makeForm('browser', (text: string) =>
    Boolean(text.match('_browser_')),
  )
}

async function makeForm(type: string, test: Test) {
  const link: BaseHash = makeMesh(test)
  const tree = await makeTree({
    testLink: `~/code/type/code.js`,
    link,
    mesh: MESH,
    name: NAME,
  })

  await fsp.mkdir(`./code/type/${type}`, { recursive: true })

  const castLoad: Record<string, boolean> = {}

  if (type !== 'shared') {
    castLoad[`export * from '../shared/form.js'`] = true
  }

  for (const name in tree.type) {
    const text = tree.type[name]
    if (text) {
      const link = name.replace('~', '.')
      const base = path.dirname(link)
      await fsp.mkdir(base, { recursive: true })
      await fsp.writeFile(`${link}.ts`, text)

      castLoad[`export * from '${name}.js'`] = true
    }
  }

  await fsp.writeFile(
    `./code/type/${type}/form.ts`,
    Object.keys(castLoad).join('\n'),
  )

  const takeLoad: Record<string, boolean> = {}

  if (type !== 'shared') {
    takeLoad[`export * from '../shared/parser.js'`] = true
  }

  takeLoad[`export * from './form.js'`] = true

  for (const name in tree.parser) {
    const text = tree.parser[name]
    if (text) {
      const link = name.replace('~', '.')
      const base = path.dirname(link)
      await fsp.mkdir(base, { recursive: true })
      await fsp.writeFile(`${link}.ts`, text)

      takeLoad[`export * from '${name}.js'`] = true
    }
  }

  await fsp.writeFile(
    `./code/type/${type}/parser.ts`,
    Object.keys(takeLoad).join('\n'),
  )

  const baseLoad: Record<string, boolean> = {}

  if (type !== 'shared') {
    baseLoad[`export * from '../shared/data.js'`] = true
  }

  for (const name in tree.constant) {
    const text = tree.constant[name]
    if (text) {
      const link = name.replace('~', '.')
      const base = path.dirname(link)
      await fsp.mkdir(base, { recursive: true })
      await fsp.writeFile(`${link}.ts`, text)

      baseLoad[`export * from '${name}.js'`] = true
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
