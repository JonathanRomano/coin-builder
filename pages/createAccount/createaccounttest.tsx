import { ObjectID } from "bson"
import { getProviders, signIn } from "next-auth/react"

export default function teste(props){
    const { providers } = props

    return <div>

        {
            Object.values(providers).map((provider) => {
                console.log(provider)
                if (provider['name'] === 'Email'){
                    return <div key={provider['name']}>
                        <form action="http://localhost:3000/api/auth/signin/email" method="POST">
                        <input type="hidden" name="csrfToken" value="76fd0817af50aee2ad9ed86bd812dea3273fda11e0e4c18f16db61c0e5a51fe2"/>
                            <label>Email</label>
                            <input id="input-email-for-email-provider" type="email" name="email" placeholder="email@example.com" required/>
                            <button type="submit">Sign in with Email</button>
                            </form>
                    </div>
                } else if (provider['name'] !== "Credentials"){
                    return <div key={provider['name']}>
                        <button onClick={() => signIn(provider['id'],{callbackUrl: '/createAccount'})}>
                            sigin whit {provider['name']}
                        </button>
                    </div>
                }
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