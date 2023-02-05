import mongoConnect from "./database"
import Invoice from "@/models/invoice"


export function isEmpty(obj) {
    return Object.keys(obj).length === 0
}

export async function getAllInvoices() {
    await mongoConnect()
    return await Invoice.fetchAll()
}

export async function getInvoice(id) {
    await mongoConnect()
    return await Invoice.getById(id)
}

