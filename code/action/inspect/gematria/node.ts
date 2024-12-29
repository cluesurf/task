import { peak, sum } from '@lancejpollard/gematria.js/host/index'
import * as chinese from '@lancejpollard/gematria.js/host/language/chinese'
import merge from 'lodash/merge.js'
import {
  CalculateGematria,
  CalculateGematriaParser,
  GematriaSystemCalculation,
} from '~/code/type/node/parser.js'

export function calculateTibetanGematria(source: CalculateGematria) {
  const input = CalculateGematriaParser().parse(source)

  const encoded = input.input.string.decoded.replace(/[\s]+/g, '+')

  merge(input, {
    input: {
      string: { encoded },
    },
  })

  const calculation: Array<GematriaSystemCalculation> = []
  const symbolSet = [
    ...(input.input.string.encoded as string).replace(/\s+/g, ''),
  ]
  const digit = chinese.map9(symbolSet)
  const cube = chinese.map27(symbolSet)

  calculation.push({
    system: {
      slug: 'cube',
      title: 'Cube',
    },
    summation: sum(cube),
    reduction: peak(cube),
  })

  calculation.push({
    system: {
      slug: 'digit',
      title: 'Digit',
    },
    summation: sum(digit),
    reduction: peak(digit),
  })

  return {
    string: input.input.string as { encoded: string; decoded: string },
    script: {
      slug: 'chinese',
      title: 'Chinese',
    },
    calculation,
  }
}
