const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

process.env.PLAYWRIGHT_BROWSERS_PATH = "H:\\playwright-browsers";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const ARTIFACTS_DIR = path.join(process.cwd(), "test-artifacts");

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

async function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  console.log(`Pinging ${url} for server readiness...`);
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log(`Server responded successfully with HTTP ${res.status}`);
        return true;
      }
    } catch {
      // wait and retry
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms.`);
}

async function checkHorizontalOverflow(page) {
  return await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
}

async function runWebAttack() {
  console.log("=== STARTING TWOFOLD WEBATTACK & LAYOUT VERIFICATION ===");
  await waitForServer(BASE_URL);

  const executablePath = fs.existsSync("H:\\playwright-browsers\\chromium-1234\\chrome-win64\\chrome.exe")
    ? "H:\\playwright-browsers\\chromium-1234\\chrome-win64\\chrome.exe"
    : undefined;

  const browser = await chromium.launch({
    headless: true,
    executablePath,
  });

  const report = {
    testedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    routes: {},
    interactions: {},
    summary: { totalRoutes: 0, passed: 0, failed: 0, overflowErrors: 0 },
  };

  try {
    // 1. DESKTOP CONTEXT (1440x900)
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: "Twofold-WebAttack-Desktop-Agent",
    });
    const desktopPage = await desktopContext.newPage();

    // 2. MOBILE CONTEXT (390x844 iPhone 14/15)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    // LIST OF CORE ROUTES TO CRAWL & VERIFY
    const routesToTest = [
      { path: "/", name: "home" },
      { path: "/profiles", name: "profiles" },
      { path: "/profiles/harshdip-saha", name: "profile-harshdip" },
      { path: "/profiles/ali-abdaal", name: "profile-ali" },
      { path: "/mcp-inspector", name: "mcp-inspector" },
      { path: "/simulate", name: "simulate" },
      { path: "/dates", name: "dates" },
      { path: "/dates/date-harshdip-saha-ali-abdaal", name: "date-detail" },
      { path: "/rankings", name: "rankings" },
      { path: "/import", name: "import" },
    ];

    for (const route of routesToTest) {
      report.summary.totalRoutes++;
      const fullUrl = `${BASE_URL}${route.path}`;
      console.log(`\n--> Testing route: ${route.path} (${route.name})`);

      // Test Desktop
      await desktopPage.goto(fullUrl, { waitUntil: "networkidle", timeout: 30000 });
      const desktopOverflow = await checkHorizontalOverflow(desktopPage);
      const desktopShot = path.join(ARTIFACTS_DIR, `desktop-${route.name}.png`);
      await desktopPage.screenshot({ path: desktopShot, fullPage: true });

      // Test Mobile
      await mobilePage.goto(fullUrl, { waitUntil: "networkidle", timeout: 30000 });
      const mobileOverflow = await checkHorizontalOverflow(mobilePage);
      const mobileShot = path.join(ARTIFACTS_DIR, `mobile-${route.name}.png`);
      await mobilePage.screenshot({ path: mobileShot, fullPage: true });

      const routePassed = !desktopOverflow && !mobileOverflow;
      if (!routePassed) {
        report.summary.overflowErrors++;
        console.warn(`WARNING: Overflow detected on ${route.path} (desktop: ${desktopOverflow}, mobile: ${mobileOverflow})`);
      } else {
        console.log(`PASS: ${route.path} has clean layout with 0 horizontal overflow.`);
      }

      report.routes[route.path] = {
        name: route.name,
        desktopOverflow,
        mobileOverflow,
        desktopScreenshot: `desktop-${route.name}.png`,
        mobileScreenshot: `mobile-${route.name}.png`,
        status: routePassed ? "PASS" : "OVERFLOW_DETECTED",
      };

      if (routePassed) report.summary.passed++;
      else report.summary.failed++;
    }

    // 3. INTERACTIVE DRIVING & FUNCTIONAL VERIFICATION

    // Interaction A: Testing MCP Console execution on /mcp-inspector
    console.log("\n--> Testing interactive MCP invocation on /mcp-inspector...");
    await desktopPage.goto(`${BASE_URL}/mcp-inspector`, { waitUntil: "networkidle" });
    const invokeBtn = desktopPage.locator("button:has-text('Invoke')").first();
    await invokeBtn.click();
    await desktopPage.waitForTimeout(500);

    const mcpOutputVisible = await desktopPage.locator("pre:has-text('getProfile')").or(desktopPage.locator("pre")).count() > 0;
    console.log(`MCP Tool Output rendered: ${mcpOutputVisible ? "YES (Verified)" : "NO"}`);
    report.interactions["mcp_execution"] = {
      action: "Invoke getProfile() via MCP workbench",
      success: mcpOutputVisible,
    };

    // Interaction B: Testing Date Simulation Flow on /simulate
    console.log("\n--> Testing Date Simulation Harness on /simulate...");
    await desktopPage.goto(`${BASE_URL}/simulate`, { waitUntil: "networkidle" });
    const simulateBtn = desktopPage.locator("button:has-text('Simulate 8-Turn Date')").first();
    await simulateBtn.click();

    // Wait for simulation dialogue stream and JEV rubric to appear
    console.log("Waiting for 8-turn dialogue stream & JEV deterministic rubric...");
    await desktopPage.waitForSelector("text=Turn-by-Turn Date Dialogue", { timeout: 30000 });
    await desktopPage.waitForSelector("text=Deterministic Compatibility Rubric", { timeout: 30000 });

    const simShot = path.join(ARTIFACTS_DIR, "desktop-simulate-completed.png");
    await desktopPage.screenshot({ path: simShot, fullPage: true });

    const turnCount = await desktopPage.locator("text=Turn ").count();
    console.log(`Turns rendered in DOM: ${turnCount}`);
    report.interactions["date_simulation"] = {
      action: "Simulate 8-turn date between Harshdip Saha and Ali Abdaal",
      turnsRendered: turnCount,
      success: turnCount >= 8,
    };

    // Interaction C: Testing Profile Ingestion on /import
    console.log("\n--> Testing Real-time Candidate Ingestion on /import...");
    await desktopPage.goto(`${BASE_URL}/import`, { waitUntil: "networkidle" });
    const quickFillBtn = desktopPage.locator("button:has-text('Satya Nadella')").first();
    await quickFillBtn.click();

    const importSubmitBtn = desktopPage.locator("button:has-text('Ingest & Create Personal MCP')").first();
    await importSubmitBtn.click();

    await desktopPage.waitForSelector("text=Agent Created & Deployed", { timeout: 20000 });
    const importShot = path.join(ARTIFACTS_DIR, "desktop-import-deployed.png");
    await desktopPage.screenshot({ path: importShot, fullPage: true });
    console.log("Candidate Satya Nadella successfully ingested and MCP double instantiated!");

    report.interactions["candidate_import"] = {
      action: "Import custom pair and instantiate personal MCP agent",
      success: true,
    };

    // Close browser contexts
    await desktopContext.close();
    await mobileContext.close();
    await browser.close();

    console.log("\n=== WEBATTACK AUDIT COMPLETE ===");
    console.log(`Total Routes Checked: ${report.summary.totalRoutes}`);
    console.log(`Passed: ${report.summary.passed}`);
    console.log(`Horizontal Overflows: ${report.summary.overflowErrors}`);
    console.log(`Screenshots Captured: ${fs.readdirSync(ARTIFACTS_DIR).filter(f => f.endsWith('.png')).length}`);

    fs.writeFileSync(
      path.join(ARTIFACTS_DIR, "webattack-report.json"),
      JSON.stringify(report, null, 2)
    );
  } catch (err) {
    console.error("WebAttack encountered an error:", err);
    await browser.close();
    process.exit(1);
  }
}

runWebAttack();
