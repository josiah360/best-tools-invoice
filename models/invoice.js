import mongodb, { ObjectId } from 'mongodb'

import { getDb } from "@/util/database";

// const ObjectId = new mongodb.ObjectId

class Invoice {
    constructor(id, recipientName, recipientAddress, createdAt, items, status, total) {
        this._id = id ? ObjectId(id) : null
        this.recipientName = recipientName
        this.recipientAddress = recipientAddress
        this.createdAt = createdAt
        this.items = items
        this.status = status
        this.total = total
    }

    async save() {
        const db = getDb()
        return db.collection('invoices').insertOne(this)
    }

    static async deleteById(id) {
        const db = getDb()
        return db.collection('invoices').deleteOne({ _id: ObjectId(id)})
    }

    updateInvoice() {
        const db = getDb()
        return db.collection('invoices').updateOne({ _id: ObjectId(id)}, { $set: this })
    }

    updateInvoiceStatus() {

    }

    static async getById(id) {
        const db = getDb()
        return db.collection('invoices').find({ _id: ObjectId(id)}).next()
    }

    static async fetchAll() {
        const db = getDb()
        return db.collection('invoices').find().toArray()
    }
}

export default Invoice