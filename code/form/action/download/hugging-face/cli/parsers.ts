import { z } from 'zod'
import { DownloadHuggingFaceCommandInput } from './index'

const RepoTypeParser = z.enum(['dataset', 'model', 'space'])

let Model: z.ZodType<DownloadHuggingFaceCommandInput>

export const DownloadHuggingFaceCommandInputParser =
  (): z.ZodType<DownloadHuggingFaceCommandInput> => {
    if (!Model) {
      Model = z.object({
        repo: z.string(),
        repoType: RepoTypeParser.optional(),
        directory: z.object({ path: z.string() }),
        include: z.array(z.string()).optional(),
        exclude: z.array(z.string()).optional(),
        revision: z.string().optional(),
        help: z.boolean().optional(),
      }) as z.ZodType<DownloadHuggingFaceCommandInput>
    }
    return Model!
  }
