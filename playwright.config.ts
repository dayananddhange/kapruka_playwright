import { defineConfig, devices } from '@playwright/test';
import { config } from './config/environment';

const isCI = Boolean(process.env.CI);
const workers = process.env.PLAYWRIGHT_WORKERS
  ? Number(process.env.PLAYWRIGHT_WORKERS)
  : isCI ? 1 : undefined;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  forbidOnly: isCI,
  retries: Number(process.env.PLAYWRIGHT_RETRIES ?? (isCI ? 2 : 0)),
  ...(workers === undefined ? {} : { workers }),
  timeout: Number(process.env.PLAYWRIGHT_TIMEOUT ?? (isCI ? 60_000 : 30_000)),
  reporter: [['html', { open: 'never' }],
  ['allure-playwright', { resultsDir: 'allure-results' }]],
  outputDir: './test-results',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: config.baseUrl,
    actionTimeout: Number(process.env.PLAYWRIGHT_ACTION_TIMEOUT ?? 10_000),
    navigationTimeout: Number(process.env.PLAYWRIGHT_NAVIGATION_TIMEOUT ?? 30_000),
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
