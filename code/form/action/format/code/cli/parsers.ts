import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/form/code'

import {
  FormatAssemblyCommandInput,
  FormatCodeWithClangFormatCommandInput,
  FormatKotlinCommandInput,
  FormatPythonCommandInput,
  FormatRustCommandInput,
  FormatSwiftCommandInput,
} from '~/code/form/action/format/code/cli/index'
import { LocalPathParser } from '~/code/form/object/file/parsers'
import { ClangFormatParser } from '~/code/form/action/format/code/shared/parsers'

let FormatAssemblyCommandInputModel: z.ZodType<FormatAssemblyCommandInput>

export const FormatAssemblyCommandInputParser =
  (): z.ZodType<FormatAssemblyCommandInput> => {
    if (!FormatAssemblyCommandInputModel) {
      FormatAssemblyCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatAssemblyCommandInput>
    }
    return FormatAssemblyCommandInputModel!
  }

let FormatCodeWithClangFormatCommandInputModel: z.ZodType<FormatCodeWithClangFormatCommandInput>

export const FormatCodeWithClangFormatCommandInputParser =
  (): z.ZodType<FormatCodeWithClangFormatCommandInput> => {
    if (!FormatCodeWithClangFormatCommandInputModel) {
      FormatCodeWithClangFormatCommandInputModel = z.object({
        format: z.lazy(() => ClangFormatParser()),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
        style: z.object({
          path: z.string(),
        }),
      }) as z.ZodType<FormatCodeWithClangFormatCommandInput>
    }
    return FormatCodeWithClangFormatCommandInputModel!
  }

let FormatKotlinCommandInputModel: z.ZodType<FormatKotlinCommandInput>

export const FormatKotlinCommandInputParser =
  (): z.ZodType<FormatKotlinCommandInput> => {
    if (!FormatKotlinCommandInputModel) {
      FormatKotlinCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatKotlinCommandInput>
    }
    return FormatKotlinCommandInputModel!
  }

let FormatPythonCommandInputModel: z.ZodType<FormatPythonCommandInput>

export const FormatPythonCommandInputParser =
  (): z.ZodType<FormatPythonCommandInput> => {
    if (!FormatPythonCommandInputModel) {
      FormatPythonCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatPythonCommandInput>
    }
    return FormatPythonCommandInputModel!
  }

let FormatRustCommandInputModel: z.ZodType<FormatRustCommandInput>

export const FormatRustCommandInputParser =
  (): z.ZodType<FormatRustCommandInput> => {
    if (!FormatRustCommandInputModel) {
      FormatRustCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatRustCommandInput>
    }
    return FormatRustCommandInputModel!
  }

let FormatSwiftCommandInputModel: z.ZodType<FormatSwiftCommandInput>

export const FormatSwiftCommandInputParser =
  (): z.ZodType<FormatSwiftCommandInput> => {
    if (!FormatSwiftCommandInputModel) {
      FormatSwiftCommandInputModel = z.object({
        format: z.string(),
        input: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        output: z.object({
          file: z.lazy(() => LocalPathParser()),
        }),
        pathScope: z.optional(z.string()),
      }) as z.ZodType<FormatSwiftCommandInput>
    }
    return FormatSwiftCommandInputModel!
  }
