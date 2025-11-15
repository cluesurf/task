import expandShorthandProperty from 'css-property-parser/src/expandShorthandProperty'
import { parseFont } from 'css-font-parser'
import { ColorTranslator } from 'colortranslator'

export function getWebpageData() {
  const theme = getTheme()
  const meta = getMeta()
  return { theme, meta }
}

function getMeta() {
  const meta: Array<any> = []
  const els = Array.prototype.slice.call(
    document.querySelectorAll('head meta'),
  )
  for (const el of els) {
    if (el.getAttribute('property')) {
      meta.push({
        property: el.getAttribute('property')?.trim(),
        content: el.getAttribute('content')?.trim(),
      })
    } else if (el.getAttribute('name')) {
      meta.push({
        name: el.getAttribute('name')?.trim(),
        content: el.getAttribute('content')?.trim(),
      })
    }
  }
  return meta
}

function getTheme() {
  const themeInput = {
    background: {
      color: {},
      image: {},
    },
    text: {
      color: {},
      font: {
        family: {},
        size: {},
        lineHeight: {},
      }, // [family:color:bold:italic:underline:strikethrough]
    },
    border: {
      color: {},
      style: {},
      width: {
        left: {},
        right: {},
        top: {},
        bottom: {},
      },
      radius: {},
    },
  }

  const theme = {
    background: {
      color: [] as Array<string>,
      image: [] as Array<string>,
    },
    text: {
      color: [] as Array<string>,
      font: {
        family: [] as Array<Array<string>>,
        size: [] as Array<string>,
        lineHeight: [] as Array<string>,
      }, // [family:color:bold:italic:underline:strikethrough]
    },
    border: {
      color: [] as Array<string>,
      style: [] as Array<string>,
      width: {
        left: [] as Array<string>,
        right: [] as Array<string>,
        top: [] as Array<string>,
        bottom: [] as Array<string>,
      },
      radius: [] as Array<string>,
    },
    typography: [] as Array<any>,
    component: [] as Array<any>,
  }

  const componentsInput = new Map()
  const typographyInput = new Map()

  let children: Array<HTMLElement> = []
  let b: Array<HTMLElement>
  let i = 0

  function m(elem) {
    process(elem)
    if (i++ >= 2000) {
      return
    }
    for (const child of elem.children) {
      children.push(child)
    }
    b = children
    children = []
    b.forEach(a => {
      m(a)
    })
  }
  m(document.body)

  // box shadow
  theme.background.color.push(
    ...Object.keys(themeInput.background.color).sort(),
  )
  theme.background.image.push(
    ...Object.keys(themeInput.background.image).sort(),
  )
  theme.text.color.push(...Object.keys(themeInput.text.color).sort())
  theme.text.font.family.push(
    ...Object.keys(themeInput.text.font.family)
      .sort()
      .map(x => x.split(';')),
  )
  theme.text.font.size.push(
    ...Object.keys(themeInput.text.font.size).sort(),
  )
  theme.text.font.lineHeight.push(
    ...Object.keys(themeInput.text.font.lineHeight).sort(),
  )
  theme.border.color.push(
    ...Object.keys(themeInput.border.color).sort(),
  )
  theme.border.style.push(
    ...Object.keys(themeInput.border.style).sort(),
  )
  theme.border.width.top.push(
    ...Object.keys(themeInput.border.width.top).sort(),
  )
  theme.border.width.bottom.push(
    ...Object.keys(themeInput.border.width.bottom).sort(),
  )
  theme.border.width.left.push(
    ...Object.keys(themeInput.border.width.left).sort(),
  )
  theme.border.width.right.push(
    ...Object.keys(themeInput.border.width.right).sort(),
  )
  theme.border.radius.push(
    ...Object.keys(themeInput.border.radius).sort(),
  )
  theme.typography.push(
    ...[...typographyInput.keys()].map(key => JSON.parse(key)),
  )
  theme.component.push(
    ...[...componentsInput.keys()].map(key => JSON.parse(key)),
  )

  return theme

  function process(el: HTMLElement) {
    const style = window.getComputedStyle(el)
    // const background = cssBgParser.parseElementStyle(style)
    let background
    try {
      background = expandShorthandProperty(
        'background',
        style.background,
      )
    } catch (e) {}
    const backgroundColor = background?.['background-color']
      ? parseHexColor(background['background-color'])
      : undefined
    const font = parseFont(style.font) ?? {}
    const lineHeight = style.lineHeight
    const fontKey = {
      family: font['font-family'],
      size: font['font-size'],
      lineHeight: font['line-height'] || lineHeight,
    }
    typographyInput.set(KEY(fontKey), true)
    //     'font-family': ['Neue Helvetica', 'Helvetica', 'sans-serif'],
    // >   'font-size': '15px',
    // >   'line-height': '18px'
    const color = style.color ? parseHexColor(style.color) : undefined
    const borderRadiusValue = style.borderRadius
    const borderRadius = borderRadiusValue
    const border = expandShorthandProperty('border', style.border)
    const borderLeftWidthValue = border['border-left-width']
      ? border['border-left-width']
      : undefined
    const borderRightWidthValue = border['border-right-width']
      ? border['border-right-width']
      : undefined
    const borderTopWidthValue = border['border-top-width']
      ? border['border-top-width']
      : undefined
    const borderBottomWidthValue = border['border-bottom-width']
      ? border['border-bottom-width']
      : undefined
    const borderLeftWidth = borderLeftWidthValue
    const borderRightWidth = borderRightWidthValue
    const borderTopWidth = borderTopWidthValue
    const borderBottomWidth = borderBottomWidthValue
    const hasBorderWidth =
      borderLeftWidth ||
      borderRightWidth ||
      borderTopWidth ||
      borderBottomWidth
    const borderColor =
      hasBorderWidth && border['border-color']
        ? parseHexColor(border['border-color'])
        : undefined
    const borderStyle =
      hasBorderWidth && border['border-style']
        ? border['border-style']
        : undefined

    if (color !== backgroundColor) {
      componentsInput.set(
        KEY({
          ...fontKey,
          borderColor,
          borderStyle,
          borderRadius,
          color,
          backgroundColor,
        }),
        true,
      )
    }

    if (borderTopWidth) {
      themeInput.border.width.top[borderTopWidth] = true
    }
    if (borderBottomWidth) {
      themeInput.border.width.bottom[borderBottomWidth] = true
    }
    if (borderLeftWidth) {
      themeInput.border.width.left[borderLeftWidth] = true
    }
    if (borderRightWidth) {
      themeInput.border.width.right[borderRightWidth] = true
    }
    themeInput.border.radius[borderRadius] = true
    if (color) {
      themeInput.text.color[color] = true
    }
    if (backgroundColor) {
      themeInput.background.color[backgroundColor] = true
    }

    if (fontKey.family) {
      themeInput.text.font.family[fontKey.family?.join(';')] = true
    }
    if (fontKey.size) {
      themeInput.text.font.size[fontKey.size] = true
    }
    if (fontKey.lineHeight) {
      themeInput.text.font.lineHeight[fontKey.lineHeight] = true
    }

    // const padding = expandShorthandProperty('padding', style.padding)
    // const margin = expandShorthandProperty('margin', style.margin)
  }

  function parseHexColor(color: string) {
    if (ColorTranslator.toRGBAObject(color).A === 0) {
      return
    }
    return new ColorTranslator(color).HEXA.toUpperCase()
  }
}

function KEY(obj) {
  return JSON.stringify(obj)
}
