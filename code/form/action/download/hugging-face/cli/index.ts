import { HuggingFaceRepoType } from '~/code/form/object/hugging-face'

export type DownloadHuggingFaceCommandInput = {
  repo: string
  repoType?: HuggingFaceRepoType
  directory: {
    path: string
  }
  include?: Array<string>
  exclude?: Array<string>
  revision?: string
  help?: boolean
}
