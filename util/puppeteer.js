import Chromium from "chrome-aws-lambda";

const htmlToPdf = async (html) => {
  const browser = await Chromium.puppeteer.launch(
    {
      args: Chromium.args,
      executablePath: await Chromium.executablePath,
      headless: Chromium.headless,
      ignoreHTTPSErrors: true,
    }

  );
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return pdf;
};



export default htmlToPdf


