import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Dönerhaus Nürnberg Premium Features', () => {
  test('Landing page shows Awards section', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check for the awards section title
    const awardsTitle = page.getByText('Einer der Besten in Nürnberg');
    await expect(awardsTitle).toBeVisible();

    // Check for the link to the article
    const articleLink = page.getByRole('link', { name: 'Artikel lesen' });
    await expect(articleLink).toHaveAttribute('href', 'https://deinnaemberch.de/die-6-besten-doener-in-nuernberg/');
  });

  test('Club registration success shows VIP card and action buttons', async ({ page }) => {
    // Mock the registration API
    await page.route('**/api/register', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ membershipCode: '123456' }),
      });
    });

    await page.goto(`${BASE_URL}/club/register`);

    // Fill the form
    await page.getByPlaceholder('z.B. Max Mustermann').fill('Test User');
    await page.getByPlaceholder('+49 123 4567890').fill('+4917612345678');
    await page.getByRole('button', { name: 'Jetzt registrieren' }).click();

    // Verify success state
    await expect(page.getByText('Privileg aktiviert.')).toBeVisible();

    // Check for VIP Card elements - use exact to avoid ambiguity with footer
    await expect(page.getByText('Dönerhaus Nürnberg', { exact: true })).toBeVisible();
    await expect(page.getByText('123456')).toBeVisible();
    await expect(page.getByText('Test User')).toBeVisible();

    // Check for Action Buttons
    await expect(page.getByText('Als Bild speichern')).toBeVisible();
    await expect(page.getByText('Karte Drucken')).toBeVisible();
    await expect(page.getByText('Code kopieren')).toBeVisible();
  });
});
