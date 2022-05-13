import styles from "../../styles/CreateAccount.module.css"

import { getProviders, getSession, signIn } from "next-auth/react"
import server from "../../config"
import InputMask from "react-input-mask"
import { useState } from "react"

export default function createAccount(props){
    const [ popUpVisible, setPopUpVisible ] = useState(false)

    const { providers, permissions } = props

    const InputCpf = (props) => (
        <InputMask mask="999.999.999-99" value={props.value} onChange={props.onChange} name='cpf' required/>
    )
    
    const InputPhone = (props) => (
        <InputMask mask="(99) 99999-9999" value={props.value} onChange={props.onChange} name='phoneNumber' required/>
    )
    
    const InputBirthDate = (props) => (
        <InputMask mask="99/99/9999" value={props.value} onChange={props.onChange} name='birthDate' required/>
    )    

    const saveEditions = async(e) => {
        e.preventDefault()

        // Inplementar a validação de CPF e etc...

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        const [ day, month, year ] = (data.birthDate as string).split('/')
        data.birtDate = `${day}-${month}-${year}`

        const stringData = JSON.stringify({pessoalInfo: data})
        
        console.log('uia só')
        //const response = await fetch(`${server}/api/user/updateInfo/${stringData}`)
        
        return 'ok'

    }

    const PopUp = ({state}) => {
        return <>{state ? <div style={{"color":"white"}}>
                <h1>Pop Up</h1>
            </div>: <></>}</>
    }

    if (permissions === 'firstAcess'){
        return (<>
            <div>
                hello world

                <br/>

                <button onClick={() => console.log(props.permissions)}>
                    teste
                </button>
                
                <br/>
                <br/>

                {
                    Object.values(providers).map(provider => {
                            return <div id={provider['name']}>
                                <button onClick={() => signIn(provider['id'],)}>
                                    sigin whit {provider['name']}
                                </button>
                            </div>
                    })
                }

            </div>
        </>)
    }

    return (<>
        <div className={styles.background}>
        <div className={styles.container}>
        <PopUp state={popUpVisible} />
            <div className={styles.box}>
                <p>
                    Falta pouco para começar a operar no modo automatico!
                </p>
                <form onSubmit={saveEditions} className={styles.form}>
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

                    <button type="submit" onClick={() => setPopUpVisible(true)}>
                        Solicitar ativação
                    </button>
                </form>
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

    if (permissions !== 'guest'){
        return {
            redirect: {
                permanent: false,
                destination: '/'
            },
            props: {}
        }
    }

    return {
        props: {
            permissions: permissions,
            providers: providers
        }
    }
}