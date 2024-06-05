import { test, expect } from '@playwright/test';

test.describe('Compliance Mapping', () => {
  test('maps documents to compliance requirements', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'mapperUser');
    await page.fill('input[name="password"]', 'mapperPass');
    await page.click('text=Login');

    await page.click('text=New Document');
    await page.fill('textarea[name="content"]', 'Content needing specific compliance mapping.');
    await page.click('text=Save');

    // Simulate mapping to a compliance requirement
    await page.click('text=Map to Compliance');
    await page.selectOption('select[name="complianceRequirement"]', { label: 'Requirement XYZ' });
    await page.click('text=Submit Mapping');

    await expect(page.locator('text=Mapping Successful')).toHaveText('Mapping Successful');
  });
});