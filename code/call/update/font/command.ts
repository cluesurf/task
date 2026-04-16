/**
 * Pure argv builder for `task update font`. Shells out to an
 * inline python3 script that drives fontTools' feaLib.builder.
 */

export function buildUpdateFontCommand(input: {
  inputPath: string
  outputPath: string
  feaPath: string
}) {
  const script = `
import sys
from fontTools.ttLib import TTFont
from fontTools.feaLib.builder import addOpenTypeFeatures
font_path, fea_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]
font = TTFont(font_path)
addOpenTypeFeatures(font, fea_path)
font.save(out_path)
`
  return {
    bin: 'python3',
    args: ['-c', script, input.inputPath, input.feaPath, input.outputPath],
  }
}
