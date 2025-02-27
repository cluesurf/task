import { z } from 'zod'
import { LOAD, MAKE, TEST } from '@cluesurf/form'
import * as code from '~/code/type/code.js'

import {
  BackendCompilationOutput,
  BackendCompilationOutputData,
  LlvmArchitecture,
  LlvmArchitectureData,
  LlvmCpu,
  LlvmCpuData,
  LlvmFeature,
  LlvmFeatureData,
  LlvmOptimizationLevel,
} from '~/code/type/object/llvm/index'

let BackendCompilationOutputModel: z.ZodType<BackendCompilationOutput>

export const BackendCompilationOutputParser = () => {
  if (!BackendCompilationOutputModel) {
    BackendCompilationOutputModel = z.enum(
      LOAD('backend_compilation_output') as readonly [
        string,
        ...string[],
      ],
    ) as z.ZodType<BackendCompilationOutput>
  }
  return BackendCompilationOutputModel!
}

let BackendCompilationOutputDataModel: z.ZodType<BackendCompilationOutputData>

export const BackendCompilationOutputDataParser =
  (): z.ZodType<BackendCompilationOutputData> => {
    if (!BackendCompilationOutputDataModel) {
      BackendCompilationOutputDataModel = z.object({
        extension: z.optional(z.string()),
      }) as z.ZodType<BackendCompilationOutputData>
    }
    return BackendCompilationOutputDataModel!
  }

let LlvmArchitectureModel: z.ZodType<LlvmArchitecture>

export const LlvmArchitectureParser = () => {
  if (!LlvmArchitectureModel) {
    LlvmArchitectureModel = z.enum(
      LOAD('llvm_architecture') as readonly [string, ...string[]],
    ) as z.ZodType<LlvmArchitecture>
  }
  return LlvmArchitectureModel!
}

let LlvmArchitectureDataModel: z.ZodType<LlvmArchitectureData>

export const LlvmArchitectureDataParser =
  (): z.ZodType<LlvmArchitectureData> => {
    if (!LlvmArchitectureDataModel) {
      LlvmArchitectureDataModel = z.object({
        host: z.string(),
        note: z.string(),
        cpu: z.array(z.string()),
        feature: z.array(z.string()),
      }) as z.ZodType<LlvmArchitectureData>
    }
    return LlvmArchitectureDataModel!
  }

let LlvmCpuModel: z.ZodType<LlvmCpu>

export const LlvmCpuParser = () => {
  if (!LlvmCpuModel) {
    LlvmCpuModel = z.enum(
      LOAD('llvm_cpu') as readonly [string, ...string[]],
    ) as z.ZodType<LlvmCpu>
  }
  return LlvmCpuModel!
}

let LlvmCpuDataModel: z.ZodType<LlvmCpuData>

export const LlvmCpuDataParser = (): z.ZodType<LlvmCpuData> => {
  if (!LlvmCpuDataModel) {
    LlvmCpuDataModel = z.object({
      host: z.string(),
      note: z.string(),
    }) as z.ZodType<LlvmCpuData>
  }
  return LlvmCpuDataModel!
}

let LlvmFeatureModel: z.ZodType<LlvmFeature>

export const LlvmFeatureParser = () => {
  if (!LlvmFeatureModel) {
    LlvmFeatureModel = z.enum(
      LOAD('llvm_feature') as readonly [string, ...string[]],
    ) as z.ZodType<LlvmFeature>
  }
  return LlvmFeatureModel!
}

let LlvmFeatureDataModel: z.ZodType<LlvmFeatureData>

export const LlvmFeatureDataParser = (): z.ZodType<LlvmFeatureData> => {
  if (!LlvmFeatureDataModel) {
    LlvmFeatureDataModel = z.object({
      host: z.string(),
      note: z.string(),
    }) as z.ZodType<LlvmFeatureData>
  }
  return LlvmFeatureDataModel!
}

let LlvmOptimizationLevelModel: z.ZodType<LlvmOptimizationLevel>

export const LlvmOptimizationLevelParser = () => {
  if (!LlvmOptimizationLevelModel) {
    LlvmOptimizationLevelModel = z.enum(
      LOAD('llvm_optimization_level') as readonly [string, ...string[]],
    ) as z.ZodType<LlvmOptimizationLevel>
  }
  return LlvmOptimizationLevelModel!
}
