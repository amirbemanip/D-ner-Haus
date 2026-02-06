import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 375, height: 812 }, // iPhone X
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
});

test('verify mobile responsiveness and connect page', async ({ page }) => {
  // 1. Home Page
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'v2_home_mobile.png' });

  // 2. Club Registration Page
  await page.goto('http://localhost:3000/club/register');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'v2_register_mobile.png' });

  // 3. Connect Page (Linktree style)
  await page.goto('http://localhost:3000/connect');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'v2_connect_mobile.png' });

  // Verify Navbar/Footer are hidden on Connect
  const navbar = page.locator('nav');
  const footer = page.locator('footer');
  await expect(navbar).not.toBeVisible();
  await expect(footer).not.toBeVisible();

  // 4. Success state of Registration (mocking registration success)
  // Fill form
  await page.goto('http://localhost:3000/club/register');
  await page.fill('input[placeholder*="Name"]', 'Test User');
  await page.fill('input[placeholder*="Phone"]', '0123456789');
  await page.click('button:has-text("Join the Club")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'v2_success_mobile.png' });
});
