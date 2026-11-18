import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: 0,
  reporter: [['list']],
  use: {
    // За замовчуванням — задеплоєний сайт; локально: BASE_URL=http://localhost:5173 npm run test:e2e
    baseURL: process.env.BASE_URL || 'https://mentorhub-lac.vercel.app/',
    locale: 'uk-UA',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
