import mongoConnect from "@/util/database"

import Invoice from "@/models/invoice"

const getInvoice = async (req, res) => {
    await mongoConnect()
    const invoiceId = req.query.invoiceId
    console.log({invoiceId})

    try {
        const invoice = await Invoice.getById(invoiceId)
        console.log(typeof invoice)
        return res.status(200).json({ message: 'Fetched successfully!', invoice: {
            id: invoice._id,
            recipientName: invoice.recipientName,
            recipientAddress: invoice.recipientAddress,
            createdAt: invoice.createdAt,
            items: [...invoice.items],
            status: invoice.status,
            total: invoice.total

        }})
    } catch(err) {
        return res.status(500).json({ error: err, message: 'Something went wrong' })
    }
}

export default getInvoice