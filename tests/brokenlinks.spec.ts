import { test, expect } from '@playwright/test';

test('Check for broken links', async ({ page, request }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  const links = await page.$$eval('a', as =>
    as.map(a => (a as HTMLAnchorElement).href)
  );

  console.log(`Total Number of Identified Hyperlinks: ${links.length}`);

  let brokenLinksCount = 0;
  let invalidLinksCount = 0;
  let linkIndex = 1;
  const startTime = Date.now();

  // Helper to check if a link is valid
  function isValidLink(url: string | null): boolean {
    if (!url) return false;
    if (url.startsWith('javascript:') || url.startsWith('#')) return false;
    return true;
  }

  // Check all links in parallel
  await Promise.all(
    links.map(async (url, idx) => {
      if (!isValidLink(url)) {
        console.log(`${idx + 1}. Invalid Link: ${url}`);
        invalidLinksCount++;
        return;
      }
      try {
        const response = await request.fetch(url, { method: 'HEAD' });
        if (response.status() >= 400) {
          console.log(`${idx + 1}. Broken Link: ${url} - Response Code: ${response.status()}`);
          brokenLinksCount++;
        } else {
          console.log(`${idx + 1}. Working Link: ${url} - Response Code: ${response.status()}`);
        }
      } catch (e) {
        console.log(`${idx + 1}. Error checking link: ${url} - ${(e as Error).message}`);
        brokenLinksCount++;
      }
    })
  );

  const endTime = Date.now();
  const duration = Math.round((endTime - startTime) / 1000);

  console.log('#################################');
  console.log(`Total Links: ${links.length}`);
  console.log(`Valid Links: ${links.length - brokenLinksCount - invalidLinksCount}`);
  console.log(`Invalid Links: ${invalidLinksCount}`);
  console.log(`Broken Links: ${brokenLinksCount}`);
  console.log(`Total time taken to check all links: ${duration} seconds`);
  console.log('#################################');
});