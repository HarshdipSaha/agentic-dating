const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/HARSHDIP/.codex/skills/playwright-skill/node_modules/playwright');

const targets = [
  ['instagram-actor', 'https://apify.com/apify/instagram-profile-scraper/input-schema'],
  ['linkedin-actor', 'https://apify.com/harvestapi/linkedin-profile-scraper/input-schema'],
  ['warikoo-linkedin', 'https://www.linkedin.com/in/warikoo/'],
  ['warikoo-instagram', 'https://www.instagram.com/ankurwarikoo/'],
  ['ali-linkedin', 'https://www.linkedin.com/in/ali-abdaal/'],
  ['ali-instagram', 'https://www.instagram.com/aliabdaal/'],
  ['gary-links', 'https://garyvaynerchuk.com/'],
];

(async () => {
  const output = path.join(__dirname, 'browser-artifacts');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const results = [];
  try {
    for (const [id, url] of targets) {
      const page = await context.newPage();
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await page.locator('body').waitFor({ state: 'visible', timeout: 8000 });
        const text = await page.locator('body').innerText({ timeout: 8000 });
        const links = await page.locator('a[href]').evaluateAll(nodes => nodes.map(n => ({ text: n.innerText, href: n.href })).filter(n => /linkedin\.com|instagram\.com/.test(n.href)));
        const screenshot = path.join(output, `${id}.png`);
        await page.screenshot({ path: screenshot, fullPage: false });
        const result = {
          id, requestedUrl: url, finalUrl: page.url(), status: response?.status(), title: await page.title(),
          capturedAt: new Date().toISOString(), textLength: text.length, links, screenshot,
          observations: {
            signUpVisible: /sign up|join now/i.test(text),
            privateMessageVisible: /this account is private/i.test(text),
            inputFieldsVisible: ['profileScraperMode','urls','queries','publicIdentifiers','profileIds','usernames','includeAboutSection'].filter(field => text.includes(field))
          }
        };
        fs.writeFileSync(path.join(output, `${id}.json`), JSON.stringify(result, null, 2));
        results.push({ id, status: result.status, title: result.title, textLength: text.length, links: links.length });
      } catch (error) {
        results.push({ id, error: error.message });
      } finally { await page.close(); }
      fs.writeFileSync(path.join(output, 'summary.json'), JSON.stringify(results, null, 2));
      console.log(JSON.stringify(results.at(-1)));
    }
  } finally { await browser.close(); }
})();
