import mongoConnect from "@/util/database"
import Invoice from "@/models/invoice"


async function addNewInvoice(req, res) {

    if(req.method === 'POST') {
        await mongoConnect()
        const invoice = new Invoice(null, 'Mariam', '55 Kadara Street', '22-10-2022', ['A', 'B', 'C'])
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