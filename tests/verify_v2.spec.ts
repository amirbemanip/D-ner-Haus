import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('verify mobile responsiveness and connect page', async ({ page }) => {
  // Mock the registration API
  await page.route('**/api/register', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ membershipCode: '123456', name: 'Mobile User' }),
    });
  });

  // Check Connect Page
  await page.goto(`${BASE_URL}/connect`);
  await page.waitForSelector('#loader', { state: 'hidden', timeout: 10000 });
  // Navbar is hidden on /connect, so we check for page content
  await expect(page.getByText(/Follow us on IG/i)).toBeVisible();

  // Check Registration Page on Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE_URL}/club/register`);
  await page.waitForSelector('#loader', { state: 'hidden', timeout: 10000 });

  await expect(page.getByText(/Join/i)).toBeVisible();
  await expect(page.getByText(/Elite/i)).toBeVisible();

  // Fill form
  await page.locator('input[placeholder*="Mustermann"]').fill('Mobile User');
  await page.locator('input[placeholder*="49"]').fill('0123456789');
  await page.getByRole('button', { name: /REGISTER/i }).click();

  // Should see success
  await expect(page.getByText(/Activated/i)).toBeVisible();
});
