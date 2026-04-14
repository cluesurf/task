import {
  CalibreInputFormat,
  CalibreInputFormatContent,
  CalibreInputProfile,
  CalibreOutputFormat,
  CalibreOutputFormatContent,
  CalibreOutputProfile,
} from '~/code/form/object/calibre'

export const CALIBRE_INPUT_FORMAT: ReadonlyArray<CalibreInputFormat> = [
  'azw4',
  'chm',
  'comic',
  'djvu',
  'docx',
  'epub',
  'fb2',
  'htlz',
  'html',
  'lit',
  'lrf',
  'mobi',
  'odt',
  'pdb',
  'pdf',
  'pml',
  'rb',
  'rtf',
  'recipe',
  'snb',
  'tcr',
  'txt',
]

export const CALIBRE_INPUT_FORMAT_CONTENT: CalibreInputFormatContent = {
  azw4: {
    head: 'AZW4',
  },
  chm: {
    head: 'CHM',
  },
  comic: {
    head: 'Comic',
  },
  djvu: {
    head: 'DJVU',
  },
  docx: {
    head: 'DOCX',
  },
  epub: {
    head: 'EPUB',
  },
  fb2: {
    head: 'FB2',
  },
  htlz: {
    head: 'HTLZ',
  },
  html: {
    head: 'HTML',
  },
  lit: {
    head: 'LIT',
  },
  lrf: {
    head: 'LRF',
  },
  mobi: {
    head: 'MOBI',
  },
  odt: {
    head: 'ODT',
  },
  pdb: {
    head: 'PDB',
  },
  pdf: {
    head: 'PDF',
  },
  pml: {
    head: 'PML',
  },
  rb: {
    head: 'RB',
  },
  rtf: {
    head: 'RTF',
  },
  recipe: {
    head: 'Recipe',
  },
  snb: {
    head: 'SNB',
  },
  tcr: {
    head: 'TCR',
  },
  txt: {
    head: 'TXT',
  },
}
export const CALIBRE_INPUT_PROFILE: ReadonlyArray<CalibreInputProfile> =
  [
    'cybookg3',
    'cybook_opus',
    'default',
    'hanlinv3',
    'hanlinv5',
    'illiad',
    'irexdr1000',
    'irexdr800',
    'kindle',
    'msreader',
    'mobipocket',
    'nook',
    'sony',
    'sony300',
    'sony900',
  ]
export const CALIBRE_OUTPUT_FORMAT: ReadonlyArray<CalibreOutputFormat> =
  [
    'azw3',
    'docx',
    'epub',
    'fb2',
    'html',
    'htmlz',
    'lit',
    'lrf',
    'mobi',
    'oeb',
    'pdb',
    'pdf',
    'pml',
    'rb',
    'rtf',
    'snb',
    'tcr',
    'txt',
    'txtz',
  ]

export const CALIBRE_OUTPUT_FORMAT_CONTENT: CalibreOutputFormatContent =
  {
    azw3: {
      head: 'AZW3',
    },
    docx: {
      head: 'DOCX',
    },
    epub: {
      head: 'EPUB',
    },
    fb2: {
      head: 'FB2',
    },
    html: {
      head: 'HTML',
    },
    htmlz: {
      head: 'HTMLZ',
    },
    lit: {
      head: 'LIT',
    },
    lrf: {
      head: 'LRF',
    },
    mobi: {
      head: 'MOBI',
    },
    oeb: {
      head: 'OEB',
    },
    pdb: {
      head: 'PDB',
    },
    pdf: {
      head: 'PDF',
    },
    pml: {
      head: 'PML',
    },
    rb: {
      head: 'RB',
    },
    rtf: {
      head: 'RTF',
    },
    snb: {
      head: 'SNB',
    },
    tcr: {
      head: 'TCR',
    },
    txt: {
      head: 'TXT',
    },
    txtz: {
      head: 'TXTZ',
    },
  }
export const CALIBRE_OUTPUT_PROFILE: ReadonlyArray<CalibreOutputProfile> =
  [
    'cybookg3',
    'cybook_opus',
    'default',
    'generic_eink',
    'generic_eink_hd',
    'generic_eink_large',
    'hanlinv3',
    'hanlinv5',
    'illiad',
    'ipad',
    'ipad3',
    'irexdr1000',
    'irexdr800',
    'jetbook5',
    'kindle',
    'kindle_dx',
    'kindle_fire',
    'kindle_oasis',
    'kindle_pw',
    'kindle_pw3',
    'kindle_voyage',
    'kobo',
    'msreader',
    'mobipocket',
    'nook',
    'nook_color',
    'nook_hd_plus',
    'pocketbook_900',
    'pocketbook_pro_912',
    'galaxy',
    'sony',
    'sony300',
    'sony900',
    'sony-landscape',
    'sonyt3',
    'tablet',
  ]
