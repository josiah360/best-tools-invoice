import mongoConnect from "./database"
import Invoice from "@/models/invoice"

async function getAllInvoices() {
    await mongoConnect()
    return await Invoice.fetchAll()
}

export default getAllInvoices