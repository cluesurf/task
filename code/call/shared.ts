export type Action = 'compile' | 'convert' | 'format' | 'verify'

export type Object = 'video' | 'image' | 'document'

export type Tool =
  | 'ffmpeg'
  | 'image-magick'
  | 'libre-office'
  | 'calibre'
