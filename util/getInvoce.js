import mongoConnect from "./database"
import Invoice from "@/models/invoice"
 
 async function getInvoice(id) {
    await mongoConnect()
    return await Invoice.getById(id)
}

export default getInvoice
