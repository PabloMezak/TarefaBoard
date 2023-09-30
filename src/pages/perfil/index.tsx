import { GetServerSideProps } from "next"
import styles from './styles.module.css'
import Head from 'next/head'
import { getSession } from 'next-auth/react'

export default function Perfil() {
    return (
        <div className={styles.container}>
            <Head>
                <title>PMeu perfil</title>
            </Head>
            <h1>meu perfil</h1>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })
    //console.log(session)
    if (!session?.user) {
        //se nao tem usuario
        return{
            redirect:{
                destination: "/",
                permanent: false,
            }
        }
    }   
    return {
        props: {},
    }
}