import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('Capture Screenshots', async ({ page }) => {
  // 1. Landing Page Awards Section
  await page.goto(BASE_URL);
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.getByText('Einer der Besten in Nürnberg').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'verification/awards_section.png' });

  // 2. VIP Member Card
  await page.route('**/api/register', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ membershipCode: 'VIP888' }),
    });
  });

  await page.goto(`${BASE_URL}/club/register`);
  await page.getByPlaceholder('z.B. Max Mustermann').fill('Jules Engineer');
  await page.getByPlaceholder('+49 123 4567890').fill('+491512345678');
  await page.getByRole('button', { name: 'Jetzt registrieren' }).click();

  await expect(page.getByText('VIP888')).toBeVisible();
  await page.screenshot({ path: 'verification/membership_card_success.png' });
});
