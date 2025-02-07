#!/usr/bin/env node
import express from 'express'
import { Queue, Worker } from 'bullmq'
import checkStock from './checkers/stockChecker.js'

// Create express app
const app = express()

// Heartbeat can be called by other services to check if this service is up
app.get('/heartbeat', (req, res) => {
  res.send('BuhBump')
})

// Set up the redis connection for the workers
const redis = {
  host: 'localhost', // TODO from the env
  port: 6379, // TODO from the env
}

// Set up the queue
const queue = new Queue('stock', { connection: redis })
// Set up the worker
const stockCheckWorker = new Worker('stock', async (job) => {
  await checkStock(job.data.url)
}, { connection: redis })

// Log when the worker completes or fails
stockCheckWorker.on('completed', (job) => {
  console.log(`${job.id} has completed!`)
  console.log(job.returnvalue ? 'Item is IN STOCK!!!' : 'Item is out of stock')
})
stockCheckWorker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`)
})

await queue.upsertJobScheduler('stock', {
  every: 60000, // 1 minute
},
{
  name: 'stockCheck',
  data: {
    url: 'https://www.bestbuy.com/site/wizards-of-the-coast-magic-the-gathering-foundations-bundle-9-play-boosters-40-land-cards-exclusive-accessories/6593872.p?skuId=6593872',
  },
})

// Start the server at the very end after everything is set up
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
