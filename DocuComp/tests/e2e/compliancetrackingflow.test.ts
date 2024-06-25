import { test, expect } from '@playwright/test';

test.describe('Compliance Tracking Flow', () => {
  test('ensures document meets compliance requirements', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'complianceUser');
    await page.fill('input[name="password"]', 'compliancePass');
    await page.click('text=Login');

    await page.click('text=New Document');
    await page.fill('textarea[name="content"]', 'Content to be checked for compliance.');
    await page.click('text=Save');

    // Check compliance
    await page.click('text=Check Compliance');
    await expect(page.locator('text=Compliance Check Passed')).toBeVisible();

    // Archive the document
    await page.click('text=Archive');
    await expect(page.locator('text=Document archived successfully')).toBeVisible();
  });
});