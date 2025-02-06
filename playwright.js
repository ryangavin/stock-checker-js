const playwright = require("playwright");

(async () => {
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
  });
  const page = await context.newPage();
  //await page.goto("https://www.target.com/p/pokemon-scarlet-violet-s3-5-booster-bundle-box/-/A-88897904");
  await page.goto("https://www.target.com/p/pok-233-mon-trading-card-game-zapdos-ex-deluxe-battle-deck/-/A-91351689#lnk=sametab");

  // Wait for the add to cart button to appear
  const shippingSection = await page.waitForSelector("[data-test=\"@web/AddToCart/Fulfillment/ShippingSection\"]");
  const text = await shippingSection.innerHTML();
  if(text.includes("Arrives by")) {
    console.log("Item is IN STOCK");
  } else {
    console.log("Item is out of stock");
  }

  await browser.close();
})();