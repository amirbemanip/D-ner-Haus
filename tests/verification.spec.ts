import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('Capture Screenshots', async ({ page }) => {
  // 1. Hero Section
  await page.goto(BASE_URL);
  await page.waitForSelector('#loader', { state: 'hidden', timeout: 10000 });
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({ path: 'verification/hero_section.png' });

  // 2. Club Section
  await page.getByText(/BLACK MEMBER/i).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/club_section.png' });

  // 3. Menu Section
  await page.getByText(/Masterpiece/i).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/menu_section.png' });

  // 4. Seller Interface (Redirect to Login)
  await page.goto(`${BASE_URL}/seller`);
  await page.waitForSelector('#loader', { state: 'hidden', timeout: 10000 });
  await page.waitForTimeout(1000);
  // Check for System Access heading on Login page
  await expect(page.getByText(/System Access/i)).toBeVisible();
  await page.screenshot({ path: 'verification/seller_login.png' });
});
