export type SetMetadata = {
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
  title?: string
  artist?: string
  album?: string
  albumArtist?: string
  composer?: string
  track?: string
  disc?: string
  genre?: string
  year?: string
  publisher?: string
  website?: string
  comment?: string
  cover?: {
    file: {
      path: string
    }
  }
  lyrics?: {
    file: {
      path: string
    }
    language?: string
  }
}
