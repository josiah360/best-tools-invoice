import { launch } from 'chrome-aws-lambda';
import puppeteer from "puppeteer";

const htmlToPdf = async (html) => {
  const browser = await launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return pdf;
};

const convertToPdf = async (html) => {
  const pdf = await htmlToPdf(html);
  return pdf;
};

export default convertToPdf



