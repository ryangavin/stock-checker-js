import { chromium } from 'playwright'

import checkBestBuy from './bestBuyChecker.js'
import checkTarget from './targetChecker.js'

const stockChecker = async (url) => {
  const browser = await chromium.launch({
    headless: false,
  })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
  })

  // Set up the geolocation because BestBuy won't let you see the details of the product without it
  await context.setGeolocation({ latitude: 37.7749, longitude: -122.4194 })
  await context.grantPermissions(['geolocation'], { origin: 'https://www.bestbuy.com' })

  // The job data contains the URL of the product page
  const page = await context.newPage()
  await page.goto(url)

  // Run the website specific checker
  let stock = false
  if (url.includes('bestbuy')) {
    stock = await checkBestBuy(page)
  }
  else if (url.includes('target')) {
    stock = await checkTarget(page)
  }
  else {
    console.error('Unsupported website')
  }

  // Cleanup
  await browser.close()

  return stock
}

export default stockChecker
