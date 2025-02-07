const BestBuyChecker = async (page) => {
  // Wait for the page to load
  await page.waitForTimeout(3000)

  // Find the section with the availability
  const quickAssessmentSection = page.locator('[data-testid="quick-assessment"]')

  // Is the product available?
  // Get the SKU from the url
  const sku = page.url().match(/skuId=(\d+)/)[1]
  const button = await quickAssessmentSection.locator('button[data-sku-id="' + sku + '"]')
  return await (await button.innerHTML()).match('Add to Cart')
}

export default BestBuyChecker
