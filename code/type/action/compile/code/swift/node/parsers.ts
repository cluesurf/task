import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  CompileSwiftNodeClientInput,
  CompileSwiftNodeExternalInput,
  CompileSwiftNodeInput,
  CompileSwiftNodeLocalExternalInput,
  CompileSwiftNodeLocalInput,
  CompileSwiftNodeLocalInternalInput,
  CompileSwiftNodeOutput,
  CompileSwiftNodeRemoteInput,
} from '~/code/type/action/compile/code/swift/node/index'
import { SwiftInputFormatParser } from '~/code/type/action/compile/code/swift/shared/parsers'
import {
  FileContentWithSha256Parser,
  FileInputPathParser,
  FilePathParser,
  LocalOutputPathParser,
  LocalPathParser,
  RemoteInputPathParser,
} from '~/code/type/object/file/parsers'
import { BackendCompilationOutputParser } from '~/code/type/object/llvm/parsers'

let CompileSwiftNodeClientInputModel: z.ZodType<CompileSwiftNodeClientInput>

export const CompileSwiftNodeClientInputParser =
  (): z.ZodType<CompileSwiftNodeClientInput> => {
    if (!CompileSwiftNodeClientInputModel) {
      CompileSwiftNodeClientInputModel = z.object({
        handle: z.literal('client'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
        }),
      }) as z.ZodType<CompileSwiftNodeClientInput>
    }
    return CompileSwiftNodeClientInputModel!
  }

let CompileSwiftNodeExternalInputModel: z.ZodType<CompileSwiftNodeExternalInput>

export const CompileSwiftNodeExternalInputParser =
  (): z.ZodType<CompileSwiftNodeExternalInput> => {
    if (!CompileSwiftNodeExternalInputModel) {
      CompileSwiftNodeExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
        }),
      }) as z.ZodType<CompileSwiftNodeExternalInput>
    }
    return CompileSwiftNodeExternalInputModel!
  }

let CompileSwiftNodeInputModel: z.ZodType<CompileSwiftNodeInput>

export const CompileSwiftNodeInputParser =
  (): z.ZodType<CompileSwiftNodeInput> => {
    if (!CompileSwiftNodeInputModel) {
      CompileSwiftNodeInputModel = z.union([
        z.lazy(() => CompileSwiftNodeRemoteInputParser()),
        z.lazy(() => CompileSwiftNodeLocalExternalInputParser()),
        z.lazy(() => CompileSwiftNodeLocalInternalInputParser()),
      ])
    }
    return CompileSwiftNodeInputModel!
  }

let CompileSwiftNodeLocalExternalInputModel: z.ZodType<CompileSwiftNodeLocalExternalInput>

export const CompileSwiftNodeLocalExternalInputParser =
  (): z.ZodType<CompileSwiftNodeLocalExternalInput> => {
    if (!CompileSwiftNodeLocalExternalInputModel) {
      CompileSwiftNodeLocalExternalInputModel = z.object({
        handle: z.literal('external'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => RemoteInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftNodeLocalExternalInput>
    }
    return CompileSwiftNodeLocalExternalInputModel!
  }

let CompileSwiftNodeLocalInputModel: z.ZodType<CompileSwiftNodeLocalInput>

export const CompileSwiftNodeLocalInputParser =
  (): z.ZodType<CompileSwiftNodeLocalInput> => {
    if (!CompileSwiftNodeLocalInputModel) {
      CompileSwiftNodeLocalInputModel = z.object({
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftNodeLocalInput>
    }
    return CompileSwiftNodeLocalInputModel!
  }

let CompileSwiftNodeLocalInternalInputModel: z.ZodType<CompileSwiftNodeLocalInternalInput>

export const CompileSwiftNodeLocalInternalInputParser =
  (): z.ZodType<CompileSwiftNodeLocalInternalInput> => {
    if (!CompileSwiftNodeLocalInternalInputModel) {
      CompileSwiftNodeLocalInternalInputModel = z.object({
        handle: z.optional(z.literal('internal')),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftNodeLocalInternalInput>
    }
    return CompileSwiftNodeLocalInternalInputModel!
  }

let CompileSwiftNodeOutputModel: z.ZodType<CompileSwiftNodeOutput>

export const CompileSwiftNodeOutputParser =
  (): z.ZodType<CompileSwiftNodeOutput> => {
    if (!CompileSwiftNodeOutputModel) {
      CompileSwiftNodeOutputModel = z.object({
        file: z.lazy(() => FilePathParser()),
      }) as z.ZodType<CompileSwiftNodeOutput>
    }
    return CompileSwiftNodeOutputModel!
  }

let CompileSwiftNodeRemoteInputModel: z.ZodType<CompileSwiftNodeRemoteInput>

export const CompileSwiftNodeRemoteInputParser =
  (): z.ZodType<CompileSwiftNodeRemoteInput> => {
    if (!CompileSwiftNodeRemoteInputModel) {
      CompileSwiftNodeRemoteInputModel = z.object({
        handle: z.literal('remote'),
        input: z.object({
          format: z.lazy(() => SwiftInputFormatParser()),
          file: z.union([
            z.lazy(() => FileInputPathParser()),
            z.lazy(() => FileContentWithSha256Parser()),
          ]),
        }),
        output: z.object({
          format: z.lazy(() => BackendCompilationOutputParser()),
          file: z.optional(z.lazy(() => LocalOutputPathParser())),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<CompileSwiftNodeRemoteInput>
    }
    return CompileSwiftNodeRemoteInputModel!
  }
