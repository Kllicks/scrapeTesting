const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://marketingplatform.google.com/about/partners/find-a-partner?utm_source=marketingplatform.google.com&utm_medium=et&utm_campaign=marketingplatform.google.com%2Fabout%2Fpartners%2F';
    await page.goto(url);
    // await page.screenshot({path: 'example.png'});

    const h2 = await page.evaluate(() => document.querySelector('h2').textContent);
    // const innerText = await page.evaluate(() => document.querySelector('p').innerText);
    
    console.log(h2);
    // console.log(innerText);

    await browser.close();
})();