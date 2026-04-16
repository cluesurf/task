export type ConvertImageWithDarktableCommandInput = {
  input: {
    file: {
      path: string
    }
  }
  output: {
    file: {
      path: string
    }
  }
  xmp?: string
  highQuality?: boolean
  upscale?: boolean
}
