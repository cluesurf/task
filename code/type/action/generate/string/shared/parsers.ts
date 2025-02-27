import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  AnonymousSymbolSet,
  AnonymousWordSet,
  GenerateHaikuPhrase,
  GenerateRandomPhrase,
  GenerateRandomSymbols,
  NamedSymbolSet,
  NamedWordSet,
  PleasantAdjective,
  PleasantNoun,
  SymbolSet,
  SymbolSetData,
  WeightedSymbolSet,
  WeightedWordSet,
  WordSet,
  WordSetData,
} from '~/code/type/action/generate/string/shared/index'

let AnonymousSymbolSetModel: z.ZodType<AnonymousSymbolSet>

export const AnonymousSymbolSetParser =
  (): z.ZodType<AnonymousSymbolSet> => {
    if (!AnonymousSymbolSetModel) {
      AnonymousSymbolSetModel = z.object({
        form: z.literal('anonymous-symbol-set'),
        list: z.string(),
      }) as z.ZodType<AnonymousSymbolSet>
    }
    return AnonymousSymbolSetModel!
  }

let AnonymousWordSetModel: z.ZodType<AnonymousWordSet>

export const AnonymousWordSetParser =
  (): z.ZodType<AnonymousWordSet> => {
    if (!AnonymousWordSetModel) {
      AnonymousWordSetModel = z.object({
        form: z.literal('anonymous-word-set'),
        list: z.array(z.string()),
      }) as z.ZodType<AnonymousWordSet>
    }
    return AnonymousWordSetModel!
  }

let GenerateHaikuPhraseModel: z.ZodType<GenerateHaikuPhrase>

export const GenerateHaikuPhraseParser =
  (): z.ZodType<GenerateHaikuPhrase> => {
    if (!GenerateHaikuPhraseModel) {
      GenerateHaikuPhraseModel = z.object({
        format: z.literal('haiku_phrase'),
        separator: z.optional(z.string()).default('-'),
        adjectives: z.array(
          z.union([
            z.lazy(() => NamedWordSetParser()),
            z.lazy(() => AnonymousWordSetParser()),
          ]),
        ),
        nouns: z.array(
          z.union([
            z.lazy(() => NamedWordSetParser()),
            z.lazy(() => AnonymousWordSetParser()),
          ]),
        ),
      }) as z.ZodType<GenerateHaikuPhrase>
    }
    return GenerateHaikuPhraseModel!
  }

let GenerateRandomPhraseModel: z.ZodType<GenerateRandomPhrase>

export const GenerateRandomPhraseParser =
  (): z.ZodType<GenerateRandomPhrase> => {
    if (!GenerateRandomPhraseModel) {
      GenerateRandomPhraseModel = z.object({
        format: z.literal('random_phrase'),
        separator: z.optional(z.string()).default('-'),
        minSize: z.optional(z.number().int().gte(2).lte(8)).default(2),
        maxSize: z.optional(z.number().int().gte(2).lte(8)).default(4),
        exclusions: z.optional(
          z.array(z.lazy(() => WeightedWordSetParser())),
        ),
        inclusions: z.array(z.lazy(() => WeightedWordSetParser())),
      }) as z.ZodType<GenerateRandomPhrase>
    }
    return GenerateRandomPhraseModel!
  }

let GenerateRandomSymbolsModel: z.ZodType<GenerateRandomSymbols>

export const GenerateRandomSymbolsParser =
  (): z.ZodType<GenerateRandomSymbols> => {
    if (!GenerateRandomSymbolsModel) {
      GenerateRandomSymbolsModel = z.object({
        format: z.literal('random_symbols'),
        minSize: z.optional(z.number().int()).default(4),
        maxSize: z.optional(z.number().int()).default(16),
        exclusions: z.optional(
          z.array(z.lazy(() => WeightedSymbolSetParser())),
        ),
        inclusions: z.array(z.lazy(() => WeightedSymbolSetParser())),
      }) as z.ZodType<GenerateRandomSymbols>
    }
    return GenerateRandomSymbolsModel!
  }

