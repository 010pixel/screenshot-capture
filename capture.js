// capture.js

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')

const captureScreenshots = async () => {
  const devicesToEmulate = [
    'iPhone 6',
    'iPhone 6 landscape',
    'iPhone 6 Plus',
    'Nexus 5',
    'Nexus 6',
    'iPad Pro'
  ]

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const page = await browser.newPage()

  // capture a screenshot of each device we wish to emulate (`devicesToEmulate`)
  for (let device of devicesToEmulate) {
    await page.emulate(devices[device])
    await page.goto('https://www.google.com/')
    let img = await page.screenshot({path: `${device}.png`, fullPage: false})
    console.log(`${device} done`);
    break;
  }

  await browser.close()
}

captureScreenshots()