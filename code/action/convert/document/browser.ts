import {
  ConvertDocumentWithCalibreBrowserInput,
  ConvertDocumentWithLibreOfficeBrowserInput,
  ConvertDocumentWithPandocBrowserInput,
  ConvertLatexToPngBrowserInput,
  ConvertMarkdownWithPuppeteerBrowserInput,
  ConvertTxtWithPuppeteerBrowserInput,
} from '~/code/type/browser/parser.js'
import {
  testConvertDocumentWithCalibre,
  testConvertDocumentWithLibreOffice,
  testConvertDocumentWithPandoc,
  testConvertLatexToPng,
  testConvertMarkdownWithPuppeteer,
  testConvertTxtWithPuppeteer,
} from './shared.js'

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
