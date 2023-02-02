import mongoConnect from "@/util/database"

import Invoice from "@/models/invoice"

const getInvoice = async (req, res) => {
    mongoConnect()
    const invoiceId = req.query.invoiceId

    try {
        const invoice = await Invoice.getById(invoiceId)
        return res.status(200).json({ message: 'Fetched successfully!', invoice })
    } catch(err) {
        return res.status(500).json({ error: err, message: 'Something went wrong' })
    }
}

export default getInvoice