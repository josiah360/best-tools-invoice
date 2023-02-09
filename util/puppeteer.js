import { launch } from 'chrome-aws-lambda';
import puppeteer from "puppeteer";

const htmlToPdf = async (html) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return pdf;
};



export default htmlToPdf


