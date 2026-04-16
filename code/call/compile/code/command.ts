// ; ModuleID = 'tmp/c.c'
// source_filename = "tmp/c.c"
// target datalayout = "e-m:o-i64:64-i128:128-n32:64-S128"
// target triple = "arm64-apple-macosx14.0.0"

import { getConfig } from '~/code/tool/shared/config'
import { CompileCCommandInput } from '~/code/form/action/compile/code/c/cli'
import { CompileCppCommandInput } from '~/code/form/action/compile/code/cpp/cli'
import { CompileLlvmIrToAssembly } from '~/code/form/action/compile/code/llvm-ir'
import { CompileRustCommandInput } from '~/code/form/action/compile/code/rust/cli'
import { CompileSwiftCommandInput } from '~/code/form/action/compile/code/swift/cli' // @.str = private unnamed_addr constant [14 x i8] c"Hello, World!\00", align 1
export async function buildCommandToCompileC(
  input: CompileCCommandInput,
): Promise<{ bin: string; args: string[] }> {
  const bin = 'clang'
  const args: string[] = [`-O${input.optimizationLevel}`]

  if (input.output.format === 'llvm-ir') {
    args.push(`-S`, `-emit-llvm`)
  } else if (input.output.format === 'llvm-bitcode') {
    args.push(`-c`, `-emit-llvm`)
  } else if (input.output.format === 'assembly') {
    args.push(`-S`)
  }

  if (input.output.architecture) {
    args.push(`-target`, input.output.architecture)
  }

  if (input.output.syntax && input.output.format === 'assembly') {
    args.push(`-masm`, `${input.output.syntax}`)
  }

  if (input.fastMath) {
    args.push(`-ffast-math`)
  }

  args.push(`-o`, input.output.file.path, input.input.file.path)

  return { bin, args }
}

export async function buildCommandToCompileCpp(
  input: CompileCppCommandInput,
): Promise<{ bin: string; args: string[] }> {
  const bin = 'clang++'
  const args: string[] = [`-O${input.optimizationLevel}`]

  if (input.output.format === 'llvm-ir') {
    args.push(`-S`, `-emit-llvm`)
  } else if (input.output.format === 'llvm-bitcode') {
    args.push(`-c`, `-emit-llvm`)
  } else if (input.output.format === 'assembly') {
    args.push(`-S`)
  }

  if (input.output.architecture) {
    args.push(`-target`, input.output.architecture)
  }

  if (input.output.syntax && input.output.format === 'assembly') {
    args.push(`-masm`, `${input.output.syntax}`)
  }

  if (input.fastMath) {
    args.push(`-ffast-math`)
  }

  args.push(`-o`, input.output.file.path, input.input.file.path)

  return { bin, args }
}

export function buildCommandToCompileSwift(
  input: CompileSwiftCommandInput,
): { bin: string; args: string[] } {
  const bin = 'swiftc'
  const args: string[] = []

  if (input.output.format === 'assembly') {
    args.push(`-emit-assembly`)
  } else if (input.output.format === 'llvm-ir') {
    args.push(`-emit-ir`)
  }

  args.push(input.input.file.path, '-o', input.output.file.path)

  return { bin, args }
}

export function buildCommandToCompileRust(
  input: CompileRustCommandInput,
): { bin: string; args: string[] } {
  const bin = 'rustc'
  const args: string[] = []

  if (input.output.format === 'assembly') {
    args.push(`--emit`, `asm`)
  } else if (input.output.format === 'llvm-ir') {
    args.push(`--emit`, 'llvm-ir')
  } else if (input.output.format === 'llvm-bitcode') {
    args.push(`--emit`, 'llvm-bc')
  } else if (input.output.format === 'mir') {
    args.push(`--emit`, 'mir')
  }

  if (input.output.optimize) {
    args.push('-O')
  }

  if (input.explain) {
    args.push('--explain')
  }

  if (input.output.target) {
    args.push('--target', input.output.target)
  }

  // args.push(`--error-format`, `json`)
  args.push(`--color`, `always`)
  args.push(`--diagnostic-width`, String(92))

  args.push(input.input.file.path, '-o', input.output.file.path)

  return { bin, args }
}

export function buildCommandToCompileLlvmIrToAssembly(
  input: CompileLlvmIrToAssembly,
): { bin: string; args: string[] } {
  const LLVM_ARCHITECTURE_CONTENT = getConfig(
    'llvm_architecture_content',
  )
  const architectureKey =
    LLVM_ARCHITECTURE_CONTENT[input.output.architecture ?? 'x86_64']
      .host

  const bin = 'llc'
  const args: string[] = [
    `--x86-asm-syntax=${input.output.syntax}`,
    `-march=${architectureKey}`,
    `-o`,
    input.output.file.path,
    input.input.file.path,
  ]

  return { bin, args }
}
