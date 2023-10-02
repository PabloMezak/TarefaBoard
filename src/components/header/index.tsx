import styles from './styles.module.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
export function Header() {

    //UseSession veremos se o usuario está logado ou não
    // e recebemos os dados dele atraves do Data:session
    //status é para saber se ele está logado ou nao
    const { data: session, status } = useSession()
    return (
        <header className={styles.header}>
            <section className={styles.content}>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.linkPainel}>
                        <h1 className={styles.logo}>Tarefas<span>+</span></h1>
                    </Link>
                    {session?.user && (
                        <Link href="/dashboard" className={styles.linkButton}>
                            <span>Meu painel</span>
                        </Link>
                    )}
                </nav>

                {status === "loading" ? (
                    <></>
                ) : session ? (
                    <div className={styles.OutButton}>
                        <Link className={styles.loginButtonA} href='/perfil'>
                            Olá {session?.user?.name}
                        </Link>
                        <button className={styles.loginButton} onClick={() => signOut()}>sair</button>
                    </div>


                ) : (
                    <button className={styles.loginButton} onClick={() => signIn("google")}>Acessar conta</button>
                )}
            </section>
        </header>
    )
}