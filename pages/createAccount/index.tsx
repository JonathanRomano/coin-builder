import styles from "../../styles/CreateAccount.module.css"

import { getProviders, getSession, signIn, useSession } from "next-auth/react"
import server from "../../config"
import InputMask from "react-input-mask"
import { useState } from "react"
import ReactLoding from "react-loading"

export default function createAccount(props){
    

    const { providers, permissions, email } = props

    const InputCpf = (props) => (
        <InputMask mask="999.999.999-99" value={props.value} onChange={props.onChange} name='cpf' required/>
    )
    
    const InputPhone = (props) => (
        <InputMask mask="(99) 99999-9999" value={props.value} onChange={props.onChange} name='phoneNumber' required/>
    )
    
    const InputBirthDate = (props) => (
        <InputMask mask="99/99/9999" value={props.value} onChange={props.onChange} name='birthDate' required/>
    )    

    const Form = () => {
        const [ state, setState ] = useState(1)

        const saveEditions = async(e) => {
            e.preventDefault()
    
            // Inplementar a validação de CPF e etc...
    
            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData)
    
            const [ day, month, year ] = (data.birthDate as string).split('/')
            data.birthDate = `${day}-${month}-${year}`
            
            const stringData = JSON.stringify({
                pessoalInfo: data,
                email: email
            })
            
            setState(2)
                
            const response = await(await fetch(`${server}/api/user/updateInfo/${stringData}`)).json()

            if(response.mesage === 'ok'){
                setState(3)
            }
        }    

        if (state === 1 && permissions === 'guest'){
            return(<>
                <form onSubmit={saveEditions} className={styles.form}>
                <p>Antes de solicitar ativação do produto, precisamos que confirme alguns dados para sua segurança.</p>
                <p>Nome:</p>
                <input name='name' required/>

                <p>CPF:</p>
                <InputCpf/>

                <p>Data de nascimento:</p>
                <InputBirthDate/>

                <p>Numero de telefone (com DDD): </p>
                <InputPhone />

                <p>Senha:</p>
                <input type='password' name='password' required/>
                
                <button type="submit">
                    Solicitar ativação
                </button>
                </form>
            </>)
        } else if (state === 2 && permissions === 'guest'){
            return (<>
                <div className={styles.loadingBox}>
                    <ReactLoding type="spinningBubbles"/>
                </div>
            </>)
        } else if (state === 3 || permissions === "waitingActivation"){
            return(<>
                <div className={styles.box}>
                    <h1>Falta pouco!</h1>
                    <p className={styles.endText}>
                        Sua solicitação foi enviada e seu acesso sera liberado em até 24 horas, fique atendo a sua caixa de entrada!
                    </p>
                </div>
            </>)
        }
    }

    if (permissions === 'firstAcess'){
        return (<>
            <div className={styles.background}>
            <div className={styles.firstAcessContainer}>
            
            <div className={styles.firstAcessBox}>

                {
                    Object.values(providers).map((provider) => {
                        console.log(provider)
                        if (provider['name'] === 'Email'){
                            return <div key={provider['name']}>
                                <form action="http://localhost:3000/api/auth/signin/email" method="POST">
                                <input type="hidden" name="csrfToken" value="76fd0817af50aee2ad9ed86bd812dea3273fda11e0e4c18f16db61c0e5a51fe2"/>
                                    <input id="input-email-for-email-provider" type="email" name="email" placeholder="email@example.com" required/>
                                    <button type="submit">Sign in with Email</button>
                                    </form>
                                    <hr/>
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
            </div>
            </div>
        </>)
    }

    return (<>
        <div className={styles.background}>
        <div className={styles.container}>

            <div className={styles.box}>
                <Form/>
            </div>
        </div>
        </div>
    </>)
}

export async function getServerSideProps(context){
    const session = await getSession(context)
    const providers = await getProviders()

    if (!session){
        return {
            props: {
                permissions: 'firstAcess',
                providers: providers
            }
        }
    }

    const response = await fetch(`${server}/api/user/getPermissions/${session.user.email}`)

    const { permissions } = await response.json()

    if (permissions === 'guest' || permissions === 'waitingActivation'){
        return {
            props: {
                permissions: permissions,
                providers: providers,
                email: session.user.email
            }
        }
    }
    
    return {
        redirect: {
            permanent: false,
            destination: '/'
        },
        props: {}
    }
}