let NamedSymbolSetModel: z.ZodType<NamedSymbolSet>

export const NamedSymbolSetParser = (): z.ZodType<NamedSymbolSet> => {
  if (!NamedSymbolSetModel) {
    NamedSymbolSetModel = z.object({
      form: z.literal('named-symbol-set'),
      name: z.lazy(() => SymbolSetParser()),
    }) as z.ZodType<NamedSymbolSet>
  }
  return NamedSymbolSetModel!
}

let NamedWordSetModel: z.ZodType<NamedWordSet>

export const NamedWordSetParser = (): z.ZodType<NamedWordSet> => {
  if (!NamedWordSetModel) {
    NamedWordSetModel = z.object({
      form: z.literal('named-word-set'),
      name: z.lazy(() => WordSetParser()),
    }) as z.ZodType<NamedWordSet>
  }
  return NamedWordSetModel!
}

let PleasantAdjectiveModel: z.ZodType<PleasantAdjective>

export const PleasantAdjectiveParser = () => {
  if (!PleasantAdjectiveModel) {
    PleasantAdjectiveModel = z.enum(
      LOAD('pleasant_adjective') as readonly [string, ...string[]],
    ) as z.ZodType<PleasantAdjective>
  }
  return PleasantAdjectiveModel!
}

let PleasantNounModel: z.ZodType<PleasantNoun>

export const PleasantNounParser = () => {
  if (!PleasantNounModel) {
    PleasantNounModel = z.enum(
      LOAD('pleasant_noun') as readonly [string, ...string[]],
    ) as z.ZodType<PleasantNoun>
  }
  return PleasantNounModel!
}

let SymbolSetModel: z.ZodType<SymbolSet>

export const SymbolSetParser = () => {
  if (!SymbolSetModel) {
    SymbolSetModel = z.enum(
      LOAD('symbol_set') as readonly [string, ...string[]],
    ) as z.ZodType<SymbolSet>
  }
  return SymbolSetModel!
}

let SymbolSetDataModel: z.ZodType<SymbolSetData>

export const SymbolSetDataParser = (): z.ZodType<SymbolSetData> => {
  if (!SymbolSetDataModel) {
    SymbolSetDataModel = z.object({
      list: z.string().gte(1).lte(256),
    }) as z.ZodType<SymbolSetData>
  }
  return SymbolSetDataModel!
}

let WeightedSymbolSetModel: z.ZodType<WeightedSymbolSet>

export const WeightedSymbolSetParser =
  (): z.ZodType<WeightedSymbolSet> => {
    if (!WeightedSymbolSetModel) {
      WeightedSymbolSetModel = z.object({
        value: z.union([
          z.lazy(() => NamedSymbolSetParser()),
          z.lazy(() => AnonymousSymbolSetParser()),
        ]),
        weight: z.number().int().gte(1).lte(99),
      }) as z.ZodType<WeightedSymbolSet>
    }
    return WeightedSymbolSetModel!
  }

let WeightedWordSetModel: z.ZodType<WeightedWordSet>

export const WeightedWordSetParser = (): z.ZodType<WeightedWordSet> => {
  if (!WeightedWordSetModel) {
    WeightedWordSetModel = z.object({
      value: z.union([
        z.lazy(() => NamedWordSetParser()),
        z.lazy(() => AnonymousWordSetParser()),
      ]),
      weight: z.number().int().gte(1).lte(99),
    }) as z.ZodType<WeightedWordSet>
  }
  return WeightedWordSetModel!
}

let WordSetModel: z.ZodType<WordSet>

export const WordSetParser = () => {
  if (!WordSetModel) {
    WordSetModel = z.enum(
      LOAD('word_set') as readonly [string, ...string[]],
    ) as z.ZodType<WordSet>
  }
  return WordSetModel!
}

let WordSetDataModel: z.ZodType<WordSetData>

export const WordSetDataParser = (): z.ZodType<WordSetData> => {
  if (!WordSetDataModel) {
    WordSetDataModel = z.object({
      name: z.string(),
    }) as z.ZodType<WordSetData>
  }
  return WordSetDataModel!
}
