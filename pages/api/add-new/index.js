import mongoConnect from "@/util/database"
import Invoice from "@/models/invoice"



async function addNewInvoice(req, res) {

    const {recipientName, recipientAddress, createdAt, items, status, total} = req.body

    if(req.method === 'POST') {
        await mongoConnect()
        const invoice = new Invoice(null, recipientName, recipientAddress, createdAt, items, status, total)
        try {
            await invoice.save()
            return res.status(200).json({ message: 'Invoice saved successfuly!' })
        } catch(err) {
            return res.status(500).json({ error: err, message: 'Something went wrong' })
        }
    }
    
    return res.status(300).json({message: 'Wrong request method' })
    
}

export default addNewInvoice