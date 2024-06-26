import IMAGE_MAGICK_FORMAT from './image-magick.format.json' assert { type: 'json' }
import IMAGE_MAGICK_INPUT_FORMAT from './image-magick.format.input.json' assert { type: 'json' }
import IMAGE_MAGICK_OUTPUT_FORMAT from './image-magick.format.output.json' assert { type: 'json' }
import { Form, Hash, List } from '@termsurf/form'

export const image_magick_input_format: List = {
  form: 'list',
  list: IMAGE_MAGICK_INPUT_FORMAT,
}

export const image_magick_output_format: List = {
  form: 'list',
  list: IMAGE_MAGICK_OUTPUT_FORMAT,
}

export const image_magick_format: List = {
  form: 'list',
  list: [
    '3fr',
    '3g2',
    '3gp',
    'aai',
    'ai',
    'apng',
    'art',
    'arw',
    'ashlar',
    'avi',
    'avif',
    'avs',
    'bayer',
    'bayera',
    'bgr',
    'bgra',
    'bgro',
    'bmp',
    'bmp2',
    'bmp3',
    'brf',
    'cal',
    'cals',
    'canvas',
    'caption',
    'cin',
    'cip',
    'clip',
    'cmyk',
    'cmyka',
    'cr2',
    'cr3',
    'crw',
    'cube',
    'cur',
    'cut',
    'data',
    'dcm',
    'dcr',
    'dcraw',
    'dcx',
    'dds',
    'dfont',
    'dng',
    'dpx',
    'dot',
    'dxt1',
    'dxt5',
    'epdf',
    'epi',
    'eps',
    'eps2',
    'eps3',
    'epsf',
    'epsi',
    'ept',
    'ept2',
    'ept3',
    'erf',
    'exr',
    'farbfeld',
    'fax',
    'ff',
    'file',
    'fits',
    'fl32',
    'flv',
    'fractal',
    'ftp',
    'ftxt',
    'fts',
    'g3',
    'g4',
    'gif',
    'gif87',
    'gradient',
    'gray',
    'graya',
    'group4',
    'hald',
    'hdr',
    'heic',
    'heif',
    'histogram',
    'hrz',
    'htm',
    'html',
    'http',
    'https',
    'icb',
    'ico',
    'icon',
    'iiq',
    'info',
    'inline',
    'ipl',
    'isobrl',
    'isobrl6',
    'j2c',
    'j2k',
    'jng',
    'jnx',
    'jp2',
    'jpc',
    'jpe',
    'jpeg',
    'jpg',
    'jpm',
    'jps',
    'jpt',
    'json',
    'jxl',
    'k25',
    'kdc',
    'label',
    'm2v',
    'm4v',
    'mac',
    'map',
    'mask',
    'mat',
    'matte',
    'mef',
    'miff',
    'mkv',
    'mng',
    'mono',
    'mov',
    'mp4',
    'mpc',
    'mpeg',
    'mpg',
    'mpo',
    'mrw',
    'msl',
    'msvg',
    'mtv',
    'mvg',
    'nef',
    'nrw',
    'null',
    'ora',
    'orf',
    'otb',
    'otf',
    'pal',
    'palm',
    'pam',
    'pango',
    'pattern',
    'pbm',
    'pcd',
    'pcds',
    'pcl',
    'pct',
    'pcx',
    'pdb',
    'pdf',
    'pdfa',
    'pef',
    'pes',
    'pfa',
    'pfb',
    'pfm',
    'pgm',
    'pgx',
    'phm',
    'picon',
    'pict',
    'pix',
    'pjpeg',
    'plasma',
    'png',
    'png00',
    'png24',
    'png32',
    'png48',
    'png64',
    'png8',
    'pnm',
    'ppm',
    'ps',
    'ps2',
    'ps3',
    'psb',
    'psd',
    'ptif',
    'pwp',
    'qoi',
    'raf',
    'ras',
    'raw',
    'rgb',
    'rgb565',
    'rgba',
    'rgbo',
    'rgf',
    'rla',
    'rle',
    'rmf',
    'rw2',
    'scr',
    'sct',
    'sfw',
    'sgi',
    'shtml',
    'six',
    'sixel',
    'sr2',
    'srf',
    'stegano',
    'strimg',
    'sun',
    'svg',
    'svgz',
    'text',
    'tga',
    'thumbnail',
    'tiff',
    'tiff64',
    'tile',
    'tim',
    'tm2',
    'ttc',
    'ttf',
    'txt',
    'ubrl',
    'ubrl6',
    'uil',
    'uyvy',
    'vda',
    'vicar',
    'vid',
    'viff',
    'vips',
    'vst',
    'wbmp',
    'webp',
    'webm',
    'wmv',
    'wpg',
    'x3f',
    'xbm',
    'xc',
    'xcf',
    'xpm',
    'xps',
    'xv',
    'yaml',
    'ycbcr',
    'ycbcra',
    'yuv',
  ],
}

