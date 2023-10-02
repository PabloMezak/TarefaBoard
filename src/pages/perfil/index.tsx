/* The code is importing various modules and functions from different libraries and frameworks. */
import { GetServerSideProps } from "next"
import styles from './styles.module.css'
import Head from 'next/head'
import Image from 'next/image'



import { getSession } from 'next-auth/react'
import { useSession } from "next-auth/react"
export default function Perfil() {
    const { data: session, status } = useSession()



/* The code you provided is a React component that renders a user profile page. */
    return (
        <div className={styles.container}>
            <Head>
                <title>Meu perfil</title>
            </Head>
            <div className={styles.imgContainer}>
                <div className={styles.user}>
                    <img src={session?.user?.image?.toString()} alt="" />
                    <div className={styles.userNameEmail}>
                        <h1> {session?.user?.name} </h1>
                        <p>{session?.user?.email}</p>
                        <div className={styles.descri}>
                        <p>Lorem, ipsum dolor sit amet <br /> consectetur adipisicing elit.</p>
                    </div>
                    </div>
                    
                </div>

            </div>

        </div>
    )
}


/**
  * Esta função verifica se um usuário está logado e o redireciona para a página inicial, caso não esteja.
  * @param - O código acima é uma implementação da função `getServerSideProps` em Next.js. Esse
  * A função é usada para buscar dados no lado do servidor antes de renderizar uma página.
  * @returns O código está retornando um objeto com uma propriedade "redirect" ou uma propriedade "props". Se
  * a sessão não possui usuário, ela retorna um objeto "redirect" com destino definido como "/" e
  * permanente definido como falso. Se a sessão tiver um usuário, ela retorna um objeto "props" com um objeto vazio
  * como seu valor.
  */
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })
    //console.log(session)
    if (!session?.user) {
        //se nao tem usuario
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    return {
        props: {},
    }
}