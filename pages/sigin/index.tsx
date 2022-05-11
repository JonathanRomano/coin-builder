import styles from "../../styles/Sigin.module.css"
import { getProviders, signIn } from "next-auth/react"

export default (props) => {

    const { providers } = props

    return (<>
        <div className={styles.background}>
        <div className={styles.container}>
            
            <div className={styles.box}>
                <h1>Entrar</h1>

                <form>
                    <p>Email </p>
                    <input type='email' required/>
                    
                    <p>Senha </p>
                    <input type='password' required/>
                    
                    <br/>

                    <button type='submit' className={styles.logginButton}>
                        Login
                    </button>

                </form>

                <p> Entrar com </p>
                
                {
                    Object.values(providers).map((provider) => {
                        return (
                            <button className={styles.providerButton} key={provider['name']} onClick={() => signIn(provider['id'], {callbackUrl: '/'})}>
                                {provider.name}
                            </button>
                        )
                    })
               }

            </div>

        </div>
        </div>
    </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            providers: await getProviders()
        }
    }
}