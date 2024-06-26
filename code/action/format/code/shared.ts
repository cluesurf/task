import omit from 'lodash/omit'
import { serialize as serializeToFormData } from 'object-to-formdata'
import prettier from 'prettier/standalone.js'
import {
  FormatApi,
  FormatCodeWithPrettier,
  FormatCodeWithPrettierParser,
  FormatGraphqlWithPrettier,
  FormatGraphqlWithPrettierParser,
  FormatHtmlWithPrettier,
  FormatHtmlWithPrettierParser,
  FormatJavaWithPrettier,
  FormatJavaWithPrettierParser,
  FormatMarkdownWithPrettier,
  FormatMarkdownWithPrettierParser,
  FormatRustWithPrettier,
  FormatRustWithPrettierParser,
  FormatShWithPrettier,
  FormatShWithPrettierParser,
  FormatTypescriptWithPrettier,
  FormatTypescriptWithPrettierParser,
  FormatXmlWithPrettier,
  FormatXmlWithPrettierParser,
  FormatYamlWithPrettier,
  FormatYamlWithPrettierParser,
  PrettierPlugin,
} from '~/code/type/shared/parser.js'
import * as prettierPluginEstree from 'prettier/plugins/estree.js'
import { buildRemoteRequest } from '~/code/tool/shared/request.js'
import { omitNested } from '~/code/tool/shared/object.js'

export enum Format {
  Graphql = 'graphql',
  Rust = 'rust',
  Typescript = 'typescript',
  Markdown = 'markdown',
  Html = 'html',
  Yaml = 'yaml',
  Xml = 'xml',
}

export type FormatPrettierInputMap = {
  [Format.Rust]: FormatRustWithPrettier
  [Format.Graphql]: FormatGraphqlWithPrettier
  [Format.Typescript]: FormatTypescriptWithPrettier
  [Format.Markdown]: FormatMarkdownWithPrettier
  [Format.Html]: FormatHtmlWithPrettier
  [Format.Yaml]: FormatYamlWithPrettier
  [Format.Xml]: FormatXmlWithPrettier
}

export type FormatPrettierInput<T extends Format> =
  T extends keyof FormatPrettierInputMap
    ? FormatPrettierInputMap[T] & { format: T }
    : never

const plugins: Record<PrettierPlugin, any> = {
  angular: () => import('prettier/parser-angular'),
  flow: () => import('prettier/parser-flow'),
  glimmer: () => import('prettier/parser-glimmer'),
  graphql: () => import('prettier/parser-graphql'),
  html: () => import('prettier/parser-html'),
  markdown: () => import('prettier/parser-markdown'),
  meriyah: () => import('prettier/parser-meriyah'),
  postcss: () => import('prettier/parser-postcss'),
  typescript: () => import('prettier/parser-typescript'),
  yaml: () => import('prettier/parser-yaml'),
  // php: () => {},
  // xml: () => import('@prettier/plugin-xml'),
  // // ruby: () => import('@prettier/plugin-ruby'),
  // pug: () => import('@prettier/plugin-pug'),
  // gherkin: () => import('prettier-plugin-gherkin'),
  // // glsl: () => import('prettier-plugin-glsl'),
  // rust: () => import('prettier-plugin-rust'),
  // java: () => import('prettier-plugin-java'),
  // // shell: () => import('prettier-plugin-sh'),
  // // kotlin: () => import('prettier-plugin-kotlin'),
  // nginx: () => import('prettier-plugin-nginx'),
  // toml: () => import('prettier-plugin-toml'),
}

export type FormatOutput = {
  code: string
}

export async function formatCodeWithPrettier(
  source: FormatCodeWithPrettier,
): Promise<FormatOutput> {
  const { format, code, ...input } = source
  const plugin = (await plugins[format]()).default
  const p = [plugin]
  if (format.match(/typescript|javascript/)) {
    p.push(prettierPluginEstree)
  }
  const output = await prettier.format(code, {
    parser: format,
    plugins: p,
    ...input,
  })
  return { code: output }
}

export async function formatCodeWithPrettierPlugin<T extends Format>(
  input: FormatPrettierInput<T>,
) {
  switch (input.format) {
    // case 'angular':
    //   return await formatAngularWithPrettier(input)
    // case 'flow':
    //   return await formatFlowWithPrettier(input)
    // case 'glimmer':
    //   return await formatGlimmerWithPrettier(input)
    case 'graphql':
      return await formatGraphqlWithPrettier(input)
    case 'html':
      return await formatHtmlWithPrettier(input)
    case 'markdown':
      return await formatMarkdownWithPrettier(input)
    // case 'meriyah':
    //   return await formatMeriyahWithPrettier(input)
    // case 'postcss':
    //   return await formatPostcssWithPrettier(input)
    case 'typescript':
      return await formatTypescriptWithPrettier(input)
    case 'yaml':
      return await formatYamlWithPrettier(input)
    // case 'php':
    //   return await formatPhpWithPrettier(input)
    // case 'xml':
    //   return await formatXmlWithPrettier(input)
    // case 'ruby':
    //   return await formatRubyWithPrettier(input)
    // case 'pug':
    //   return await formatPugWithPrettier(input)
    // case 'gherkin':
    //   return await formatGherkinWithPrettier(input)
    // case 'glsl':
    //   return await formatGlslWithPrettier(input)
    // case 'rust':
    //   return await formatRustWithPrettier(input)
    // case 'java':
    //   return await formatJavaWithPrettier(input)
    // case 'shell':
    //   return await formatShellWithPrettier(input)
    // case 'kotlin':
    //   return await formatKotlinWithPrettier(input)
    // case 'nginx':
    //   return await formatNginxWithPrettier(input)
    // case 'toml':
    //   return await formatTomlWithPrettier(input)
  }
}

// export async function formatAngularWithPrettier(
//   source: FormatAngularWithPrettier,
// ) {
//   const input = FormatAngularWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'angular',
//   })
// }

// export async function formatFlowWithPrettier(
//   source: FormatFlowWithPrettier,
// ) {
//   const input = FormatFlowWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'flow',
//   })
// }

// export async function formatGlimmerWithPrettier(
//   source: FormatGlimmerWithPrettier,
// ) {
//   const input = FormatGlimmerWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'glimmer',
//   })
// }

export async function formatGraphqlWithPrettier(
  source: FormatGraphqlWithPrettier,
) {
  const input = FormatGraphqlWithPrettierParser().parse(source)
  return await formatCodeWithPrettier({
    ...input,
    format: 'graphql',
  })
}

export async function formatHtmlWithPrettier(
  source: FormatHtmlWithPrettier,
) {
  const input = FormatHtmlWithPrettierParser().parse(source)
  return await formatCodeWithPrettier({
    ...input,
    format: 'html',
  })
}

export async function formatMarkdownWithPrettier(
  source: FormatMarkdownWithPrettier,
) {
  const input = FormatMarkdownWithPrettierParser().parse(source)
  return await formatCodeWithPrettier({
    ...input,
    format: 'markdown',
  })
}

// export async function formatMeriyahWithPrettier(
//   source: FormatMeriyahWithPrettier,
// ) {
//   const input = FormatMeriyahWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'meriyah',
//   })
// }

// export async function formatPostcssWithPrettier(
//   source: FormatPostcssWithPrettier,
// ) {
//   const input = FormatPostcssWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'postcss',
//   })
// }

export async function formatTypescriptWithPrettier(
  source: FormatTypescriptWithPrettier,
) {
  const input = FormatTypescriptWithPrettierParser().parse(source)
  const config = {
    ...omit(input, ['maxLineLength', 'semiColon', 'indentationSize']),
    printWidth: input.maxLineLength,
    semi: input.semiColon,
    tabWidth: input.indentationSize,
  }
  return await formatCodeWithPrettier({
    ...config,
    format: 'typescript',
  })
}

export async function formatYamlWithPrettier(
  source: FormatYamlWithPrettier,
) {
  const input = FormatYamlWithPrettierParser().parse(source)
  return await formatCodeWithPrettier({
    ...input,
    format: 'yaml',
  })
}

// export async function formatPhpWithPrettier(
//   source: FormatPhpWithPrettier,
// ) {
//   const input = FormatPhpWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'php',
//   })
// }

// export async function formatXmlWithPrettier(
//   source: FormatXmlWithPrettier,
// ) {
//   const input = FormatXmlWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'xml',
//   })
// }

// export async function formatRubyWithPrettier(
//   source: FormatRubyWithPrettier,
// ) {
//   const input = FormatRubyWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'ruby',
//   })
// }

// export async function formatPugWithPrettier(
//   source: FormatPugWithPrettier,
// ) {
//   const input = FormatPugWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'pug',
//   })
// }

// export async function formatGherkinWithPrettier(
//   source: FormatGherkinWithPrettier,
// ) {
//   const input = FormatGherkinWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'gherkin',
//   })
// }

// export async function formatGlslWithPrettier(
//   source: FormatGlslWithPrettier,
// ) {
//   const input = FormatGlslWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'glsl',
//   })
// }

// export async function formatRustWithPrettier(
//   source: FormatRustWithPrettier,
// ) {
//   const input = FormatRustWithPrettierParser().parse(source)

//   const config = {
//     ...omit(input, ['maxLineLength', 'indentationSize']),
//     printWidth: input.maxLineLength,
//     tabWidth: input.indentationSize,
//   }
//   return await formatCodeWithPrettier({
//     ...config,
//     format: 'rust',
//   })
// }

// export async function formatJavaWithPrettier(
//   source: FormatJavaWithPrettier,
// ) {
//   const input = FormatJavaWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'java',
//   })
// }

// export async function formatShellWithPrettier(
//   source: FormatShWithPrettier,
// ) {
//   const input = FormatShWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'shell',
//   })
// }

// export async function formatKotlinWithPrettier(
//   source: FormatKotlinWithPrettier,
// ) {
//   const input = FormatKotlinWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'kotlin',
//   })
// }

// export async function formatNginxWithPrettier(
//   source: FormatNginxWithPrettier,
// ) {
//   const input = FormatNginxWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'nginx',
//   })
// }

// export async function formatTomlWithPrettier(
//   source: FormatTomlWithPrettier,
// ) {
//   const input = FormatTomlWithPrettierParser().parse(source)
//   return await formatCodeWithPrettier({
//     ...input,
//     format: 'toml',
//   })
// }

export function buildRequestToFormat(input: FormatApi) {
  return buildRemoteRequest(
    'POST',
    `/format/${input.format}`,
    omitNested(input, [['handle'], ['format']]),
  )
}

export function buildFormDataRequestToFormat(input: FormatApi) {
  const output = omitNested(input, [['handle'], ['format']])

  const formData = serializeToFormData(output)

  return buildRemoteRequest(
    'POST',
    `/convert/${input.format}`,
    formData,
  )
}
