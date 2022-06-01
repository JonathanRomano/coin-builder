import { MongoClient } from "mongodb"

export default async (req, res) => {
    const { permissions } = req.query

    const client = new MongoClient(process.env.MONGO_URI)

    await client.connect()
    
    const options = {
        projection: {
            _id: 0,
            password: 0,
            pessoalInfo: 0,
            image: 0,
            emailVerified: 0
        }
    }

    const cursor = client.db("binary-bot-users").collection("users").find({permissions: permissions}, options)

    const users = await cursor.toArray()

    res.status(200).json({
        userList: users
    })

}