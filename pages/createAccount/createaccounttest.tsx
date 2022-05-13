import { ObjectID } from "bson"
import { getProviders, signIn } from "next-auth/react"

export default function teste(props){
    const { providers } = props

    return <div>

        {
            Object.values(providers).map((provider) => {
                return <div key={provider['name']}>
                    <button onClick={() => signIn(provider['id'],{callbackUrl: '/createAccount'})}>
                        sigin whit {provider['name']}
                    </button>                    
                </div>
            } )
        }


    </div>
}

export async function getServerSideProps(context){
    return {
        props: {
            providers: await getProviders()
        }
    }
}