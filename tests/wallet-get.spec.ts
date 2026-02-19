import { test, expect } from '@playwright/test';

test('verify apple wallet get download', async ({ page }) => {
  await page.goto('http://localhost:3000/club/register');

  // Wait for loader to disappear
  const loader = page.locator('#loader');
  await expect(loader).toBeHidden({ timeout: 60000 });

  // Fill the form
  await page.fill('input[type="text"]', 'GET Test User');
  await page.fill('input[type="tel"]', '1112223334');
  await page.click('button:has-text("Register Now")');

  // Wait for success
  await expect(page.locator('text=/Privilege Activated/i')).toBeVisible({ timeout: 60000 });

  // Set up listener for download
  const downloadPromise = page.waitForEvent('download');

  // Click Apple Wallet button
  await page.click('button:has-text("Apple Wallet")');

  const download = await downloadPromise;

  // Verify download filename
  expect(download.suggestedFilename()).toMatch(/\.pkpass$/);

  console.log('Download suggested filename:', download.suggestedFilename());
});
