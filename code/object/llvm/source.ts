import { Form, Hash, List } from '@termsurf/form'
import LLVM_ARCHITECTURE_CONTENT from './llvm.architecture.json' assert { type: 'json' }
import LLVM_CPU_CONTENT from './llvm.cpu.json' assert { type: 'json' }
import LLVM_CPU from './llvm.cpu.key.json' assert { type: 'json' }
import LLVM_FEATURE_CONTENT from './llvm.feature.json' assert { type: 'json' }
import LLVM_FEATURE from './llvm.feature.key.json' assert { type: 'json' }

export const llvm_cpu: List = {
  form: 'list',
  list: LLVM_CPU,
}

export const llvm_cpu_data: Form = {
  form: 'form',
  link: {
    host: { like: 'string' },
    note: { like: 'string' },
  },
}

export const llvm_cpu_content: Hash = {
  form: 'hash',
  file: 'llvm',
  link: 'llvm_cpu',
  bond: {
    like: 'llvm_cpu_data',
  },
  hash: LLVM_CPU_CONTENT,
}

export const llvm_feature: List = {
  form: 'list',
  list: LLVM_FEATURE,
}

export const llvm_feature_data: Form = {
  form: 'form',
  link: {
    host: { like: 'string' },
    note: { like: 'string' },
  },
}

export const llvm_feature_content: Hash = {
  form: 'hash',
  file: 'llvm',
  link: 'llvm_feature',
  bond: { like: 'llvm_feature_data' },
  hash: LLVM_FEATURE_CONTENT,
}

export const llvm_architecture: List = {
  form: 'list',
  list: [
    'aarch64',
    'aarch64_32',
    'aarch64_be',
    'amdgcn',
    'arm',
    'arm64',
    'arm64_32',
    'armeb',
    'avr',
    'bpf',
    'bpfeb',
    'bpfel',
    'hexagon',
    'lanai',
    'mips',
    'mips64',
    'mips64el',
    'mipsel',
    'msp430',
    'nvptx',
    'nvptx64',
    'ppc32',
    'ppc64',
    'ppc64le',
    'r600',
    'riscv32',
    'riscv64',
    'sparc',
    'sparcel',
    'sparcv9',
    'systemz',
    'thumb',
    'thumbeb',
    'wasm32',
    'wasm64',
    'x86',
    'x86_64',
    'xcore',
  ],
}

export const llvm_optimization_level: List = {
  form: 'list',
  list: ['0', '1', '2', '3'],
}

export const llvm_architecture_data: Form = {
  form: 'form',
  link: {
    host: { like: 'string' },
    note: { like: 'string' },
    cpu: { like: 'string', list: true },
    feature: { like: 'string', list: true },
  },
}

