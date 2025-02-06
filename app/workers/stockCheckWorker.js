import { Worker } from 'bullmq'
import { chromium } from 'playwright'

import checkStock from '../checkers/stockChecker.js'

const StockCheckWorker = new Worker('stockCheck',
  async (job) => {
    await checkStock(job.data.url)
  })

export default StockCheckWorker
