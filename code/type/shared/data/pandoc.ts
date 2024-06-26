import {
  PandocFormatContent,
  PandocFormatContentKey,
} from '~/code/type/shared/pandoc.js'

export const PANDOC_FORMAT_CONTENT_KEY: ReadonlyArray<PandocFormatContentKey> =
  [
    'bibtex',
    'biblatex',
    'bits',
    'commonmark',
    'commonmark_x',
    'creole',
    'csljson',
    'csv',
    'tsv',
    'docbook',
    'docx',
    'dokuwiki',
    'endnotexml',
    'epub',
    'fb2',
    'haddock',
    'html',
    'ipynb',
    'jats',
    'jira',
    'json',
    'latex',
    'markdown',
    'markdown_mmd',
    'markdown_phpextra',
    'markdown_strict',
    'mediawiki',
    'man',
    'muse',
    'native',
    'opml',
    'org',
    'ris',
    'rtf',
    'rst',
    't2t',
    'textile',
    'tikiwiki',
    'twiki',
    'typst',
    'vimwiki',
    'asciidoc',
    'asciidoc_legacy',
    'asciidoctor',
    'beamer',
    'chunkedhtml',
    'context',
    'docbook4',
    'docbook5',
    'epub3',
    'epub2',
    'gfm',
    'html5',
    'html4',
    'icml',
    'jats_archiving',
    'jats_articleauthoring',
    'jats_publishing',
    'markua',
    'ms',
    'odt',
    'opendocument',
    'pdf',
    'plain',
    'pptx',
    'texinfo',
    'slideous',
    'slidy',
    'dzslides',
    'revealjs',
    's5',
    'tei',
    'xwiki',
    'zimwiki',
  ] as const

export const PANDOC_FORMAT_CONTENT: PandocFormatContent = {
  bibtex: {
    head: 'BibTeX bibliography',
  },
  biblatex: {
    head: 'BibLaTeX bibliography',
  },
  bits: {
    head: 'BITS XML, alias for jats',
  },
  commonmark: {
    head: 'CommonMark Markdown',
  },
  commonmark_x: {
    head: 'CommonMark Markdown with extensions',
  },
  creole: {
    head: 'Creole 1.0',
  },
  csljson: {
    head: 'CSL JSON bibliography',
  },
  csv: {
    head: 'CSV table',
  },
  tsv: {
    head: 'TSV table',
  },
  docbook: {
    head: 'DocBook',
  },
  docx: {
    head: 'Word docx',
  },
  dokuwiki: {
    head: 'DokuWiki markup',
  },
  endnotexml: {
    head: 'EndNote XML bibliography',
  },
  epub: {
    head: 'EPUB',
  },
  fb2: {
    head: 'FictionBook2 e-book',
  },
  haddock: {
    head: 'Haddock markup',
  },
  html: {
    head: 'HTML',
  },
  ipynb: {
    head: 'Jupyter notebook',
  },
  jats: {
    head: 'JATS XML',
  },
  jira: {
    head: 'Jira/Confluence wiki markup',
  },
  json: {
    head: 'JSON version of native AST',
  },
  latex: {
    head: 'LaTeX',
  },
  markdown: {
    head: 'Pandoc Markdown',
  },
  markdown_mmd: {
    head: 'MultiMarkdown',
  },
  markdown_phpextra: {
    head: 'PHP Markdown Extra',
  },
  markdown_strict: {
    head: 'original unextended Markdown',
  },
  mediawiki: {
    head: 'MediaWiki markup',
  },
  man: {
    head: 'roff man',
  },
  muse: {
    head: 'Muse',
  },
  native: {
    head: 'Native Haskell',
  },
  opml: {
    head: 'OPML',
  },
  org: {
    head: 'Emacs Org mode',
  },
  ris: {
    head: 'RIS bibliography',
  },
  rtf: {
    head: 'Rich Text Format',
  },
  rst: {
    head: 'reStructuredText',
  },
  t2t: {
    head: 'txt2tags',
  },
  textile: {
    head: 'Textile',
  },
  tikiwiki: {
    head: 'TikiWiki markup',
  },
  twiki: {
    head: 'TWiki markup',
  },
  typst: {
    head: 'typst',
  },
  vimwiki: {
    head: 'Vimwiki',
  },
  asciidoc: {
    head: 'modern AsciiDoc as interpreted by AsciiDoctor',
  },
  asciidoc_legacy: {
    head: 'AsciiDoc as interpreted by asciidoc-py',
  },
  asciidoctor: {
    head: 'deprecated synonym for asciidoc',
  },
  beamer: {
    head: 'LaTeX beamer slide show',
  },
  chunkedhtml: {
    head: 'zip archive of multiple linked HTML files',
  },
  context: {
    head: 'ConTeXt',
  },
  docbook4: {
    head: 'DocBook 4',
  },
  docbook5: {
    head: 'DocBook 5',
  },
  epub3: {
    head: 'EPUB v3 book',
  },
  epub2: {
    head: 'EPUB v2',
  },
  gfm: {
    head: 'GitHub-Flavored Markdown',
  },
  html5: {
    head: 'HTML',
  },
  html4: {
    head: 'XHTML 1.0 Transitional',
  },
  icml: {
    head: 'InDesign ICML',
  },
  jats_archiving: {
    head: 'JATS XML, Archiving and Interchange Tag Set',
  },
  jats_articleauthoring: {
    head: 'JATS XML, Article Authoring Tag Set',
  },
  jats_publishing: {
    head: 'JATS XML, Journal Publishing Tag Set',
  },
  markua: {
    head: 'Markua',
  },
  ms: {
    head: 'roff ms',
  },
  odt: {
    head: 'OpenOffice text document',
  },
  opendocument: {
    head: 'OpenDocument',
  },
  pdf: {
    head: 'PDF',
  },
  plain: {
    head: 'Plain text',
  },
  pptx: {
    head: 'PowerPoint',
  },
  texinfo: {
    head: 'GNU Texinfo',
  },
  slideous: {
    head: 'Slideous HTML and JavaScript slide show',
  },
  slidy: {
    head: 'Slidy HTML and JavaScript slide show',
  },
  dzslides: {
    head: 'DZSlides HTML5 + JavaScript slide show',
  },
  revealjs: {
    head: 'reveal.js HTML5 + JavaScript slide show',
  },
  s5: {
    head: 'S5 HTML and JavaScript slide show',
  },
  tei: {
    head: 'TEI Simple',
  },
  xwiki: {
    head: 'XWiki markup',
  },
  zimwiki: {
    head: 'ZimWiki markup',
  },
}
