import { MongoClient } from "mongodb"

export default async (req, res) => {
    const { permissions } = req.query

    const client = new MongoClient(process.env.MONGO_URI)

    await client.connect()
    const cursor = await client.db("binary-bot-users").collection("users").findOne({permissions: permissions})

    const users = cursor//.toArray()

    res.status(200).json({
        users: users
    })

}