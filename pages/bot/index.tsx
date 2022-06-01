import server from "../../config"
import { getSession } from "next-auth/react"

export default function botPage(props) {
    return (<>
        <div>
            <a target="_blank" rel="noreferrer" href={`https://jonathanromano.github.io/binary-bot/${props.args}`}>
                teste
            </a>
        </div>
    </>)
}

export async function getServerSideProps(context){
    const session = await getSession(context)

    if(!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/sigin'
            },
            props: {}
        }
    }

    const response = await fetch(`${server}/api/user/getPermissions/${session.user.email}`)

    const { permissions } = await response.json()

    
    if(permissions !== "subscriber"){
        if(permissions !== "admin"){
            return {
                redirect: {
                    permanent: false,
                    destination: '/'
                },
                props: {}
            }
        }
    }
    
    const { acct1, token1, cur1, acct2, token2, cur2, state } = context.query    
    const args = `?acct1=${acct1}&token1=${token1}&cur1=${cur1}&acct2=${acct2}&token2=${token2}&cur2=${cur2}&state=${state}`
    
    return {
        props: {
            args: args
        }
    }

}