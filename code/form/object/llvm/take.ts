import { z } from 'zod'

import {
  BackendCompilationOutput,
  LlvmArchitecture,
  LlvmCpu,
  LlvmFeature,
  LlvmOptimizationLevel,
} from '~/code/form/object/llvm'
import {
  BACKEND_COMPILATION_OUTPUT,
  LLVM_ARCHITECTURE,
  LLVM_CPU,
  LLVM_FEATURE,
  LLVM_OPTIMIZATION_LEVEL,
} from '~/code/form/object/llvm/base'

export const BackendCompilationOutputParser = z.enum(
  BACKEND_COMPILATION_OUTPUT as readonly [string, ...string[]],
) as z.ZodType<BackendCompilationOutput>

export const BackendCompilationOutputDataParser = z.object({
  extension: z.optional(z.string()),
})

export type BackendCompilationOutputDataRecord = z.infer<
  typeof BackendCompilationOutputDataParser
>

export const LlvmArchitectureParser = z.enum(
  LLVM_ARCHITECTURE as readonly [string, ...string[]],
) as z.ZodType<LlvmArchitecture>

export const LlvmArchitectureDataParser = z.object({
  host: z.string(),
  note: z.string(),
  cpu: z.array(z.string()),
  feature: z.array(z.string()),
})

export type LlvmArchitectureDataRecord = z.infer<
  typeof LlvmArchitectureDataParser
>

export const LlvmCpuParser = z.enum(
  LLVM_CPU as readonly [string, ...string[]],
) as z.ZodType<LlvmCpu>

export const LlvmCpuDataParser = z.object({
  host: z.string(),
  note: z.string(),
})

export type LlvmCpuDataRecord = z.infer<typeof LlvmCpuDataParser>

export const LlvmFeatureParser = z.enum(
  LLVM_FEATURE as readonly [string, ...string[]],
) as z.ZodType<LlvmFeature>

export const LlvmFeatureDataParser = z.object({
  host: z.string(),
  note: z.string(),
})

export type LlvmFeatureDataRecord = z.infer<
  typeof LlvmFeatureDataParser
>

export const LlvmOptimizationLevelParser = z.enum(
  LLVM_OPTIMIZATION_LEVEL as readonly [string, ...string[]],
) as z.ZodType<LlvmOptimizationLevel>
