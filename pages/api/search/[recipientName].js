import mongoConnect from "@/util/database"
import Invoice from "@/models/invoice"


async function handleInvoices(req, res) {
        await mongoConnect()

        const { recipientName } = req.query

        try {
            const invoices = await Invoice.searchInvoiceByName(recipientName)
            return res.status(200).json({ message: 'Fetched successfully!', invoices })
        } catch(err) {
            return res.status(500).json({ error: err, message: 'Something went wrong' })
        }
}

export default handleInvoices