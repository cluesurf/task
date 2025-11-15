import contentTypeParse from 'content-type'
import acceptLanguageParser from 'accept-language-parser'

export function parseHttpContentTypeHeader(value: string) {
  return contentTypeParse.parse(value)
}

// {
//   code: "en",
//   region: "GB",
//   quality: 1.0
// },
export function parseHttpAcceptHeader(value: string) {
  return acceptLanguageParser.parse(value)
}
