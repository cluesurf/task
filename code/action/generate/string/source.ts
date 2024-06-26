import { Form, Hash, List } from '@termsurf/form'

const weight = {
  like: 'integer',
  size: { rise_meet: 1, fall_meet: 99 },
}

export const symbol_set: List = {
  form: 'list',
  list: [
    'latin-lowercase',
    'latin-uppercase',
    'latin-number',
    'latin-symbol',
  ],
}

export const named_symbol_set: Form = {
  form: 'form',
  link: {
    form: { take: ['named-symbol-set'] },
    name: { like: 'symbol_set' },
  },
}

export const anonymous_symbol_set: Form = {
  form: 'form',
  link: {
    form: { take: ['anonymous-symbol-set'] },
    list: { like: 'string' },
  },
}

export const weighted_symbol_set: Form = {
  form: 'form',
  link: {
    value: {
      case: [
        { like: 'named_symbol_set' },
        { like: 'anonymous_symbol_set' },
      ],
    },
    weight,
  },
}

export const word_set: List = {
  form: 'list',
  list: ['pleasant-adjective', 'pleasant-noun'],
}

export const anonymous_word_set: Form = {
  form: 'form',
  link: {
    form: { take: ['anonymous-word-set'] },
    list: { like: 'string', list: true },
  },
}

export const named_word_set: Form = {
  form: 'form',
  link: {
    form: { take: ['named-word-set'] },
    name: { like: 'word_set' },
  },
}

export const weighted_word_set: Form = {
  form: 'form',
  link: {
    value: {
      case: [
        { like: 'named_word_set' },
        { like: 'anonymous_word_set' },
      ],
    },
    weight,
  },
}

export const symbol_set_data: Form = {
  form: 'form',
  link: {
    list: {
      like: 'string',
      size: { fall_meet: 256, rise_meet: 1 },
    },
  },
}

export const symbol_set_content: Hash = {
  form: 'hash',
  link: 'symbol_set',
  bond: {
    like: 'symbol_set_data',
  },
  hash: {
    'latin-lowercase': { list: 'abcdefghijklmnopqrstuvwxyz' },
    'latin-uppercase': { list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    'latin-number': { list: '0123456789' },
    'latin-symbol': { list: '!@#$%^&*()+_-=}{[]|:;"/?.><,`~' },
  },
}

export const word_set_data: Form = {
  form: 'form',
  link: {
    name: {
      like: 'string',
    },
  },
}

export const word_set_content: Hash = {
  form: 'hash',
  link: 'word_set',
  bond: {
    like: 'word_set_data',
  },
  hash: {
    'pleasant-noun': { name: 'pleasant_noun' },
    'pleasant-adjective': { name: 'pleasant_adjective' },
  },
}

export const generate_random_symbols: Form = {
  form: 'form',
  link: {
    format: { take: ['random_symbols'] },
    minSize: { like: 'integer', need: false, fall: 4 },
    maxSize: { like: 'integer', need: false, fall: 16 },
    exclusions: {
      like: 'weighted_symbol_set',
      list: true,
      need: false,
    },
    inclusions: {
      like: 'weighted_symbol_set',
      list: true,
    },
  },
}

export const generate_random_phrase: Form = {
  form: 'form',
  link: {
    format: { take: ['random_phrase'] },
    separator: { like: 'string', need: false, fall: '-' },
    minSize: {
      like: 'integer',
      need: false,
      fall: 2,
      size: { fall_meet: 8, rise_meet: 2 },
    },
    maxSize: {
      like: 'integer',
      need: false,
      fall: 4,
      size: { fall_meet: 8, rise_meet: 2 },
    },
    exclusions: {
      like: 'weighted_word_set',
      list: true,
      need: false,
    },
    inclusions: {
      like: 'weighted_word_set',
      list: true,
    },
  },
}

export const generate_haiku_phrase: Form = {
  form: 'form',
  link: {
    format: { take: ['haiku_phrase'] },
    separator: { like: 'string', need: false, fall: '-' },
    adjectives: {
      case: [
        { like: 'named_word_set' },
        { like: 'anonymous_word_set' },
      ],
      list: true,
    },
    nouns: {
      case: [
        { like: 'named_word_set' },
        { like: 'anonymous_word_set' },
      ],
      list: true,
    },
  },
}

export const pleasant_adjective: List = {
  form: 'list',
  list: [
    'aged',
    'ancient',
    'autumn',
    'billowing',
    'bitter',
    'black',
    'blue',
    'bold',
    'broad',
    'broken',
    'calm',
    'cold',
    'cool',
    'crimson',
    'curly',
    'damp',
    'dark',
    'dawn',
    'delicate',
    'divine',
    'dry',
    'empty',
    'falling',
    'fancy',
    'flat',
    'floral',
    'fragrant',
    'frosty',
    'gentle',
    'green',
    'hidden',
    'holy',
    'icy',
    'jolly',
    'late',
    'lingering',
    'little',
    'lively',
    'long',
    'lucky',
    'misty',
    'morning',
    'muddy',
    'mute',
    'nameless',
    'noisy',
    'odd',
    'old',
    'orange',
    'patient',
    'plain',
    'polished',
    'proud',
    'purple',
    'quiet',
    'rapid',
    'raspy',
    'red',
    'restless',
    'rough',
    'round',
    'royal',
    'shiny',
    'shrill',
    'shy',
    'silent',
    'small',
    'snowy',
    'soft',
    'solitary',
    'sparkling',
    'spring',
    'square',
    'steep',
    'still',
    'summer',
    'super',
    'sweet',
    'throbbing',
    'tight',
    'tiny',
    'twilight',
    'wandering',
    'weathered',
    'white',
    'wild',
    'winter',
    'wispy',
    'withered',
    'yellow',
    'young',
  ],
}

export const pleasant_noun: List = {
  form: 'list',
  list: [
    'art',
    'band',
    'bar',
    'base',
    'bird',
    'block',
    'boat',
    'bonus',
    'bread',
    'breeze',
    'brook',
    'bush',
    'butterfly',
    'cake',
    'cell',
    'cherry',
    'cloud',
    'credit',
    'darkness',
    'dawn',
    'dew',
    'disk',
    'dream',
    'dust',
    'feather',
    'field',
    'fire',
    'firefly',
    'flower',
    'fog',
    'forest',
    'frog',
    'frost',
    'glade',
    'glitter',
    'grass',
    'hall',
    'hat',
    'haze',
    'heart',
    'hill',
    'king',
    'lab',
    'lake',
    'leaf',
    'limit',
    'math',
    'meadow',
    'mode',
    'moon',
    'morning',
    'mountain',
    'mouse',
    'mud',
    'night',
    'paper',
    'pine',
    'poetry',
    'pond',
    'queen',
    'rain',
    'recipe',
    'resonance',
    'rice',
    'river',
    'salad',
    'scene',
    'sea',
    'shadow',
    'shape',
    'silence',
    'sky',
    'smoke',
    'snow',
    'snowflake',
    'sound',
    'star',
    'sun',
    'sun',
    'sunset',
    'surf',
    'term',
    'thunder',
    'tooth',
    'tree',
    'truth',
    'union',
    'unit',
    'violet',
    'voice',
    'water',
    'waterfall',
    'wave',
    'wildflower',
    'wind',
    'wood',
  ],
}
