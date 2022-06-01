import styles from "./navBar.module.css"
import Link from "next/link"

import { signOut } from "next-auth/react"

function NavBar({session}){
    return (
        <div className={styles.NavBar}>

                <Link href="/">
                    <div>
                        <h2> Nome da empresa $ </h2>
                    </div>
                </Link>

                <Link href={""}>
                    <div onClick={() => signOut()} title="Clique para deslogar!">
                        <h3> {session.user.name} </h3>
                    </div>
                </Link>
                
        </div>
    )
}

NavBar.displayName = 'NavBar'

export default NavBar