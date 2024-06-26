import merge from 'lodash/merge'
import {
  BackendCompilationOutput,
  BackendCompilationOutputData,
  LlvmArchitecture,
  LlvmArchitectureData,
  LlvmCpu,
  LlvmCpuData,
  LlvmFeature,
  LlvmFeatureData,
} from '~/code/type/shared/index.js'

export type BackendCompilationOutputContentValue =
  BackendCompilationOutputData

export type BackendCompilationOutputContent = Record<
  BackendCompilationOutput,
  BackendCompilationOutputContentValue
>
export type LlvmArchitectureContentValue = LlvmArchitectureData

export type LlvmArchitectureContent = Record<
  LlvmArchitecture,
  LlvmArchitectureContentValue
>
export type LlvmCpuContentValue = LlvmCpuData

export type LlvmCpuContent = Record<LlvmCpu, LlvmCpuContentValue>
export type LlvmFeatureContentValue = LlvmFeatureData

export type LlvmFeatureContent = Record<
  LlvmFeature,
  LlvmFeatureContentValue
>
