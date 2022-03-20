const { chromium } = require('playwright');
const fs = require('fs');
const color = require('colourize');

(async () => {
  const browser = await chromium.launch({ headless: true }); // Or 'firefox' or 'webkit'.
  const page = await browser.newPage();
  await page.route('**/*', (route) => {
    return route.request().resourceType() === 'image'
      ? route.abort()
      : route.continue();
  });

  const data = fs
    .readFileSync('./claims.csv')
    .toString()
    .split(/\r?\n/);

  for (let i = 1; i < data.length; i++) {
    const line = data[i];
    let [id, alpha, beta, gamma] = line.split(',').map((x) => x.trim());

    id = parseInt(id);
    beta = parseInt(beta);

    if (beta == 1) continue;

    await page.goto(
      `https://opensea.io/assets/0x60e4d786628fea6478f785a6d7e704777c86a7c6/${id}`,
      { waitUntil: 'domcontentloaded' }
    );

    const buyNow = await page.isVisible('text="Buy now"');

    if (buyNow) {
      const price = await (await page.$('.TradeStation--price')).innerText();

      console.log(id, color.green("Available for buy now! Price: ") + price + "ETH");
    } else {
      console.log(id, color.red("not for sale"));
    }
  }
 
})();
