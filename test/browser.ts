import task from '~/code/browser'
import test from 'tape'
import testConvertFontWithFontForgeBrowser from './convert/font/fontforge/browser'
import testConvertImageWithImageMagickBrowser from './convert/image/imagemagick/browser'
import testConvertArchiveBrowser from './convert/archive/browser'

// must start express server with `pnpm test:bind`
task.configure('remote', 'http://localhost:3000/v2')

const LIST = [
  testConvertFontWithFontForgeBrowser,
  testConvertImageWithImageMagickBrowser,
  testConvertArchiveBrowser,
]

LIST.forEach(plugin => plugin(test))
