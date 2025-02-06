const playwright = require("playwright");

(async () => {
  // Set up the browser
  const browser = await playwright.chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
  });

  // Set up the geolocation because bestbuy won't let you see the details of the product without it
  await context.setGeolocation({ latitude: 37.7749, longitude: -122.4194 });
  await context.grantPermissions(["geolocation"], { origin: "https://www.bestbuy.com" });

  const page = await context.newPage();
  await page.goto("https://www.bestbuy.com/site/pokemon-trading-card-game-ogerpon-ex-premium-collection/6599408.p?skuId=6599408");
  //await page.goto("https://www.bestbuy.com/site/pokemon-trading-card-game-scarlet-violet-stellar-crown-3pk-booster-styles-may-vary/6588398.p?skuId=6588398");

  // Wait for the page to load
  await page.waitForTimeout(3000)

  // Find the section with the availability
  const quickAssessmentSection = page.locator("[data-testid=\"quick-assessment\"]");

  // Is the product available?
  // Get the SKU from the url
  const sku = page.url().match(/skuId=(\d+)/)[1]
  const button = await quickAssessmentSection.locator("button[data-sku-id=\"" + sku + "\"]");
  const availability = await (await button.innerHTML()).match("Add to Cart")
  availability ? console.log("Available") : console.log("Not Available")
  await browser.close()
})();