import { MongoClient } from "mongodb"
import { getSession } from "next-auth/react"

export default async ( req, res) => {
    
    const { json } = req.query
    const { email, pessoalInfo } = await JSON.parse(json)
    const session = await getSession({ req })

    if( email !== session.user.email ){
        res.status(403).json({
            mesage: 'denied access'
        })
    }

    const client = new MongoClient(process.env.MONGO_URI)
    await client.connect()

    const bcrypt = require('bcrypt')

    bcrypt.hash(pessoalInfo.password, 7, function(err, hash){

        const name = pessoalInfo.name
        delete pessoalInfo.password
        delete pessoalInfo.name

        client.db("binary-bot-users").collection("users").findOneAndUpdate({email: email},{
            $set: {
                name: name,
                permissions: 'waitingActivation',
                pessoalInfo: pessoalInfo,
                password: hash
            }
        })

    })


    res.status(200).json({
        mesage: 'ok'
    })
}