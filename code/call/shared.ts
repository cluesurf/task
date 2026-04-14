export type Action = 'compile' | 'convert' | 'format' | 'verify'

export type Object = 'video' | 'image' | 'document'

export type Tool =
  | 'ffmpeg'
  | 'imagemagick'
  | 'libre-office'
  | 'calibre'
