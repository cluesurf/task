import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: false,
    include: ['test/**/*.test.ts'],
    server: {
      deps: {
        inline: ['@cluesurf/form'],
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '.'),
    },
  },
})
