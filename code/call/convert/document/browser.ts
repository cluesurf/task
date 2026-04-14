import {
  ConvertDocumentWithCalibreBrowserInput,
} from '~/code/form/action/convert/calibre/browser'
import {
  ConvertLatexToPngBrowserInput,
} from '~/code/form/action/convert/latex-to-png/browser'
import {
  ConvertDocumentWithLibreOfficeBrowserInput,
} from '~/code/form/action/convert/libre-office/browser'
import {
  ConvertDocumentWithPandocBrowserInput,
} from '~/code/form/action/convert/pandoc/browser'
import {
  ConvertMarkdownWithPuppeteerBrowserInput,
  ConvertTxtWithPuppeteerBrowserInput,
} from '~/code/form/action/convert/puppeteer/browser'
import {
  testConvertDocumentWithCalibre,
  testConvertDocumentWithLibreOffice,
  testConvertDocumentWithPandoc,
  testConvertLatexToPng,
  testConvertMarkdownWithPuppeteer,
  testConvertTxtWithPuppeteer,
} from './shared'

export function testConvertLatexToPngBrowser(
  input: any,
): input is ConvertLatexToPngBrowserInput {
  return testConvertLatexToPng(input)
}

export function testConvertMarkdownWithPuppeteerBrowser(
  input: any,
): input is ConvertMarkdownWithPuppeteerBrowserInput {
  return testConvertMarkdownWithPuppeteer(input)
}

export function testConvertTxtWithPuppeteerBrowser(
  input: any,
): input is ConvertTxtWithPuppeteerBrowserInput {
  return testConvertTxtWithPuppeteer(input)
}

export function testConvertDocumentWithCalibreBrowser(
  input: any,
): input is ConvertDocumentWithCalibreBrowserInput {
  return testConvertDocumentWithCalibre(input)
}

export function testConvertDocumentWithPandocBrowser(
  input: any,
): input is ConvertDocumentWithPandocBrowserInput {
  return testConvertDocumentWithPandoc(input)
}

export function testConvertDocumentWithLibreOfficeBrowser(
  input: any,
): input is ConvertDocumentWithLibreOfficeBrowserInput {
  return testConvertDocumentWithLibreOffice(input)
}
