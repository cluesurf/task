import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  BuildBaseFileInput,
  BuildBaseInputDirectoryOrFileOutputFile,
  BuildBaseInputFileOutputDirectory,
  BuildFormatInputOutput,
  ConvertFileBase,
  ConvertFileBaseRemote,
  Task,
} from '~/code/type/action/shared/index'
import {
  FileContentParser,
  FilePathParser,
} from '~/code/type/object/file/parsers'

let BuildBaseFileInputModel: z.ZodType<BuildBaseFileInput>

export const BuildBaseFileInputParser =
  (): z.ZodType<BuildBaseFileInput> => {
    if (!BuildBaseFileInputModel) {
      BuildBaseFileInputModel = z.object({
        tool: z.optional(z.string()),
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
      }) as z.ZodType<BuildBaseFileInput>
    }
    return BuildBaseFileInputModel!
  }

let BuildBaseInputDirectoryOrFileOutputFileModel: z.ZodType<BuildBaseInputDirectoryOrFileOutputFile>

export const BuildBaseInputDirectoryOrFileOutputFileParser =
  (): z.ZodType<BuildBaseInputDirectoryOrFileOutputFile> => {
    if (!BuildBaseInputDirectoryOrFileOutputFileModel) {
      BuildBaseInputDirectoryOrFileOutputFileModel = z.object({
        input: z.object({
          directory: z.optional(
            z.object({
              path: z.string(),
            }),
          ),
          file: z.optional(
            z.object({
              path: z.string(),
            }),
          ),
        }),
        output: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<BuildBaseInputDirectoryOrFileOutputFile>
    }
    return BuildBaseInputDirectoryOrFileOutputFileModel!
  }

let BuildBaseInputFileOutputDirectoryModel: z.ZodType<BuildBaseInputFileOutputDirectory>

export const BuildBaseInputFileOutputDirectoryParser =
  (): z.ZodType<BuildBaseInputFileOutputDirectory> => {
    if (!BuildBaseInputFileOutputDirectoryModel) {
      BuildBaseInputFileOutputDirectoryModel = z.object({
        output: z.object({
          directory: z.object({
            path: z.string(),
          }),
        }),
        input: z.object({
          file: z.object({
            path: z.string(),
          }),
        }),
      }) as z.ZodType<BuildBaseInputFileOutputDirectory>
    }
    return BuildBaseInputFileOutputDirectoryModel!
  }

let BuildFormatInputOutputModel: z.ZodType<BuildFormatInputOutput>

export const BuildFormatInputOutputParser =
  (): z.ZodType<BuildFormatInputOutput> => {
    if (!BuildFormatInputOutputModel) {
      BuildFormatInputOutputModel = z.object({
        tool: z.optional(z.string()),
        input: z.object({
          format: z.string(),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<BuildFormatInputOutput>
    }
    return BuildFormatInputOutputModel!
  }

let ConvertFileBaseModel: z.ZodType<ConvertFileBase>

export const ConvertFileBaseParser = (): z.ZodType<ConvertFileBase> => {
  if (!ConvertFileBaseModel) {
    ConvertFileBaseModel = z.object({
      tool: z.optional(z.string()),
      remote: z.optional(z.boolean()),
      async: z.optional(z.boolean()).default(false),
      input: z.object({
        format: z.string(),
        file: z.union([
          z.lazy(() => FileContentParser()),
          z.lazy(() => FilePathParser()),
        ]),
      }),
      output: z.object({
        format: z.string(),
        file: z.object({
          path: z.string(),
        }),
      }),
    }) as z.ZodType<ConvertFileBase>
  }
  return ConvertFileBaseModel!
}

let ConvertFileBaseRemoteModel: z.ZodType<ConvertFileBaseRemote>

export const ConvertFileBaseRemoteParser =
  (): z.ZodType<ConvertFileBaseRemote> => {
    if (!ConvertFileBaseRemoteModel) {
      ConvertFileBaseRemoteModel = z.object({
        tool: z.optional(z.string()),
        remote: z.optional(z.boolean()),
        async: z.optional(z.boolean()).default(false),
        input: z.object({
          format: z.string(),
          file: z.union([
            z.lazy(() => FileContentParser()),
            z.lazy(() => FilePathParser()),
          ]),
        }),
        output: z.object({
          format: z.string(),
        }),
      }) as z.ZodType<ConvertFileBaseRemote>
    }
    return ConvertFileBaseRemoteModel!
  }

let TaskModel: z.ZodType<Task>

export const TaskParser = () => {
  if (!TaskModel) {
    TaskModel = z.enum(
      LOAD('task') as readonly [string, ...string[]],
    ) as z.ZodType<Task>
  }
  return TaskModel!
}
