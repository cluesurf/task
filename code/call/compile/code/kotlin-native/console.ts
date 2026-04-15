import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildKotlinNativeCommand } from '~/code/tool/shared/compile/command'

export const compileKotlinNativeConsole = buildCompileConsole({
  language: 'kotlin-native',
  describe: 'Compile Kotlin to a native binary (kotlinc-native)',
  builder: buildKotlinNativeCommand,
  examples: [
    { comment: 'native binary', command: 'task compile kotlin-native Main.kt -o app' },
  ],
})
