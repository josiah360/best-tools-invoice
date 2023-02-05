import mongoConnect from "@/util/database";
import Invoice from "@/models/invoice";


async function deleteInvoice(req, res) {
    const invoiceId = req.body
    
  
    if(req.method === 'POST') {
        await mongoConnect()

        await Invoice.deleteById(invoiceId)

        return res.status(200).json({message: 'Invoice deleted!' })
    }
    
    return res.status(300).json({message: 'Wrong request method' })
    
}

export default deleteInvoice