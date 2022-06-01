import styles from "../../styles/Admin.module.css"
import { getSession } from "next-auth/react"
import server from "../../config"

export default function adminPage(props) {
  const { userList } = props

  const chengeUserPermissions = async (email) => {
    await fetch(`${server}/api/admin/changeUserPermissions/${email}/subscriber`)
  }

  return (<>
      <div className={styles.background}>
          <div className={styles.container}>
              
              <div className={styles.box}>

                  <h1> Solicitações de ativação </h1>

                    {
                      userList.map( user => {
                        return <div className={styles.card} key={user["email"]}>
                            <p> Nome: <b>{user['name']}</b></p>
                            <p> Email: <b>{user['email']}</b></p>
                            <button onClick={() => chengeUserPermissions(user['email'])}>
                              Aprovar
                            </button>
                          </div>
                      })
                    }
                    <div className={styles.card}/>
                    
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

    const response = await fetch(`${server}/api/admin/getUsers/waitingActivation`)
    const { userList } = await response.json()

    return {
      props: {
        session: session,
        userList: userList
      }
    }
  }

