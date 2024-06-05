import { test, expect } from '@playwright/test';

test.describe('Document Management Flow', () => {
  test('creates, edits, and archives a document', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'testpass');
    await page.click('text=Login');

    await page.click('text=New Document');
    await page.fill('textarea[name="content"]', 'Initial content');
    await page.click('text=Save');

    const content = await page.$eval('textarea[name="content"]', el => (el as HTMLTextAreaElement).value);
expect(content).toBe('Initial content');
    await page.fill('textarea[name="content"]', 'Updated content');
    await page.click('text=Save');

    await page.click('text=Archive');
    await expect(page.locator('text=Document archived successfully')).toHaveText('Document archived successfully');
  });
});