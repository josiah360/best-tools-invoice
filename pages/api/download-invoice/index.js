import convertToPdf from "@/util/puppeteer";
import html from "@/html/html";


async function addNewInvoice(req, res) {
    const invoiceItem  = req.body

    if(req.method === 'POST') {
        const htm = html(invoiceItem)
  
        const pdf = await convertToPdf(htm);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="hello.pdf"');
        res.statusCode = 200;
        return res.end(pdf);
    
    }
    
    return res.status(300).json({message: 'Wrong request method' })
    
}

export default addNewInvoice