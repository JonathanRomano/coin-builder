import styles from "../../styles/Admin.module.css"
import { getSession } from "next-auth/react"
import server from "../../config"

export default () => {
    return (<>
        <div className={styles.background}>
            <div className={styles.container}>
                
                <div className={styles.box}>
                    <h1> Solicitações de ativação </h1>

                    <div className={styles.card}>
                        <p> {`Nome: ${"Jonathan Lauxen Romano"} `}</p>
                        <p> {`Email: ${"jjonathanromano@gmail.com"} `}</p>
                        <p> {`CPF: ${"106.688.179-09"} `}</p>
                        <button>teste</button>
                    </div>

                </div>
            </div>
        </div>
    </>)
}

export async function getServerSideProps(context) {
  
    const session = await getSession(context)
  
    if(session){
      const response = await fetch(`${server}/api/user/getPermissions/${session.user.email}`)
      const { permissions }= await response.json()
  
      if(permissions !== 'admin'){
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  
    return {
      props: {
        session: session
      }
    }
  }