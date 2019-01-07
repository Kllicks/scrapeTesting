const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://marketingplatform.google.com/about/partners/find-a-partner?utm_source=marketingplatform.google.com&utm_medium=et&utm_campaign=marketingplatform.google.com%2Fabout%2Fpartners%2F';
    await page.goto(url);
    // await page.screenshot({path: 'example.png'});

    // h3 scrape
    const titles = await page.evaluate(() => 
        Array.from(document.querySelectorAll('div.compact h3.title'))
            .map(partner => partner.innerText.trim())
    );
    
    // image scrape
    const logos = await page.evaluate(() => 
        Array.from(document.querySelectorAll('div.compact .logo img'))
            .map(logo => logo.src)
    );
    
    // way to scrape multiple items and create an object
    const partners = await page.evaluate(() => 
        Array.from(document.querySelectorAll('div.compact'))
            .map(compacts => ({
                title: compacts.querySelector('h3.title').textContent.trim(),
                logo: compacts.querySelector('.logo img').src
            }))
    );

    // console.log(titles);
    // console.log(logos);
    console.log(partners);

    await browser.close();
})();