export const image_magick_format_data: Form = {
  form: 'form',
  link: {
    head: { like: 'string' },
    note: { like: 'string', need: false },
    read: { like: 'boolean', need: false },
    write: { like: 'boolean', need: false },
    multiple: { like: 'boolean', need: false },
    supportsBlob: { like: 'boolean', need: false },
  },
}

export const image_magick_format_content: Hash = {
  form: 'hash',
  file: 'image_magick',
  link: 'image_magick_format',
  bond: { like: 'image_magick_format_data' },
  hash: IMAGE_MAGICK_FORMAT,
}

export const image_magick_gravity: List = {
  form: 'list',
  list: [
    'forget',
    'northwest',
    'north',
    'northeast',
    'west',
    'center',
    'east',
    'southwest',
    'south',
    'southeast',
  ],
}

export const image_magick_channel: List = {
  form: 'list',
  list: [
    'red',
    'green',
    'blue',
    'alpha',
    'gray',
    'cyan',
    'magenta',
    'yellow',
    'black',
    'opacity',
    'index',
    'rgb',
    'rgba',
    'cmyk',
    'cmyka',
  ],
}

export const image_magick_channel_data: Form = {
  form: 'form',
  link: {
    head: { like: 'string' },
  },
}

// https://imagemagick.org/script/command-line-options.php#channel
export const image_magick_channel_content: Hash = {
  form: 'hash',
  file: 'image_magick',
  link: 'image_magick_channel',
  bond: { like: 'image_magick_channel_data' },
  hash: {
    red: { head: 'Red' },
    green: { head: 'Green' },
    blue: { head: 'Blue' },
    alpha: { head: 'Alpha' },
    gray: { head: 'Gray' },
    cyan: { head: 'Cyan' },
    magenta: { head: 'Magenta' },
    yellow: { head: 'Yellow' },
    black: { head: 'Black' },
    opacity: { head: 'Opacity' },
    index: { head: 'Index' },
    rgb: { head: 'RGB' },
    rgba: { head: 'RGBA' },
    cmyk: { head: 'CMYK' },
    cmyka: { head: 'CMYKA' },
  },
}

export const image_magick_compression_data: Form = {
  form: 'form',
  link: {
    head: { like: 'string' },
  },
}

export const image_magick_compression_content: Hash = {
  form: 'hash',
  file: 'image_magick',
  link: 'image_magick_compression',
  bond: {
    like: 'image_magick_compression_data',
  },
  hash: {
    none: { head: 'None' },
    bzip: { head: 'BZip' },
    fax: { head: 'Fax' },
    group4: { head: 'Group4' },
    jpeg: { head: 'JPEG' },
    jpeg2000: { head: 'JPEG2000' },
    lossless: { head: 'Lossless' },
    lzw: { head: 'LZW' },
    rle: { head: 'RLE' },
    zip: { head: 'Zip' },
  },
}

export const image_magick_compression: List = {
  form: 'list',
  list: [
    'none',
    'bzip',
    'fax',
    'group4',
    'jpeg',
    'jpeg2000',
    'lossless',
    'lzw',
    'rle',
    'zip',
  ],
}

