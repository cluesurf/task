import * as arabic from '@lancejpollard/gematria.js/host/language/arabic'
import * as coptic from '@lancejpollard/gematria.js/host/language/coptic'
import * as devanagari from '@lancejpollard/gematria.js/host/language/devanagari'
import * as elderFuthark from '@lancejpollard/gematria.js/host/language/elder-futhark'
import * as greek from '@lancejpollard/gematria.js/host/language/greek'
import * as gothic from '@lancejpollard/gematria.js/host/language/gothic'
import * as hebrew from '@lancejpollard/gematria.js/host/language/hebrew'
import * as japanese from '@lancejpollard/gematria.js/host/language/japanese'
import * as latin from '@lancejpollard/gematria.js/host/language/latin'
import * as tibetan from '@lancejpollard/gematria.js/host/language/tibetan'
import { sum, peak } from '@lancejpollard/gematria.js/host/index'
import {
  CalculateGematria,
  CalculateGematriaParser,
  GematriaSystemCalculation,
  GematriaSystemCalculationResult,
  SharedGematriaLanguage,
} from '~/code/type/shared/parser.js'
import { detect as detectScript } from '@termsurf/talk/host/code/script/detect'
import kink from '~/code/tool/shared/kink.js'
import merge from 'lodash/merge.js'
import { getConfig } from '~/code/tool/shared/config.js'

export function calculateGematria(source: CalculateGematria) {
  const input = CalculateGematriaParser().parse(source)

  const { form, rank } = detectScript([...input.input.string.decoded])

  if (rank !== 1) {
    throw kink('invalid_gematria_script_rank', { form, rank })
  }

  const SHARED_GEMATRIA_LANGUAGE = getConfig('shared_gematria_language')

  if (
    !SHARED_GEMATRIA_LANGUAGE.includes(form as SharedGematriaLanguage)
  ) {
    throw kink('invalid_gematria_script', { form })
  }

  const encoded = input.input.string.decoded.replace(/[\s]+/g, '+')

  const merged = merge(input, {
    input: {
      string: { encoded },
    },
  })

  switch (form) {
    case 'arabic':
      return calculateArabicGematria(merged)
    case 'hebrew':
      return calculateHebrewGematria(merged)
    case 'latin':
      return calculateLatinGematria(merged)
    case 'greek':
      return calculateGreekGematria(merged)
    case 'tibetan':
      return calculateTibetanGematria(merged)
    case 'japanese':
      return calculateJapaneseGematria(merged)
    case 'devanagari':
      return calculateDevanagariGematria(merged)
  }
}

export function calculateJapaneseGematria(input: CalculateGematria) {
  const calculation: Array<GematriaSystemCalculation> = []
  const symbolSet = [
    ...(input.input.string.encoded as string).replace(/\s+/g, ''),
  ]
  const hiraganaDigit = japanese.mapHiragana9(symbolSet)
  const hiraganaAlphabet = japanese.mapHiragana27(symbolSet)
  const katakanaDigit = japanese.mapKatakana9(symbolSet)
  const katakanaAlphabet = japanese.mapKatakana27(symbolSet)

  calculation.push({
    system: {
      slug: 'hiragana-alphabet',
      title: 'Hiragana Alphabet',
    },
    summation: sum(hiraganaAlphabet),
    reduction: peak(hiraganaAlphabet),
  })

  calculation.push({
    system: {
      slug: 'hiragana-digit',
      title: 'Hiragana Digit',
    },
    summation: sum(hiraganaDigit),
    reduction: peak(hiraganaDigit),
  })

  calculation.push({
    system: {
      slug: 'katakana-alphabet',
      title: 'Katakana Alphabet',
    },
    summation: sum(katakanaAlphabet),
    reduction: peak(katakanaAlphabet),
  })

  calculation.push({
    system: {
      slug: 'katakana-digit',
      title: 'Katakana Digit',
    },
    summation: sum(katakanaDigit),
    reduction: peak(katakanaDigit),
  })

  return {
    string: input.input.string as { encoded: string; decoded: string },
    script: {
      slug: 'japanese',
      title: 'Japanese',
    },
    calculation,
  }
}

export function calculateDevanagariGematria(input: CalculateGematria) {
  const calculation: Array<GematriaSystemCalculation> = []
  const symbolSet = [
    ...(input.input.string.encoded as string).replace(/\s+/g, ''),
  ]
  const digit = devanagari.map9(symbolSet)
  const alphabet = devanagari.map27(symbolSet)

  calculation.push({
    system: {
      slug: 'alphabet',
      title: 'Alphabet',
    },
    summation: sum(alphabet),
    reduction: peak(alphabet),
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
      slug: 'devanagari',
      title: 'Devanagari',
    },
    calculation,
  }
}

