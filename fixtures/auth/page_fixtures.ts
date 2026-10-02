import { test as base, expect } from '@playwright/test';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { config } from '../../config/environment';

type AuthFixtures = {
	authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
	authenticatedPage: async ({ browser }, use) => {
		const storageStatePath = process.env.AUTH_STORAGE_STATE;
		if (!storageStatePath) {
			throw new Error('Set AUTH_STORAGE_STATE to the path of a Playwright storageState file.');
		}

		const context = await browser.newContext({
			baseURL: config.baseUrl,
			storageState: resolve(storageStatePath),
		});
		try {
			await use(await context.newPage());
		} finally {
			await context.close();
		}
	},
});

export { expect };
