const TargetChecker = async (page) => {
  // Wait for the add to cart button to appear
  const shippingSection = await page.waitForSelector('[data-test="@web/AddToCart/Fulfillment/ShippingSection"]')
  const text = await shippingSection.innerHTML()
  if (text.includes('Arrives by')) {
    console.log('Item is IN STOCK')
  }
  else {
    console.log('Item is out of stock')
  }
}

export default TargetChecker
