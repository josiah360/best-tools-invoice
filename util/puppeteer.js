import puppeteer from "puppeteer";

const htmlToPdf = async (html) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle2' });
    const pdf = await page.pdf({ format: 'A4',
    printBackground: true, });
    await browser.close();
    return pdf;
  };

export default htmlToPdf