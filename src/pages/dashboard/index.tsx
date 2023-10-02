import styles from './styles.module.css'
import Head from 'next/head'

import {FaShare} from 'react-icons/fa'

import { GetServerSideProps } from "next"
import { getSession } from 'next-auth/react'
import { TextArea } from "@/components/textarea"

/**
 * The Dashboard component is a TypeScript React component that renders a form for users to input tasks
 * and a section to display the tasks.
 * @returns a JSX element, which represents the structure and content of a dashboard component.
 */
export default function Dashboard() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Painel de tarefas</title>
            </Head>
            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Qual sua tarefa</h1>
                        <form>
                            <TextArea 
                            placeholder="Digite qual a sua tarefa"/>
                            <div className={styles.chackboxArea}>
                                <input type="checkbox" className={styles.chackbox} />
                                <label>Deixar tarefa publica</label>
                            </div>
                            <button className={styles.button} type="submit">
                                Registrar
                            </button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskContainer}>
                    <article className={styles.task}>
                        <div className={styles.tagContainer}>
                            <label className={styles.tag}>PUBLICO</label>
                            <button className={styles.shareButton}>
                                <FaShare size={22}
                                color="blue"/>
                            </button>

                        </div>
                    </article>
                </section>
            </main>
        </div>
    )
}
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