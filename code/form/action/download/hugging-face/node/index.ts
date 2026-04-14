import { HuggingFaceRepoType } from '~/code/form/object/hugging-face'

export type DownloadHuggingFaceNodeInput = {
  repo: string
  repoType?: HuggingFaceRepoType
  directory: {
    path: string
  }
  include?: Array<string>
  exclude?: Array<string>
  revision?: string
}
export type DownloadHuggingFaceNodeOutput = {
  directory: string
}
