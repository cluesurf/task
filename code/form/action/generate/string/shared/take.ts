import { z } from 'zod'

import {
  PleasantAdjective,
  PleasantNoun,
  SymbolSet,
  WordSet,
} from '~/code/form/action/generate/string/shared'
import {
  PLEASANT_ADJECTIVE,
  PLEASANT_NOUN,
  SYMBOL_SET,
  WORD_SET,
} from '~/code/form/action/generate/string/shared/base'

export const AnonymousSymbolSetParser = z.object({
  form: z.literal('anonymous-symbol-set'),
  list: z.string(),
})

export type AnonymousSymbolSetRecord = z.infer<
  typeof AnonymousSymbolSetParser
>

export const AnonymousWordSetParser = z.object({
  form: z.literal('anonymous-word-set'),
  list: z.array(z.string()),
})

export type AnonymousWordSetRecord = z.infer<
  typeof AnonymousWordSetParser
>

export const GenerateHaikuPhraseParser = z.object({
  format: z.literal('haiku_phrase'),
  separator: z.optional(z.string()).default('-'),
  adjectives: z.array(
    z.union([
      z.lazy(() => NamedWordSetParser),
      z.lazy(() => AnonymousWordSetParser),
    ]),
  ),
  nouns: z.array(
    z.union([
      z.lazy(() => NamedWordSetParser),
      z.lazy(() => AnonymousWordSetParser),
    ]),
  ),
})

export type GenerateHaikuPhraseRecord = z.infer<
  typeof GenerateHaikuPhraseParser
>

export const GenerateRandomPhraseParser = z.object({
  format: z.literal('random_phrase'),
  separator: z.optional(z.string()).default('-'),
  minSize: z.optional(z.number().int().gte(2).lte(8)).default(2),
  maxSize: z.optional(z.number().int().gte(2).lte(8)).default(4),
  exclusions: z.optional(z.array(z.lazy(() => WeightedWordSetParser))),
  inclusions: z.array(z.lazy(() => WeightedWordSetParser)),
})

export type GenerateRandomPhraseRecord = z.infer<
  typeof GenerateRandomPhraseParser
>

export const GenerateRandomSymbolsParser = z.object({
  format: z.literal('random_symbols'),
  minSize: z.optional(z.number().int()).default(4),
  maxSize: z.optional(z.number().int()).default(16),
  exclusions: z.optional(
    z.array(z.lazy(() => WeightedSymbolSetParser)),
  ),
  inclusions: z.array(z.lazy(() => WeightedSymbolSetParser)),
})

export type GenerateRandomSymbolsRecord = z.infer<
  typeof GenerateRandomSymbolsParser
>

export const NamedSymbolSetParser = z.object({
  form: z.literal('named-symbol-set'),
  name: z.lazy(() => SymbolSetParser),
})

export type NamedSymbolSetRecord = z.infer<typeof NamedSymbolSetParser>

export const NamedWordSetParser = z.object({
  form: z.literal('named-word-set'),
  name: z.lazy(() => WordSetParser),
})

export type NamedWordSetRecord = z.infer<typeof NamedWordSetParser>

export const PleasantAdjectiveParser = z.enum(
  PLEASANT_ADJECTIVE as readonly [string, ...string[]],
) as z.ZodType<PleasantAdjective>

export const PleasantNounParser = z.enum(
  PLEASANT_NOUN as readonly [string, ...string[]],
) as z.ZodType<PleasantNoun>

export const SymbolSetParser = z.enum(
  SYMBOL_SET as readonly [string, ...string[]],
) as z.ZodType<SymbolSet>

export const SymbolSetDataParser = z.object({
  list: z.string().gte(1).lte(256),
})

export type SymbolSetDataRecord = z.infer<typeof SymbolSetDataParser>

export const WeightedSymbolSetParser = z.object({
  value: z.union([
    z.lazy(() => NamedSymbolSetParser),
    z.lazy(() => AnonymousSymbolSetParser),
  ]),
  weight: z.number().int().gte(1).lte(99),
})

export type WeightedSymbolSetRecord = z.infer<
  typeof WeightedSymbolSetParser
>

export const WeightedWordSetParser = z.object({
  value: z.union([
    z.lazy(() => NamedWordSetParser),
    z.lazy(() => AnonymousWordSetParser),
  ]),
  weight: z.number().int().gte(1).lte(99),
})

export type WeightedWordSetRecord = z.infer<
  typeof WeightedWordSetParser
>

export const WordSetParser = z.enum(
  WORD_SET as readonly [string, ...string[]],
) as z.ZodType<WordSet>

export const WordSetDataParser = z.object({
  name: z.string(),
})

export type WordSetDataRecord = z.infer<typeof WordSetDataParser>
