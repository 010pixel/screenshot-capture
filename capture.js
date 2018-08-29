// capture.js

const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const port = process.env.PORT || 8080;

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
  
//include http, fs and url module
var http = require('http'),
    fs = require('fs'),
    imageDir = './';

http.createServer(function (req, res) {
    //use the url to parse the requested url and get the image name
    fs.readFile(imageDir + 'iPhone 6.png', function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such image");    
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
    });
    captureScreenshots() 
}).listen(port);
console.log("Server running at http://localhost:3333/");