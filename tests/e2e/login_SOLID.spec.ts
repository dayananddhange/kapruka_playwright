import { test } from '@playwright/test';
import { LoginPage_SOLID } from '../../pages/LoginPage_SOLID';
import { config } from '../../config/environment';

test('Kapruka login page displays the sign-in form', async ({ page }) => {
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;

    if (!email || !password) {
        throw new Error('Set TEST_EMAIL and TEST_PASSWORD in .env before running this test.');
    }

    const loginPage = new LoginPage_SOLID(page);
    await loginPage.navigate(config.loginPath);
    await loginPage.isLoaded();
    await loginPage.login(email, password);
})