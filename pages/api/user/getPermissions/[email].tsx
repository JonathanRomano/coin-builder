import { MongoClient } from "mongodb"

export default async (req, res) => {
    const { email } = req.query

    const client = new MongoClient(process.env.MONGO_URI)

    await client.connect()
    const user = await client.db("binary-bot-users").collection("users").findOne({email: email}, {
        projection: { id: 0 }
    })

    if (!user.permissions){
        await client.db("binary-bot-users").collection("users").findOneAndUpdate({email: email},{
            $set: {
                permissions: 'guest'
            }
        })
        
        res.status(200).json({
            permissions: 'guest'
        })
    }
    
    res.status(200).json({
        permissions: user.permissions
    })
}