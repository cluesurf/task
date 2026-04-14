import { z } from 'zod'

export const SetMetadataParser = z.object({
  input: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  output: z.object({
    file: z.object({
      path: z.string(),
    }),
  }),
  title: z.optional(z.string()),
  artist: z.optional(z.string()),
  album: z.optional(z.string()),
  albumArtist: z.optional(z.string()),
  composer: z.optional(z.string()),
  track: z.optional(z.string()),
  disc: z.optional(z.string()).default('1/1'),
  genre: z.optional(z.string()),
  year: z.optional(z.string()),
  publisher: z.optional(z.string()),
  website: z.optional(z.string()),
  comment: z.optional(z.string()),
  cover: z.optional(
    z.object({
      file: z.object({
        path: z.string(),
      }),
    }),
  ),
  lyrics: z.optional(
    z.object({
      file: z.object({
        path: z.string(),
      }),
      language: z.optional(z.string()).default('eng'),
    }),
  ),
})

export type SetMetadataRecord = z.infer<typeof SetMetadataParser>
