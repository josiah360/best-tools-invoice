import mongodb from 'mongodb'

import { getDb } from "@/util/database";


class Invoice {
    constructor(id, recipientName, recipientAddress, createdAt, items) {
        this._id = id ? new mongodb.ObjectId(id) : null
        this.recipientName = recipientName
        this.recipientAddress = recipientAddress
        this.createdAt = createdAt
        this.items = items
    }

    async save() {
        const db = getDb()
        return db.collection('invoices').insertOne(this)
    }

    static async fetchAll() {
        const db = getDb()
        return db.collection('invoices').find().roArray()
    }
}

export default Invoice