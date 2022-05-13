import { MongoClient } from "mongodb"

export default async ( req, res) => {
    
    const { json } = req.query
    const { email, pessoalInfo } = await JSON.parse(json)
    
    const client = new MongoClient(process.env.MONGO_URI)
    await client.connect()


    

    res.status(200).json({
        email
    })
}