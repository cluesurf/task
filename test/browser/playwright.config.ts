import { defineConfig } from '@playwright/test'
import path from 'node:path'

const PORT = Number(process.env.PORT ?? 4010)
const PROJECT_ROOT = path.resolve(__dirname, '..', '..')

export default defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.ts$/,
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `pnpm tsx test/browser/server.ts`,
    cwd: PROJECT_ROOT,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: { PORT: String(PORT) },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
})
