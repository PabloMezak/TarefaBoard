import styles from './styles.module.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
export function Header() {

    //UseSession veremos se o usuario está logado ou não
    const { data: session, status } = useSession()
    return (
        <header className={styles.header}>
            <section className={styles.content}>
                <nav className={styles.nav}>
                    <Link href="/">
                        <h1 className={styles.logo}>Tarefas<span>+</span></h1>
                    </Link>

                </nav>
                <Link href="/dashboard" className={styles.linkButton}>
                    <span>Meu painel</span>
                </Link>
                {status === "loading" ? (
                    <></>
                ) : session ? (
                    <button className={styles.loginButton} onClick={() => signOut()}>{session?.user?.name}</button>
                ) : (
                    <button className={styles.loginButton} onClick={() => signIn()}>Acessar conta</button>
                )}
            </section>
        </header>
    )
}