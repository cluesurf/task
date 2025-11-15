export type AnonymousSymbolSet = {
  form: 'anonymous-symbol-set'
  list: string
}
export type AnonymousWordSet = {
  form: 'anonymous-word-set'
  list: Array<string>
}
export type GenerateHaikuPhrase = {
  format: 'haiku_phrase'
  separator?: string
  adjectives: Array<NamedWordSet | AnonymousWordSet>
  nouns: Array<NamedWordSet | AnonymousWordSet>
}
export type GenerateRandomPhrase = {
  format: 'random_phrase'
  separator?: string
  minSize?: number
  maxSize?: number
  exclusions?: Array<WeightedWordSet>
  inclusions: Array<WeightedWordSet>
}
export type GenerateRandomSymbols = {
  format: 'random_symbols'
  minSize?: number
  maxSize?: number
  exclusions?: Array<WeightedSymbolSet>
  inclusions: Array<WeightedSymbolSet>
}
export type NamedSymbolSet = {
  form: 'named-symbol-set'
  name: SymbolSet
}
export type NamedWordSet = {
  form: 'named-word-set'
  name: WordSet
}

export type PleasantAdjective =
  | 'aged'
  | 'ancient'
  | 'autumn'
  | 'billowing'
  | 'bitter'
  | 'black'
  | 'blue'
  | 'bold'
  | 'broad'
  | 'broken'
  | 'calm'
  | 'cold'
  | 'cool'
  | 'crimson'
  | 'curly'
  | 'damp'
  | 'dark'
  | 'dawn'
  | 'delicate'
  | 'divine'
  | 'dry'
  | 'empty'
  | 'falling'
  | 'fancy'
  | 'flat'
  | 'floral'
  | 'fragrant'
  | 'frosty'
  | 'gentle'
  | 'green'
  | 'hidden'
  | 'holy'
  | 'icy'
  | 'jolly'
  | 'late'
  | 'lingering'
  | 'little'
  | 'lively'
  | 'long'
  | 'lucky'
  | 'misty'
  | 'morning'
  | 'muddy'
  | 'mute'
  | 'nameless'
  | 'noisy'
  | 'odd'
  | 'old'
  | 'orange'
  | 'patient'
  | 'plain'
  | 'polished'
  | 'proud'
  | 'purple'
  | 'quiet'
  | 'rapid'
  | 'raspy'
  | 'red'
  | 'restless'
  | 'rough'
  | 'round'
  | 'royal'
  | 'shiny'
  | 'shrill'
  | 'shy'
  | 'silent'
  | 'small'
  | 'snowy'
  | 'soft'
  | 'solitary'
  | 'sparkling'
  | 'spring'
  | 'square'
  | 'steep'
  | 'still'
  | 'summer'
  | 'super'
  | 'sweet'
  | 'throbbing'
  | 'tight'
  | 'tiny'
  | 'twilight'
  | 'wandering'
  | 'weathered'
  | 'white'
  | 'wild'
  | 'winter'
  | 'wispy'
  | 'withered'
  | 'yellow'
  | 'young'

export type PleasantNoun =
  | 'art'
  | 'band'
  | 'bar'
  | 'base'
  | 'bird'
  | 'block'
  | 'boat'
  | 'bonus'
  | 'bread'
  | 'breeze'
  | 'brook'
  | 'bush'
  | 'butterfly'
  | 'cake'
  | 'cell'
  | 'cherry'
  | 'cloud'
  | 'credit'
  | 'darkness'
  | 'dawn'
  | 'dew'
  | 'disk'
  | 'dream'
  | 'dust'
  | 'feather'
  | 'field'
  | 'fire'
  | 'firefly'
  | 'flower'
  | 'fog'
  | 'forest'
  | 'frog'
  | 'frost'
  | 'glade'
  | 'glitter'
  | 'grass'
  | 'hall'
  | 'hat'
  | 'haze'
  | 'heart'
  | 'hill'
  | 'king'
  | 'lab'
  | 'lake'
  | 'leaf'
  | 'limit'
  | 'math'
  | 'meadow'
  | 'mode'
  | 'moon'
  | 'morning'
  | 'mountain'
  | 'mouse'
  | 'mud'
  | 'night'
  | 'paper'
  | 'pine'
  | 'poetry'
  | 'pond'
  | 'queen'
  | 'rain'
  | 'recipe'
  | 'resonance'
  | 'rice'
  | 'river'
  | 'salad'
  | 'scene'
  | 'sea'
  | 'shadow'
  | 'shape'
  | 'silence'
  | 'sky'
  | 'smoke'
  | 'snow'
  | 'snowflake'
  | 'sound'
  | 'star'
  | 'sun'
  | 'sun'
  | 'sunset'
  | 'surf'
  | 'term'
  | 'thunder'
  | 'tooth'
  | 'tree'
  | 'truth'
  | 'union'
  | 'unit'
  | 'violet'
  | 'voice'
  | 'water'
  | 'waterfall'
  | 'wave'
  | 'wildflower'
  | 'wind'
  | 'wood'

export type SymbolSet =
  | 'latin-lowercase'
  | 'latin-uppercase'
  | 'latin-number'
  | 'latin-symbol'
export type SymbolSetContentValue = SymbolSetData

export type SymbolSetContent = Record<SymbolSet, SymbolSetContentValue>
export type SymbolSetData = {
  list: string
}
export type WeightedSymbolSet = {
  value: NamedSymbolSet | AnonymousSymbolSet
  weight: number
}
export type WeightedWordSet = {
  value: NamedWordSet | AnonymousWordSet
  weight: number
}

export type WordSet = 'pleasant-adjective' | 'pleasant-noun'
export type WordSetContentValue = WordSetData

export type WordSetContent = Record<WordSet, WordSetContentValue>
export type WordSetData = {
  name: string
}