export function calculateTibetanGematria(input: CalculateGematria) {
  const calculation: Array<GematriaSystemCalculation> = []
  const symbolSet = [
    ...(input.input.string.encoded as string).replace(/\s+/g, ''),
  ]
  const digit = tibetan.map9(symbolSet)
  const alphabet = tibetan.map27(symbolSet)

  calculation.push({
    system: {
      slug: 'alphabet',
      title: 'Alphabet',
    },
    summation: sum(alphabet),
    reduction: peak(alphabet),
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
      slug: 'tibetan',
      title: 'Tibetan',
    },
    calculation,
  }
}

export function calculateArabicGematria(input: CalculateGematria) {
  const calculation: Array<GematriaSystemCalculation> = []
  const symbolSet = [
    ...(input.input.string.encoded as string).replace(/\s+/g, ''),
  ]
  const digit = arabic.map9(symbolSet)
  const abjad = arabic.mapAbjad(symbolSet)

  calculation.push({
    system: {
      slug: 'abjad',
      title: 'Abjad',
    },
    summation: sum(abjad),
    reduction: peak(abjad),
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
      slug: 'arabic',
      title: 'Arabic',
    },
    calculation,
  }
}

export function calculateHebrewGematria(input: CalculateGematria) {
  const calculation: Array<GematriaSystemCalculation> = []
  const symbolSet = [
    ...(input.input.string.encoded as string).replace(/\s+/g, ''),
  ]
  const misparHechrachi = hebrew.mapMisparHechrachi(symbolSet)
  const misparGadol = hebrew.mapMisparGadol(symbolSet)
  const nine = hebrew.map9(symbolSet)

  calculation.push({
    system: {
      slug: 'mispar-hechrachi',
      title: 'Mispar Hechrachi',
    },
    summation: sum(misparHechrachi),
    reduction: peak(misparHechrachi),
  })

  calculation.push({
    system: {
      slug: 'mispar-gadol',
      title: 'Mispar Gadol',
    },
    summation: sum(misparGadol),
    reduction: peak(misparGadol),
  })

  calculation.push({
    system: {
      slug: 'digit',
      title: 'Digit',
    },
    summation: sum(nine),
    reduction: peak(nine),
  })

  return {
    string: input.input.string as { encoded: string; decoded: string },
    script: {
      slug: 'greek',
      title: 'Greek',
    },
    calculation,
  }
}

export function calculateLatinGematria(
  input: CalculateGematria,
): GematriaSystemCalculationResult {
  const calculation: Array<GematriaSystemCalculation> = []
  const symbolSet = [
    ...(input.input.string.encoded as string)
      .toLowerCase()
      .replace(/\s+/g, ''),
  ]
  const hebrew = latin.mapHebrew(symbolSet)
  const chaldean = latin.mapChaldean(symbolSet)
  const alphabet = latin.mapAlphabet(symbolSet)
  const nine = latin.map9(symbolSet)
  const pythagorean = latin.mapPythagorean(symbolSet)
  const kabbalah = latin.mapKabbalah(symbolSet)

  calculation.push({
    system: {
      slug: 'hebrew',
      title: 'Hebrew',
    },
    summation: sum(hebrew),
    reduction: peak(hebrew),
  })

  calculation.push({
    system: {
      slug: 'chaldean',
      title: 'Chaldean',
    },
    summation: sum(chaldean),
    reduction: peak(chaldean),
  })

  calculation.push({
    system: {
      slug: 'pythagorean',
      title: 'Pythagorean',
    },
    summation: sum(pythagorean),
    reduction: peak(pythagorean),
  })

  calculation.push({
    system: {
      slug: 'kabbalah',
      title: 'Kabbalah',
    },
    summation: sum(kabbalah),
    reduction: peak(kabbalah),
  })

  calculation.push({
    system: {
      slug: 'alphabet',
      title: 'Alphabet',
    },
    summation: sum(alphabet),
    reduction: peak(alphabet),
  })

  calculation.push({
    system: {
      slug: 'digit',
      title: 'Digit',
    },
    summation: sum(nine),
    reduction: peak(nine),
  })

  return {
    string: input.input.string as { encoded: string; decoded: string },
    script: {
      slug: 'latin',
      title: 'Latin',
    },
    calculation,
  }
}

export function calculateGreekGematria(input: CalculateGematria) {
  const calculation: Array<GematriaSystemCalculation> = []
  const symbolSet = [
    ...(input.input.string.encoded as string)
      .toLowerCase()
      .replace(/\s+/g, ''),
  ]
  const digit = greek.map9(symbolSet)
  const alphabet = greek.mapAlphabet(symbolSet)

  calculation.push({
    system: {
      slug: 'alphabet',
      title: 'Alphabet',
    },
    summation: sum(alphabet),
    reduction: peak(alphabet),
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
      slug: 'greek',
      title: 'Greek',
    },
    calculation,
  }
}
