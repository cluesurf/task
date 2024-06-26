import { getRandomBytes } from '~/code/tool/node/bytes.js'
import { getConfig } from '~/code/tool/shared/config.js'
import {
  generateCumulativeWeightedRandomArray,
  getRandomIntegerBetween,
  getWeightedRandomIndex,
} from '~/code/tool/shared/random'
import {
  AnonymousWordSet,
  GenerateHaikuPhrase,
  GenerateHaikuPhraseParser,
  GenerateRandomPhrase,
  GenerateRandomPhraseParser,
  GenerateRandomSymbols,
  GenerateRandomSymbolsParser,
  NamedWordSet,
  WeightedSymbolSet,
  WeightedWordSet,
} from '~/code/type/shared/parser.js'

export function generateRandomSymbols(source: GenerateRandomSymbols) {
  const input = GenerateRandomSymbolsParser().parse(source)

  const size = getRandomIntegerBetween({
    min: input.minSize as number,
    max: input.maxSize as number,
  })

  const bytes = getRandomBytes(size)

  const inclusions = getWeightedSymbolSets(input.inclusions)
  const weights = inclusions.map(x => x.weight)
  const cumulativeWeights =
    generateCumulativeWeightedRandomArray(weights)
  const exclusions = getWeightedSymbolSets(input.exclusions ?? [])
    .map(x => x.list)
    .join('')

  let i = 0

  const text: Array<string> = []

  while (i < size) {
    const byte = bytes[i]!

    let attempt = 0

    attemptLoop: while (attempt < 4) {
      const index = getWeightedRandomIndex(cumulativeWeights)
      const inclusionSet = inclusions[index!]!

      const symbol =
        inclusionSet.list[byte % (inclusionSet.list.length - 1)]!

      if (attempt === 4 || !exclusions.includes(symbol)) {
        text.push(symbol)
        break attemptLoop
      }

      attempt++
    }

    i++
  }

  return text.join('')
}

export function generateRandomPhrase(source: GenerateRandomPhrase) {
  const input = GenerateRandomPhraseParser().parse(source)

  const size = getRandomIntegerBetween({
    min: input.minSize as number,
    max: input.maxSize as number,
  })

  const bytes = getRandomBytes(size)

  const inclusions = getWeightedWordSets(input.inclusions)
  const weights = inclusions.map(x => x.weight)
  const cumulativeWeights =
    generateCumulativeWeightedRandomArray(weights)
  const exclusions = getWeightedWordSets(input.exclusions ?? [])
    .flatMap(x => x.list)
    .reduce((m, x) => {
      m[x] = true
      return m
    }, {})

  let i = 0

  const text: Array<string> = []

  while (i < size) {
    const byte = bytes[i]!

    let attempt = 0

    attemptLoop: while (attempt < 4) {
      const index = getWeightedRandomIndex(cumulativeWeights)
      const inclusionSet = inclusions[index!]!

      const word =
        inclusionSet.list[byte % (inclusionSet.list.length - 1)]!

      if (attempt === 4 || !exclusions[word]) {
        text.push(word)
        break attemptLoop
      }

      attempt++
    }

    i++
  }

  return text.join(input.separator ?? '-')
}

export function generateHaikuPhrase(source: GenerateHaikuPhrase) {
  const input = GenerateHaikuPhraseParser().parse(source)

  const adjectives = getWordSets(input.adjectives)
  const nouns = getWordSets(input.nouns)

  const adjectiveSet =
    adjectives[
      getRandomIntegerBetween({
        min: 0,
        max: adjectives.length - 1,
      })
    ]!
  const nounSet =
    nouns[
      getRandomIntegerBetween({
        min: 0,
        max: nouns.length - 1,
      })
    ]!

  const adjective =
    adjectiveSet[
      getRandomIntegerBetween({
        min: 0,
        max: adjectiveSet.length - 1,
      })
    ]!
  const noun =
    nounSet[
      getRandomIntegerBetween({
        min: 0,
        max: nounSet.length - 1,
      })
    ]!

  const text: Array<string> = []

  text.push(adjective)
  text.push(noun)

  return text.join(input.separator ?? '-')
}

export function getWeightedSymbolSets(list: Array<WeightedSymbolSet>) {
  return list
    .map(item => {
      switch (item.value.form) {
        case 'anonymous-symbol-set': {
          const list = item.value.list
          const weight = item.weight
          return { list, weight }
        }
        case 'named-symbol-set': {
          const SYMBOL_SET_CONTENT = getConfig('symbol_set_content')
          const list = SYMBOL_SET_CONTENT[item.value.name]?.list
          const weight = item.weight
          return { list, weight }
        }
      }
    })
    .filter(x => x)
}

export function getWeightedWordSets(list: Array<WeightedWordSet>) {
  return list
    .map(item => {
      switch (item.value.form) {
        case 'anonymous-word-set': {
          const list = item.value.list
          const weight = item.weight
          return { list, weight }
        }
        case 'named-word-set': {
          const WORD_SET = getConfig('word_set')
          const list = WORD_SET[item.value.name]
          if (list) {
            const weight = item.weight
            return { list, weight }
          }
        }
      }
    })
    .filter(x => x) as Array<{ list: Array<string>; weight: number }>
}

export function getWordSets(
  list: Array<NamedWordSet | AnonymousWordSet>,
) {
  return list
    .map(item => {
      switch (item.form) {
        case 'anonymous-word-set': {
          return item.list
        }
        case 'named-word-set': {
          const WORD_SET = getConfig('word_set')
          const list = WORD_SET[item.name]
          return list
        }
      }
    })
    .filter(x => x)
}
