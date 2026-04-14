// Route table for `task.convert(...)` on Node. Will be auto-generated
// by `pnpm make:type` once the codegen pass lands; hand-written here
// while the pattern is being validated.
//
// Each entry carries TWO lazy loaders:
//   - loadBase: imports the tool's format lists (tiny, value-only).
//                Probed first to decide if this tool owns the pair.
//   - loadCall: imports the handler (child_process, wasm, etc.).
//                Only loaded after loadBase matches.

export type ConvertBase = {
  input: ReadonlyArray<string>
  output: ReadonlyArray<string>
}

export type ConvertCall = {
  run: (source: unknown) => Promise<unknown>
}

export type ConvertRoute = {
  tool: string
  loadBase: () => Promise<ConvertBase>
  loadCall: () => Promise<ConvertCall>
}

export const convertRouteNode: ReadonlyArray<ConvertRoute> = [
  {
    tool: 'imagemagick',
    loadBase: async () => {
      const mod = await import('~/code/form/object/imagemagick/base')
      return {
        input: mod.IMAGE_MAGICK_INPUT_FORMAT,
        output: mod.IMAGE_MAGICK_OUTPUT_FORMAT,
      }
    },
    loadCall: async () => {
      const mod = await import('~/code/call/convert/image/imagemagick/node')
      return {
        run: source => mod.convertImageWithImageMagickNode(source as never),
      }
    },
  },
  {
    tool: 'inkscape',
    loadBase: async () => {
      const mod = await import('~/code/form/object/inkscape/base')
      return {
        input: mod.INKSCAPE_IMPORT_FORMAT,
        output: mod.INKSCAPE_EXPORT_FORMAT,
      }
    },
    loadCall: async () => {
      const mod = await import('~/code/call/convert/image/inkscape/node')
      return {
        run: source => mod.convertImageWithInkscapeNode(source as never),
      }
    },
  },
  {
    tool: 'pandoc',
    loadBase: async () => {
      const mod = await import('~/code/form/object/pandoc/base')
      return {
        input: mod.PANDOC_INPUT_FORMAT,
        output: mod.PANDOC_OUTPUT_FORMAT,
      }
    },
    loadCall: async () => {
      const mod = await import('~/code/call/convert/document/pandoc/node')
      return {
        run: source => mod.convertDocumentWithPandocNode(source as never),
      }
    },
  },
  {
    tool: 'libre-office',
    loadBase: async () => {
      const mod = await import('~/code/form/object/libre-office/base')
      return {
        input: mod.LIBRE_OFFICE_INPUT_FORMAT,
        output: mod.LIBRE_OFFICE_OUTPUT_FORMAT,
      }
    },
    loadCall: async () => {
      const mod = await import('~/code/call/convert/document/libre-office/node')
      return {
        run: source =>
          mod.convertDocumentWithLibreOfficeNode(source as never),
      }
    },
  },
  {
    tool: 'calibre',
    loadBase: async () => {
      const mod = await import('~/code/form/object/calibre/base')
      return {
        input: mod.CALIBRE_INPUT_FORMAT,
        output: mod.CALIBRE_OUTPUT_FORMAT,
      }
    },
    loadCall: async () => {
      const mod = await import('~/code/call/convert/document/calibre/node')
      return {
        run: source =>
          mod.convertDocumentWithCalibreNode(source as never),
      }
    },
  },
  {
    tool: 'enscript',
    loadBase: async () => {
      const mod = await import('~/code/form/object/enscript/base')
      return {
        input: mod.ENSCRIPT_INPUT_FORMAT,
        output: mod.ENSCRIPT_OUTPUT_FORMAT,
      }
    },
    loadCall: async () => {
      const mod = await import('~/code/call/convert/document/enscript/node')
      return {
        run: source =>
          mod.convertDocumentWithEnscriptNode(source as never),
      }
    },
  },
  {
    tool: 'duckdb',
    loadBase: async () => {
      const mod = await import('~/code/form/object/data/base')
      return {
        input: mod.DATA_FORMAT,
        output: mod.DATA_FORMAT,
      }
    },
    loadCall: async () => {
      const mod = await import('~/code/call/convert/data/node')
      return {
        run: source => mod.convertDataNode(source as never),
      }
    },
  },
  {
    tool: 'fontforge',
    loadBase: async () => {
      const mod = await import('~/code/form/object/font/base')
      return {
        input: mod.FONT_FORMAT,
        output: mod.FONT_FORMAT,
      }
    },
    loadCall: async () => {
      const mod = await import('~/code/call/convert/font/node')
      return {
        run: source => mod.convertFontWithFontForgeNode(source as never),
      }
    },
  },
]