export const image_magick_color_space: List = {
  form: 'list',
  list: [
    'cmy',
    'cmyk',
    'gray',
    'hcl',
    'hclp',
    'hsb',
    'hsi',
    'hsl',
    'hsv',
    'hwb',
    'jzazbz',
    'lab',
    'lchab',
    'lchuv',
    'lms',
    'log',
    'luv',
    'ohta',
    'oklab',
    'oklch',
    'rec601ycbcr',
    'rec709ycbcr',
    'rgb',
    'scrgb',
    'srgb',
    'transparent',
    'xyy',
    'xyz',
    'ycbcr',
    'ycc',
    'ydbdr',
    'yiq',
    'ypbpr',
    'yuv',
    'undefined',
  ],
}

export const image_magick_color_space_data: Form = {
  form: 'form',
  link: {
    head: { like: 'string' },
    note: { like: 'string', need: false },
  },
}

export const image_magick_color_space_content: Hash = {
  form: 'hash',
  file: 'image_magick',
  link: 'image_magick_color_space',
  bond: { like: 'image_magick_color_space_data' },
  hash: {
    cmy: { head: 'CMY', note: 'Cyan, Magenta, Yellow' },
    cmyk: { head: 'CMYK', note: 'Cyan, Magenta, Yellow, Key (Black)' },
    gray: { head: 'Gray', note: 'Grayscale' },
    hcl: { head: 'HCL', note: 'Hue, Chroma, Lightness' },
    hclp: { head: 'HCLp', note: 'Hue, Chroma, Lightness (perceptual)' },
    hsb: { head: 'HSB', note: 'Hue, Saturation, Brightness' },
    hsi: { head: 'HSI', note: 'Hue, Saturation, Intensity' },
    hsl: { head: 'HSL', note: 'Hue, Saturation, Lightness' },
    hsv: { head: 'HSV', note: 'Hue, Saturation, Value' },
    hwb: { head: 'HWB', note: 'Hue, Whiteness, Blackness' },
    jzazbz: {
      head: 'Jzazbz',
      note: 'Jz, az, bz (a perceptually uniform colorspace)',
    },
    lab: { head: 'Lab', note: 'CIELAB (Lab color space)' },
    lchab: { head: 'LCHab', note: 'Lightness, Chroma, Hue (CIELAB)' },
    lchuv: { head: 'LCHuv', note: 'Lightness, Chroma, Hue (CIELUV)' },
    lms: {
      head: 'LMS',
      note: 'Long, Medium, Short (a colorspace based on human vision)',
    },
    log: { head: 'Log', note: 'Logarithmic color space' },
    luv: { head: 'Luv', note: 'CIELUV (Luv color space)' },
    ohta: { head: 'OHTA', note: 'Ohta color space' },
    oklab: { head: 'OkLab', note: 'OkLab color space' },
    oklch: { head: 'OkLCH', note: 'OkLCH color space' },
    rec601ycbcr: {
      head: 'Rec601YCbCr',
      note: 'ITU-R Rec. 601 YCbCr color space',
    },
    rec709ycbcr: {
      head: 'Rec709YCbCr',
      note: 'ITU-R Rec. 709 YCbCr color space',
    },
    rgb: { head: 'RGB', note: 'Red, Green, Blue' },
    scrgb: {
      head: 'scRGB',
      note: 'Standard-compliant RGB color space',
    },
    srgb: { head: 'sRGB', note: 'Standard Red Green Blue color space' },
    transparent: { head: 'Transparent', note: 'Transparent color' },
    xyy: {
      head: 'xyY',
      note: 'Chromaticity coordinates and luminance',
    },
    xyz: { head: 'XYZ', note: 'CIE 1931 XYZ color space' },
    ycbcr: {
      head: 'YCbCr',
      note: 'Luma (Y), Chroma Blue (Cb), Chroma Red (Cr)',
    },
    ycc: { head: 'YCC', note: "Y'CbCr color space" },
    ydbdr: {
      head: 'YDbDr',
      note: 'Luma (Y), Blue-Difference (Db), Red-Difference (Dr)',
    },
    yiq: {
      head: 'YIQ',
      note: 'Luma (Y), In-phase (I), Quadrature-phase (Q)',
    },
    ypbpr: { head: 'YPbPr', note: 'Luma (Y), Blue (Pb), Red (Pr)' },
    yuv: {
      head: 'YUV',
      note: 'Luma (Y), Chrominance U (Cb), Chrominance V (Cr)',
    },
    undefined: { head: 'Undefined' },
  },
}

// density
//   w
//   wxh
// depth

