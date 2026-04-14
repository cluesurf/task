import { getRandomBytes } from './bytes'
import { CODE } from '@termsurf/tone-code'

export function getRandomId(n: number) {
  const value: Array<string> = []
  const bn = Math.ceil(n / 2)
  const bytes = getRandomBytes(Math.ceil(n / 2))

  for (let i = 0; i < bn; i++) {
    const byte = bytes[i]!
    const a = (byte >> 0) & 0xf
    const b = (byte >> 4) & 0xf
    const x = CODE[a]!
    const y = CODE[b]!
    value.push(x, y)
  }

  return value.join('')
}
