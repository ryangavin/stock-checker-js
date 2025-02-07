# stock-checker-js
Extremely simple stock checker example using Node.js and Playwright.

Includes a simple server which will check the stock of a product on a website every 60 seconds.

## Installation and Usage
You can install the CLI tool globally using npm:

```shell
git clone https://github.com/ryangavin/stock-checker-js.git && cd stock-checker-js
npm install -g
stock-checker https://www.example.com/product
```

## Server Setup
The server uses BullMQ to manage the asynchronous job queue. 
You will need to have Redis installed and running on your machine.

You can run `docker compose up -d` to start a Redis instance using Docker which is namespaced to this project.

To start the server, run `npm exec server`.

The server is just a simple example meant to get you started.

## License
This project is licensed under the MIT License. See LICENSE.txt for details.