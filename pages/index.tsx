import styles from '../styles/Home.module.css'
import { getSession, signIn } from 'next-auth/react'
import { MongoClient } from 'mongodb'
import Image from 'next/image'
import Link from 'next/link'

//importing components
import NavBar from '../src/components/NavBar'

export default function Home(props) {
  const { session } = props

  const bot = require('../src/images/bot.jpeg')
  const suporte = require('../src/images/suporte.png')

  return (
    <div className={styles.background}>
    <div className={styles.container}>

    
    
      { session ?
        <div className={styles.box}>
          <NavBar session={session}/>
          
          <div className={styles.card}>

            <Image className={styles.image} src={bot}/>

            <Link href="https://google.com">  
              <div className={styles.linkButton}>
                <b>Acesso ao Bot</b>
              </div>
            </Link>
          
          </div>

          <div className={styles.card}>

            <Image className={styles.image} src={suporte}/>
            
            <Link href="https://google.com">  
              <div className={styles.linkButton}>
                <b>Suporte</b>
              </div>
            </Link>

          </div>

  
        </div>
        :
        
        <div className={styles.main}>
          <h1> Coin Builder $ </h1>
          
          <h2> Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto, Texto.</h2>

          <div className={styles.mainBox}>
              <Link href='/sigin'>
                <div className={styles.button}>
                  <b>Login</b>
                </div>
              </Link>
              <Link href='/'>
                <div className={styles.button}>
                  <b>criar conta</b>
                </div>
              </Link>
          </div>

        </div>
      }
    

    
    </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  
  const session = await getSession(context)

  return {
    props: {
      session: session
    }
  }
}