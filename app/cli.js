#!/usr/bin/env node
import stockChecker from './checkers/stockChecker.js'

// Get the url from the arguments
const url = process.argv[2]
console.log('Checking stock for', url)

// Run the stock checker
const inStock = await stockChecker(url)

// Log the result and exit with the appropriate code
console.log(inStock ? 'Item is IN STOCK!!!' : 'Item is out of stock')
inStock ? process.exit(0) : process.exit(1)
