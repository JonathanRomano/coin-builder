import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,

    adapter: MongoDBAdapter(clientPromise),

    session: {
        strategy: 'database',
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],

    pages: {
        signIn: '/sigin'
    }
})
