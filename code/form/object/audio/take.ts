import { z } from 'zod'

import { AudioPadFormat } from '~/code/form/object/audio'
import { AUDIO_PAD_FORMAT } from '~/code/form/object/audio/base'

export const AudioPadFormatParser = z.enum(
  AUDIO_PAD_FORMAT as readonly [string, ...string[]],
) as z.ZodType<AudioPadFormat>
