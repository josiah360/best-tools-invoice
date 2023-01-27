const { MongoClient } = require('mongodb')

const url = process.env.DB_CONNECTION_STRING

const client = new MongoClient(url)

let name = 'Besttools'

let db;

async function mongoConnect() {
    await client.connect()
    console.log('database connected!')
    db = client.db(name)
    return
}

export const getDb = () => {
    if(db) {
        return db
    }

    throw new Error('No database found!')
}

export default mongoConnect
