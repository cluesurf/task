import { z } from 'zod'

import { CommandKey, CommandName } from '~/code/form/object/request'
import {
  COMMAND_KEY,
  COMMAND_NAME,
} from '~/code/form/object/request/base'

export const CommandParser = z.object({
  name: z.lazy(() => CommandNameParser),
  key: z.lazy(() => CommandKeyParser),
  link: z.array(z.string()),
})

export type CommandRecord = z.infer<typeof CommandParser>

export const CommandKeyParser = z.enum(
  COMMAND_KEY as readonly [string, ...string[]],
) as z.ZodType<CommandKey>

export const CommandNameParser = z.enum(
  COMMAND_NAME as readonly [string, ...string[]],
) as z.ZodType<CommandName>

export const CommandSequenceParser = z.object({
  call: z.array(z.lazy(() => CommandParser)),
})

export type CommandSequenceRecord = z.infer<
  typeof CommandSequenceParser
>

export const RequestParser = z.object({
  path: z.string(),
  body: z.object({}).passthrough(),
})

export type RequestRecord = z.infer<typeof RequestParser>
