const puppeteer = require('puppeteer')

setImmediate(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                // Required for Docker version of Puppeteer
                '--no-sandbox',
                '--disable-setuid-sandbox',
                // This will write shared memory files into /tmp instead of /dev/shm,
                // because Docker’s default for /dev/shm is 64MB
                '--disable-dev-shm-usage'
            ]
        })
        const page = await browser.newPage()
        await page.goto('https://google.com')
        page.on('console', msg => console.log('PAGE LOG:', msg.text()))

        await page.evaluate(() => console.log(`url is ${location.href}`))

        await browser.close()
    } catch (e) {
        console.log(e)
    }
})
