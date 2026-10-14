const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('C:/Users/HARSHDIP/.codex/skills/playwright-skill/node_modules/playwright');
const candidates = require('./candidates.json').candidates.filter(c => !process.argv[2] || c.name === process.argv[2]);

(async () => {
  const output = path.join(__dirname, 'candidate-browser-checks');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const summaryPath = path.join(output, 'summary.json');
  const results = process.argv[2] && fs.existsSync(summaryPath)
    ? JSON.parse(fs.readFileSync(summaryPath, 'utf8')).filter(r => r.name !== process.argv[2]) : [];
  try {
    for (let offset = 0; offset < candidates.length; offset += 3) {
      const batch = await Promise.all(candidates.slice(offset, offset + 3).map(async candidate => {
        const page = await context.newPage();
        const handle = new URL(candidate.instagram).pathname.split('/').filter(Boolean)[0];
        try {
          const response = await page.goto(candidate.instagram, { waitUntil: 'domcontentloaded', timeout: 20000 });
          await page.getByRole('heading').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
          const text = await page.locator('body').innerText({ timeout: 8000 });
          const title = await page.title();
          const result = {
            name: candidate.name, requestedUrl: candidate.instagram, finalUrl: page.url(), status: response?.status(), title,
            capturedAt: new Date().toISOString(), privateMessageVisible: /this account is private/i.test(text),
            profileHeaderVisible: title.toLowerCase().includes('@' + handle.toLowerCase()),
            publicStatus: 'UNVERIFIED_REQUIRES_STRUCTURED_PROFILE_RESULT',
            identityStatus: 'MANUAL_PAIR_REVIEW_REQUIRED',
            // A readable bio or HTTP 200 alone does not prove that posts are public.
            headerObservation: 'Profile header inspected; bio content was not retained as agent evidence.'
          };
          await page.screenshot({ path: path.join(output, `${handle}.png`), fullPage: false }).catch(() => {});
          fs.writeFileSync(path.join(output, `${handle}.json`), JSON.stringify(result, null, 2));
          return result;
        } catch (error) { return { name: candidate.name, requestedUrl: candidate.instagram, error: error.message }; }
        finally { await page.close(); }
      }));
      results.push(...batch);
      fs.writeFileSync(path.join(output, 'summary.json'), JSON.stringify(results, null, 2));
      for (const r of batch) console.log(JSON.stringify({name:r.name,status:r.status,title:r.title,profileHeaderVisible:r.profileHeaderVisible,error:r.error}));
    }
  } finally { await context.close(); await browser.close(); }
})();
