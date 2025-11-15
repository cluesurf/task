import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  Command,
  CommandKey,
  CommandName,
  CommandSequence,
  Request,
} from '~/code/form/object/request/index'

let CommandModel: z.ZodType<Command>

export const CommandParser = (): z.ZodType<Command> => {
  if (!CommandModel) {
    CommandModel = z.object({
      name: z.lazy(() => CommandNameParser()),
      key: z.lazy(() => CommandKeyParser()),
      link: z.array(z.string()),
    }) as z.ZodType<Command>
  }
  return CommandModel!
}

let CommandKeyModel: z.ZodType<CommandKey>

export const CommandKeyParser = () => {
  if (!CommandKeyModel) {
    CommandKeyModel = z.enum(
      LOAD('command_key') as readonly [string, ...string[]],
    ) as z.ZodType<CommandKey>
  }
  return CommandKeyModel!
}

let CommandNameModel: z.ZodType<CommandName>

export const CommandNameParser = () => {
  if (!CommandNameModel) {
    CommandNameModel = z.enum(
      LOAD('command_name') as readonly [string, ...string[]],
    ) as z.ZodType<CommandName>
  }
  return CommandNameModel!
}

let CommandSequenceModel: z.ZodType<CommandSequence>

export const CommandSequenceParser = (): z.ZodType<CommandSequence> => {
  if (!CommandSequenceModel) {
    CommandSequenceModel = z.object({
      call: z.array(z.lazy(() => CommandParser())),
    }) as z.ZodType<CommandSequence>
  }
  return CommandSequenceModel!
}

let RequestModel: z.ZodType<Request>

export const RequestParser = (): z.ZodType<Request> => {
  if (!RequestModel) {
    RequestModel = z.object({
      path: z.string(),
      body: z.object({}).passthrough(),
    }) as z.ZodType<Request>
  }
  return RequestModel!
}
