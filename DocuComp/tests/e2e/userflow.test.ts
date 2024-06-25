import { test, expect } from '@playwright/test';

test.describe('User Management Flow', () => {
  test('should create, update, and delete a user', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'adminpass');
    await page.click('text=Login');

    // Create a new user
    await page.click('text=Create User');
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'newuserpass');
    await page.click('text=Submit');
    await expect(page.locator('text=User created successfully')).toBeVisible();

    // Update the user
    await page.click('text=Edit User');
    await page.fill('input[name="email"]', 'updateduser@example.com');
    await page.click('text=Submit');
    await expect(page.locator('text=User updated successfully')).toBeVisible();

    // Delete the user
    await page.click('text=Delete User');
    await expect(page.locator('text=User deleted successfully')).toBeVisible();
  });
});