// distort
//   Affine
//   RigidAffine
//   AffineProjection
//   ScaleRotateTranslate
//   SRT
//   Perspective
//   PerspectiveProjection
//   BilinearForward
//   BilinearReverse
//   Polynomial
//   Arc
//   Polar
//   DePolar
//   Barrel
//   BarrelInverse
//   Shepards
//   Resize

// channel
//   All
//   Sync
//   Default
//   A
//   Alpha
//   Black
//   B
//   Blue
//   C
//   Chroma
//   Cyan
//   Gray
//   G
//   Green
//   H
//   Hue
//   K
//   L
//   Lightness
//   Luminance
//   M
//   Magenta
//   Meta
//   Meta0
//   Meta1
//   Meta2
//   Meta3
//   Meta4
//   Meta5
//   Meta6
//   Meta7
//   Meta8
//   Meta9
//   Meta10
//   Meta11
//   Meta12
//   Meta13
//   Meta14
//   Meta15
//   Meta16
//   Meta17
//   Meta18
//   Meta19
//   Meta20
//   Meta21
//   R
//   ReadMask
//   Red
//   S
//   Saturation
//   WriteMask
//   Y
//   Yellow
//   0
//   1
//   2
//   3
//   4
//   5
//   6
//   7
//   8
//   9
//   10
//   11
//   12
//   13
//   14
//   15
//   16
//   17
//   18
//   19
//   20
//   21
//   22
//   23
//   24
//   25
//   26
//   27
//   28
//   29
//   30
//   31

// alpha
//   Activate
//   Associate
//   Background
//   Copy
//   Deactivate
//   Discrete
//   Disassociate
//   Extract
//   Off
//   On
//   Opaque
//   Remove
//   Set
//   Shape
//   Transparent

// loop n

// mode
//   Frame
//   Unframe
//   Concatenate

// -motion-blur radius
// -motion-blur radius{xsigma}+angle

// -negate
//   Replace each pixel with its complementary color.

// noise
//   Gaussian
//   Impulse
//   Laplacian
//   Multiplicative
//   Poisson
//   Random
//   Uniform

// opaque
//   Change this color to the fill color within the image.

// orient
//   Specify orientation of a digital camera image.

//   bottom-left
//   right-top
//   bottom-right
//   top-left
//   left-bottom
//   top-right
//   left-top
//   undefined
//   right-bottom

// paint radiuspx
//   Simulate an oil painting. Each pixel is replaced by the most frequent color in a circular neighborhood whose width is specified with radius.

// polaroid angle
//   Simulate a Polaroid picture.

// precision value

// quality
//   JPEG/MIFF/PNG compression level.

// quantize colorspace
//   Reduce colors using this colorspace.

// quiet

// resize geometry

// rotational-blur angle
//   Blur around the center of the image.

// sepia-tone percent
//   Simulate a sepia-toned photo.

// sharpen radius

// -sketch radius
//   Simulate a pencil sketch.

// swirl degrees
//   Swirl image pixels about the center.

// -tint value
//   Tint the image with the fill color.

// transparent color
//   Make this color transparent within the image.

// type
//   Bilevel
//   Grayscale
//   GrayscaleAlpha
//   Palette
//   PaletteAlpha
//   TrueColor
//   TrueColorAlpha
//   ColorSeparation
//   ColorSeparationAlpha

// unsharp radius
//   Sharpen the image with an unsharp mask operator.

// vignette radius{xsigma}{+-}x{+-}y{%}
//   Soften the edges of the image in vignette style.

// https://www.the-art-of-web.com/system/imagemagick-watermark/

// geometry

// composite
//   convert $inputFile $logoFile -gravity southeast -geometry +100+100 -format jpg -composite $outputFile
//   <!-- https://amytabb.com/til/photography/2021/01/23/image-magick-watermark/ -->

// https://exiftool.org/TagNames/EXIF.html
// https://github.com/exif-js/exif-js
// https://exiftool.org/TagNames/PNG.html
// https://github.com/MikeKovarik/exifr

export const image_magic_color_matrix: Form = {
  form: 'form',
  link: {
    row: { like: 'natural_number' },
    column: { like: 'natural_number' },
    value: { like: 'decimal', list: true },
  },
}
