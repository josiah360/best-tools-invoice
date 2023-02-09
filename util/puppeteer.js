import Chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer";

const htmlToPdf = async (html) => {
  const production = true
  let browser

  if(production) {
    browser = await Chromium.puppeteer.launch(
      {
        args: [...Chromium.args, "--hide-scrollbars", "--disable-web-security"],
        executablePath: await Chromium.executablePath,
        headless: Chromium.headless,
        ignoreHTTPSErrors: true,
        ignoreDefaultArgs: ['--disable-extensions'],
      }
    );
  } else {
    browser = await puppeteer.launch();
  }

  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return pdf;
};



export default htmlToPdf


