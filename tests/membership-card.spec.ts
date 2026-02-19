import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Dönerhaus Nürnberg Premium Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Wait for preloader to finish
    await page.waitForSelector('#loader', { state: 'hidden', timeout: 10000 });
  });

  test('Landing page shows Hero section', async ({ page }) => {
    // Check for the Hero text - use regex to be case insensitive and handle potential wrapping
    await expect(page.getByText(/Kebab/i)).toBeVisible();
    await expect(page.getByText(/Defined/i)).toBeVisible();
  });

  test('Club registration success shows VIP card and action buttons', async ({ page }) => {
    // Mock the registration API
    await page.route('**/api/register', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ membershipCode: '123456', name: 'Test User' }),
      });
    });

    await page.goto(`${BASE_URL}/club/register`);
    await page.waitForSelector('#loader', { state: 'hidden', timeout: 10000 });

    // Fill the form
    await page.locator('input[placeholder*="Mustermann"]').fill('Test User');
    await page.locator('input[placeholder*="49"]').fill('+4917612345678');
    await page.getByRole('button', { name: /REGISTER NOW/i }).click();

    // Verify success state (it's in the Card display now)
    await expect(page.getByText(/Willkommen/i)).toBeVisible();

    // Check for VIP Card elements
    await expect(page.getByText(/123456/)).toBeVisible();
    await expect(page.getByText(/Test User/i)).toBeVisible();

    // Check for Action Buttons
    await expect(page.getByText('Save as Image')).toBeVisible();
    await expect(page.getByText(/Print/i)).toBeVisible();
    await expect(page.getByText('Copy Code')).toBeVisible();
  });
});
