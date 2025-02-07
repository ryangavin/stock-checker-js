const TargetChecker = async (page) => {
  // Wait for the add to cart button to appear
  const shippingSection = await page.waitForSelector('[data-test="@web/AddToCart/Fulfillment/ShippingSection"]')
  const text = await shippingSection.innerHTML()
  return !!text.includes('Arrives by')
}

export default TargetChecker
