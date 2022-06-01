import { MongoClient } from "mongodb"

export default async (req, res) => {
    const { email, newPermissions } = req.query

    if(newPermissions === "admin"){
        res.status(403).json({
            mesage: "acesso negado!"
        })
    }

    const client = new MongoClient(process.env.MONGO_URI)

    await client.connect()

    await client.db("binary-bot-users").collection("users").findOneAndUpdate({email: email},{
        $set: {
            permissions: newPermissions
        }
    })

    res.status(200).json({
        mesage: "as permissões do usuário foram alteradas com sucesso!"
    })
}