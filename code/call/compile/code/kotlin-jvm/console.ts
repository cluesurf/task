import { buildCompileConsole } from '~/code/tool/node/compile/console'
import { buildKotlinJvmCommand } from '~/code/tool/shared/compile/command'

export const compileKotlinJvmConsole = buildCompileConsole({
  language: 'kotlin-jvm',
  describe: 'Compile Kotlin to a self-contained .jar (kotlinc -include-runtime)',
  builder: buildKotlinJvmCommand,
  examples: [
    { comment: 'jar',     command: 'task compile kotlin-jvm Main.kt -o app.jar' },
    { comment: 'run jar', command: 'java -jar app.jar' },
  ],
})