export const llvm_architecture_content: Hash = {
  form: 'hash',
  file: 'llvm',
  link: 'llvm_architecture',
  bond: { like: 'llvm_architecture_data' },
  hash: {
    aarch64: {
      ...LLVM_ARCHITECTURE_CONTENT.aarch_64,
      host: 'aarch64',
      note: 'AArch64 (little endian)',
    },
    aarch64_32: {
      ...LLVM_ARCHITECTURE_CONTENT.aarch_64_32,
      host: 'aarch64_32',
      note: 'AArch64 (little endian ILP32)',
    },
    aarch64_be: {
      ...LLVM_ARCHITECTURE_CONTENT.aarch_64_be,
      host: 'aarch64_be',
      note: 'AArch64 (big endian)',
    },
    amdgcn: {
      ...LLVM_ARCHITECTURE_CONTENT.amdgcn,
      host: 'amdgcn',
      note: 'AMD GCN GPUs',
    },
    arm: {
      ...LLVM_ARCHITECTURE_CONTENT.arm,
      host: 'arm',
      note: 'ARM',
    },
    arm64: {
      ...LLVM_ARCHITECTURE_CONTENT.arm_64,
      host: 'arm64',
      note: 'ARM64 (little endian)',
    },
    arm64_32: {
      ...LLVM_ARCHITECTURE_CONTENT.arm_64_32,
      host: 'arm64_32',
      note: 'ARM64 (little endian ILP32)',
    },
    armeb: {
      ...LLVM_ARCHITECTURE_CONTENT.armeb,
      host: 'armeb',
      note: 'ARM (big endian)',
    },
    avr: {
      ...LLVM_ARCHITECTURE_CONTENT.avr,
      host: 'avr',
      note: 'Atmel AVR Microcontroller',
    },
    bpf: {
      ...LLVM_ARCHITECTURE_CONTENT.bpf,
      host: 'bpf',
      note: 'BPF (host endian)',
    },
    bpfeb: {
      ...LLVM_ARCHITECTURE_CONTENT.bpfeb,
      host: 'bpfeb',
      note: 'BPF (big endian)',
    },
    bpfel: {
      ...LLVM_ARCHITECTURE_CONTENT.bpfel,
      host: 'bpfel',
      note: 'BPF (little endian)',
    },
    hexagon: {
      ...LLVM_ARCHITECTURE_CONTENT.hexagon,
      host: 'hexagon',
      note: 'Hexagon',
    },
    lanai: {
      ...LLVM_ARCHITECTURE_CONTENT.lanai,
      host: 'lanai',
      note: 'Lanai',
    },
    mips: {
      ...LLVM_ARCHITECTURE_CONTENT.mips,
      host: 'mips',
      note: 'MIPS (32-bit big endian)',
    },
    mips64: {
      ...LLVM_ARCHITECTURE_CONTENT.mips_64,
      host: 'mips64',
      note: 'MIPS (64-bit big endian)',
    },
    mips64el: {
      ...LLVM_ARCHITECTURE_CONTENT.mips_64_el,
      host: 'mips64el',
      note: 'MIPS (64-bit little endian)',
    },
    mipsel: {
      ...LLVM_ARCHITECTURE_CONTENT.mipsel,
      host: 'mipsel',
      note: 'MIPS (32-bit little endian)',
    },
    msp430: {
      ...LLVM_ARCHITECTURE_CONTENT.msp_430,
      host: 'msp430',
      note: 'MSP430 [experimental]',
    },
    nvptx: {
      ...LLVM_ARCHITECTURE_CONTENT.nvptx,
      host: 'nvptx',
      note: 'NVIDIA PTX 32-bit',
    },
    nvptx64: {
      ...LLVM_ARCHITECTURE_CONTENT.nvptx_64,
      host: 'nvptx64',
      note: 'NVIDIA PTX 64-bit',
    },
    ppc32: {
      ...LLVM_ARCHITECTURE_CONTENT.ppc_32,
      host: 'ppc32',
      note: 'PowerPC 32',
    },
    ppc64: {
      ...LLVM_ARCHITECTURE_CONTENT.ppc_64,
      host: 'ppc64',
      note: 'PowerPC 64',
    },
    ppc64le: {
      ...LLVM_ARCHITECTURE_CONTENT.ppc_64_le,
      host: 'ppc64le',
      note: 'PowerPC 64 LE',
    },
    r600: {
      ...LLVM_ARCHITECTURE_CONTENT.r_600,
      host: 'r600',
      note: 'AMD GPUs HD2XXX-HD6XXX',
    },
    riscv32: {
      ...LLVM_ARCHITECTURE_CONTENT.riscv_32,
      host: 'riscv32',
      note: '32-bit RISC-V',
    },
    riscv64: {
      ...LLVM_ARCHITECTURE_CONTENT.riscv_64,
      host: 'riscv64',
      note: '64-bit RISC-V',
    },
    sparc: {
      ...LLVM_ARCHITECTURE_CONTENT.sparc,
      host: 'sparc',
      note: 'Sparc',
    },
    sparcel: {
      ...LLVM_ARCHITECTURE_CONTENT.sparcel,
      host: 'sparcel',
      note: 'Sparc LE',
    },
    sparcv9: {
      ...LLVM_ARCHITECTURE_CONTENT.sparcv_9,
      host: 'sparcv9',
      note: 'Sparc V9',
    },
    systemz: {
      ...LLVM_ARCHITECTURE_CONTENT.systemz,
      host: 'systemz',
      note: 'SystemZ',
    },
    thumb: {
      ...LLVM_ARCHITECTURE_CONTENT.thumb,
      host: 'thumb',
      note: 'Thumb',
    },
    thumbeb: {
      ...LLVM_ARCHITECTURE_CONTENT.thumbeb,
      host: 'thumbeb',
      note: 'Thumb (big endian)',
    },
    wasm32: {
      ...LLVM_ARCHITECTURE_CONTENT.wasm_32,
      host: 'wasm32',
      note: 'WebAssembly 32-bit',
    },
    wasm64: {
      ...LLVM_ARCHITECTURE_CONTENT.wasm_64,
      host: 'wasm64',
      note: 'WebAssembly 64-bit',
    },
    x86: {
      ...LLVM_ARCHITECTURE_CONTENT.x_86,
      host: 'x86',
      note: '32-bit X86: Pentium-Pro and above',
    },
    x86_64: {
      ...LLVM_ARCHITECTURE_CONTENT.x_86_64,
      host: 'x86-64',
      note: '64-bit X86: EM64T and AMD64',
    },
    xcore: {
      ...LLVM_ARCHITECTURE_CONTENT.xcore,
      host: 'xcore',
      note: 'XCore',
    },
  },
}

export const backend_compilation_output: List = {
  form: 'list',
  list: ['assembly', 'llvm-ir', 'llvm-bitcode', 'binary'],
}

export const backend_compilation_output_data: Form = {
  form: 'form',
  link: {
    extension: { like: 'string', need: false },
  },
}

export const backend_compilation_output_content: Hash = {
  form: 'hash',
  file: 'llvm',
  link: 'backend_compilation_output',
  bond: { like: 'backend_compilation_output_data' },
  hash: {
    assembly: { extension: 'asm' },
    'llvm-ir': { extension: 'll' },
    'llvm-bitcode': { extension: 'bc' },
    binary: {},
  },
}
