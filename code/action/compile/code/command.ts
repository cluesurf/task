// ; ModuleID = 'tmp/c.c'
// source_filename = "tmp/c.c"
// target datalayout = "e-m:o-i64:64-i128:128-n32:64-S128"
// target triple = "arm64-apple-macosx14.0.0"

import {
  buildCommandSequence,
  getCommand,
} from '~/code/tool/shared/command'
import { getConfig } from '~/code/tool/shared/config'
import {
  CompileCCommandInput,
  CompileCppCommandInput,
  CompileLlvmIrToAssembly,
  CompileRustCommandInput,
  CompileSwiftCommandInput,
} from '~/code/type/shared'

// @.str = private unnamed_addr constant [14 x i8] c"Hello, World!\00", align 1
export async function buildCommandToCompileC(
  input: CompileCCommandInput,
) {
  const cmd = getCommand(`clang`)
  cmd.link.push(`-O${input.optimizationLevel}`)

  if (input.output.format === 'llvm-ir') {
    cmd.link.push(`-S`, `-emit-llvm`)
  } else if (input.output.format === 'llvm-bitcode') {
    cmd.link.push(`-c`, `-emit-llvm`)
  } else if (input.output.format === 'assembly') {
    cmd.link.push(`-S`)
  }

  if (input.output.architecture) {
    cmd.link.push(`-target`, input.output.architecture)
  }

  if (input.output.syntax && input.output.format === 'assembly') {
    cmd.link.push(`-masm`, `${input.output.syntax}`)
  }

  if (input.fastMath) {
    cmd.link.push(`-ffast-math`)
  }

  cmd.link.push(
    `-o`,
    `"${input.output.file.path}"`,
    `"${input.input.file.path}"`,
  )

  return buildCommandSequence(cmd)
}

export async function buildCommandToCompileCpp(
  input: CompileCppCommandInput,
) {
  const cmd = getCommand(`clang++`)
  cmd.link.push(`-O${input.optimizationLevel}`)

  if (input.output.format === 'llvm-ir') {
    cmd.link.push(`-S`, `-emit-llvm`)
  } else if (input.output.format === 'llvm-bitcode') {
    cmd.link.push(`-c`, `-emit-llvm`)
  } else if (input.output.format === 'assembly') {
    cmd.link.push(`-S`)
  }

  if (input.output.architecture) {
    cmd.link.push(`-target`, input.output.architecture)
  }

  if (input.output.syntax && input.output.format === 'assembly') {
    cmd.link.push(`-masm`, `${input.output.syntax}`)
  }

  if (input.fastMath) {
    cmd.link.push(`-ffast-math`)
  }

  cmd.link.push(
    `-o`,
    `"${input.output.file.path}"`,
    `"${input.input.file.path}"`,
  )

  return buildCommandSequence(cmd)
}

export function buildCommandToCompileSwift(
  input: CompileSwiftCommandInput,
) {
  const cmd = getCommand(`swiftc`)

  if (input.output.format === 'assembly') {
    cmd.link.push(`-emit-assembly`)
  } else if (input.output.format === 'llvm-ir') {
    cmd.link.push(`-emit-ir`)
  }

  cmd.link.push(
    `"${input.input.file.path}"`,
    '-o',
    `"${input.output.file.path}"`,
  )

  return buildCommandSequence(cmd)
}

export function buildCommandToCompileRust(
  input: CompileRustCommandInput,
) {
  const cmd = getCommand('rustc')

  if (input.output.format === 'assembly') {
    cmd.link.push(`--emit`, `asm`)
  } else if (input.output.format === 'llvm-ir') {
    cmd.link.push(`--emit`, 'llvm-ir')
  } else if (input.output.format === 'llvm-bitcode') {
    cmd.link.push(`--emit`, 'llvm-bc')
  } else if (input.output.format === 'mir') {
    cmd.link.push(`--emit`, 'mir')
  }

  if (input.output.optimize) {
    cmd.link.push('-O')
  }

  if (input.explain) {
    cmd.link.push('--explain')
  }

  if (input.output.target) {
    cmd.link.push('--target', input.output.target)
  }

  // cmd.link.push(`--error-format`, `json`)
  cmd.link.push(`--color`, `always`)
  cmd.link.push(`--diagnostic-width`, String(92))

  cmd.link.push(
    `"${input.input.file.path}"`,
    '-o',
    `"${input.output.file.path}"`,
  )

  return buildCommandSequence(cmd)
}

export function buildCommandToCompileLlvmIrToAssembly(
  input: CompileLlvmIrToAssembly,
) {
  const LLVM_ARCHITECTURE_CONTENT = getConfig(
    'llvm_architecture_content',
  )
  const architectureKey =
    LLVM_ARCHITECTURE_CONTENT[input.output.architecture ?? 'x86_64']
      .host

  const cmd = getCommand('llc')

  cmd.link.push(
    `--x86-asm-syntax=${input.output.syntax}`,
    `-march=${architectureKey}`,
    `-o`,
    `"${input.output.file.path}"`,
    `"${input.input.file.path}"`,
  )

  return buildCommandSequence(cmd)
}
