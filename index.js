const puppeteer = require('puppeteer');

(async () => {

    const extractPartners = async (url) => {
        const page = await browser.newPage();
        await page.goto(url);
        // await page.screenshot({path: 'example.png'});
        
        // way to scrape multiple items and create an object
        const partnersOnPage = await page.evaluate(() => 
            Array.from(document.querySelectorAll('div.compact'))
                .map(compacts => ({
                    title: compacts.querySelector('h3.title').innerText.trim(),
                    logo: compacts.querySelector('.logo img').src
                }))
        );
        
        await page.close();

        // Should we end recursion?
        if (partnersOnPage.length < 1) {
            console.log(`terminate recursion on: ${url}`);
            return partnersOnPage;
        } else {
            // Go fetch the next page
            // What is the next URL?
            const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
            const nextUrl = `https://marketingplatform.google.com/about/partners/find-a-partner?page=${nextPageNumber}`;
            
            return partnersOnPage.concat(await extractPartners(nextUrl));
        }
    }
    
    const browser = await puppeteer.launch();

        // h3 scrape
    // const titles = await page.evaluate(() => 
    //     Array.from(document.querySelectorAll('div.compact h3.title'))
    //         .map(partner => partner.innerText.trim())
    // );
    // console.log(titles);
    
        // image scrape
    // const logos = await page.evaluate(() => 
    //     Array.from(document.querySelectorAll('div.compact .logo img'))
    //         .map(logo => logo.src)
    // );
    // console.log(logos);

    const firstUrl = 'https://marketingplatform.google.com/about/partners/find-a-partner?page=1';
    const partners = await extractPartners(firstUrl);
    // console.log(partners);

    await browser.close();
})();