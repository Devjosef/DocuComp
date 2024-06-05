import { test, expect } from '@playwright/test';

test.describe('Compliance Tracking', () => {
  test('ensures document meets compliance requirements', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'complianceUser');
    await page.fill('input[name="password"]', 'compliancePass');
    await page.click('text=Login');

    await page.click('text=New Document');
    await page.fill('textarea[name="content"]', 'This is a compliant document content according to regulation XYZ.');
    await page.click('text=Save');

    // Simulate compliance check
    await page.click('text=Check Compliance');
    await expect(page.locator('text=Compliance Status')).toHaveText('Compliant');

    // Archive the document
    await page.click('text=Archive');
    await expect(page.locator('text=Document archived successfully')).toHaveText('Document archived successfully');
  });
});
