import puppeteer from "puppeteer-core";
import Chromium from "chrome-aws-lambda";
const htmlToPdf = async (html) => {
  const browser = await puppeteer.launch(
    {
          args: Chromium.args,
          executablePath: await Chromium.executablePath,
          headless: Chromium.headless,
        }

  );
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return pdf;
};



export default htmlToPdf


