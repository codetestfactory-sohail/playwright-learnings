import { test, expect } from '@playwright/test';
test.describe('Home', () => {
    test("Open Home Page and Verify Title", async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/');

        // Verify the title
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    });

    test('Open About page and verify title', async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/about/');

        // Verify the title
        await expect(page).toHaveTitle('About – Practice E-Commerce Site');
    });

    test('Click on Get Started button using CSS Selector', async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/');
        
        // Click on the Get Started button using CSS Selector
        await page.locator('#get-started').click();

        // Verify the get started url
        await expect(page).toHaveURL(/.*#get-started/);
    });

    test('Verify heading text is visibe using Text selector', async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/');
        
        // Click on the Get Started button using CSS Selector
        const headingText = page.locator('text=Think different. Make different.');

        // Verify the get started url
        await expect(headingText).toBeVisible();    
    });

    test('Verify Home link using Text and CSS selector', async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/');
        
        // Find the home link
        const homeText = page.locator('#zak-primary-menu >> text=Home');

        // Verify the home text is visible
        await expect(homeText).toBeEnabled();
    });

    test('Verify Home link using combine Text and CSS selector', async ({ page }) => {
        // Open the url
        await page.goto('https://practice.sdetunicorns.com/');
        
        // Find the home link
        const homeText = page.locator('#zak-primary-menu:has-text("Home")');

        // Verify the home text is visible
        await expect(homeText).toBeEnabled();
    });

});

