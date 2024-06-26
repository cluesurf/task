import { Action, Object, Tool } from '../shared.js'

// export type TestExtension = {
//   'convert:ffmpeg:video': ConvertFileTest
//   'convert:image-magick:image': ConvertFileTest
//   'convert:pandoc:document': ConvertFileTest
//   'convert:libre-office:document': ConvertFileTest
//   'convert:calibre:document': ConvertFileTest
// }

export type Test<T extends Tool, A extends Action, O extends Object> = {
  tool: T
  action: A
  type: O
}
