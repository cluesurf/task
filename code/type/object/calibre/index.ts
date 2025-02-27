export type CalibreFormatData = {
  head: string
}

export type CalibreInputFormat =
  | 'azw4'
  | 'chm'
  | 'comic'
  | 'djvu'
  | 'docx'
  | 'epub'
  | 'fb2'
  | 'htlz'
  | 'html'
  | 'lit'
  | 'lrf'
  | 'mobi'
  | 'odt'
  | 'pdb'
  | 'pdf'
  | 'pml'
  | 'rb'
  | 'rtf'
  | 'recipe'
  | 'snb'
  | 'tcr'
  | 'txt'
export type CalibreInputFormatContentValue = CalibreFormatData

export type CalibreInputFormatContent = Record<
  CalibreInputFormat,
  CalibreInputFormatContentValue
>

export type CalibreInputProfile =
  | 'cybookg3'
  | 'cybook_opus'
  | 'default'
  | 'hanlinv3'
  | 'hanlinv5'
  | 'illiad'
  | 'irexdr1000'
  | 'irexdr800'
  | 'kindle'
  | 'msreader'
  | 'mobipocket'
  | 'nook'
  | 'sony'
  | 'sony300'
  | 'sony900'

export type CalibreOutputFormat =
  | 'azw3'
  | 'docx'
  | 'epub'
  | 'fb2'
  | 'html'
  | 'htmlz'
  | 'lit'
  | 'lrf'
  | 'mobi'
  | 'oeb'
  | 'pdb'
  | 'pdf'
  | 'pml'
  | 'rb'
  | 'rtf'
  | 'snb'
  | 'tcr'
  | 'txt'
  | 'txtz'
export type CalibreOutputFormatContentValue = CalibreFormatData

export type CalibreOutputFormatContent = Record<
  CalibreOutputFormat,
  CalibreOutputFormatContentValue
>

export type CalibreOutputProfile =
  | 'cybookg3'
  | 'cybook_opus'
  | 'default'
  | 'generic_eink'
  | 'generic_eink_hd'
  | 'generic_eink_large'
  | 'hanlinv3'
  | 'hanlinv5'
  | 'illiad'
  | 'ipad'
  | 'ipad3'
  | 'irexdr1000'
  | 'irexdr800'
  | 'jetbook5'
  | 'kindle'
  | 'kindle_dx'
  | 'kindle_fire'
  | 'kindle_oasis'
  | 'kindle_pw'
  | 'kindle_pw3'
  | 'kindle_voyage'
  | 'kobo'
  | 'msreader'
  | 'mobipocket'
  | 'nook'
  | 'nook_color'
  | 'nook_hd_plus'
  | 'pocketbook_900'
  | 'pocketbook_pro_912'
  | 'galaxy'
  | 'sony'
  | 'sony300'
  | 'sony900'
  | 'sony-landscape'
  | 'sonyt3'
  | 'tablet'
