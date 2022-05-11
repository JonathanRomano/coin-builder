import { MongoClient } from "mongodb"

const uri = process.env.MONGO_URI
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

let client
let clientPromise

if (!process.env.MONGO_URI){
    throw new Error("Please, set the mongo uri in .env")
}

if (process.env.NODE_ENV){
    if(!global._mongoClientPromise){
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise