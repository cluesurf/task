import { z } from 'zod'

import { HuggingFaceRepoType } from '~/code/form/object/hugging-face'
import { HUGGING_FACE_REPO_TYPE } from '~/code/form/object/hugging-face/base'

export const HuggingFaceRepoTypeParser = z.enum(
  HUGGING_FACE_REPO_TYPE as readonly [string, ...string[]],
) as z.ZodType<HuggingFaceRepoType>
