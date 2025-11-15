import { Test } from 'tape'
import {
  generateHaikuPhrase,
  generateRandomSymbols,
  generateRandomPhrase,
} from '~/code/call/generate/string/shared'

export default function testGenerateString(test: Test['test']) {
  test('generate random latin string', async t => {
    const text = await generateRandomSymbols({
      format: 'random_symbols',
      maxSize: 16,
      minSize: 16,
      inclusions: [
        {
          value: {
            form: 'named-symbol-set',
            name: 'latin-lowercase',
          },
          weight: 20,
        },
        {
          value: {
            form: 'named-symbol-set',
            name: 'latin-number',
          },
          weight: 80,
        },
      ],
    })
    console.log(text)
  })

  test('generate random english phrase', async t => {
    const text = await generateRandomPhrase({
      format: 'random_phrase',
      maxSize: 4,
      minSize: 6,
      inclusions: [
        {
          value: {
            form: 'named-word-set',
            name: 'pleasant-adjective',
          },
          weight: 20,
        },
        {
          value: {
            form: 'named-word-set',
            name: 'pleasant-noun',
          },
          weight: 80,
        },
      ],
    })
    console.log(text)
  })

  test('generate pleasant haiku phrase', async t => {
    const text = await generateHaikuPhrase({
      format: 'haiku_phrase',
      adjectives: [
        {
          form: 'named-word-set',
          name: 'pleasant-adjective',
        },
      ],
      nouns: [
        {
          form: 'named-word-set',
          name: 'pleasant-noun',
        },
      ],
    })
    console.log(text)
  })
}
