import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should log in with GitHub', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.click('text=Sign in with GitHub');

    // Handle GitHub OAuth flow
    await page.waitForSelector('input[name="login"]');
    await page.fill('input[name="login"]', 'your-github-username');
    await page.fill('input[name="password"]', 'your-github-password');
    await page.click('input[name="commit"]');

    // Authorize the app if prompted
    if (await page.isVisible('button[name="authorize"]')) {
      await page.click('button[name="authorize"]');
    }

    await page.waitForURL('http://localhost:3000/welcome');
    await expect(page).toHaveURL('http://localhost:3000/welcome');
  });

  test('should log in with Google', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.click('text=Sign in with Google');

    // Handle Google OAuth flow
    await page.waitForSelector('input[type="email"]');
    await page.fill('input[type="email"]', 'your-google-email@example.com');
    await page.click('button:has-text("Next")');
    await page.waitForSelector('input[type="password"]');
    await page.fill('input[type="password"]', 'your-google-password');
    await page.click('button:has-text("Next")');

    // Authorize the app if prompted
    if (await page.isVisible('button:has-text("Allow")')) {
      await page.click('button:has-text("Allow")');
    }

    await page.waitForURL('http://localhost:3000/welcome');
    await expect(page).toHaveURL('http://localhost:3000/welcome');
  });
});