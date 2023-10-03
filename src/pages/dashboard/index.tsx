import styles from './styles.module.css'
import Head from 'next/head'
import { ChangeEvent, FormEvent, useState } from 'react'
import { FaShare, FaTrash } from 'react-icons/fa'

import { GetServerSideProps } from "next"
import { getSession } from 'next-auth/react'
import { TextArea } from "@/components/textarea"

import { db } from '@/services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'
/**
 * The Dashboard component is a TypeScript React component that renders a form for users to input tasks
 * and a section to display the tasks.
 * @returns a JSX element, which represents the structure and content of a dashboard component.
 */

interface HomeProps{
    user:{
        email: string
    }
}
export default function Dashboard({user}:HomeProps) {
    const [input, setInput] = useState("")
    const [publicTask, setPublicTask] = useState(false)

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked)
    }


    //Receber evendo de Submit do FORM (receber os dados escritos no TEXTArea da tarefa)
    async function HandleRegisterTask(event: FormEvent) {
        // Não dar Reload na pagina
        event.preventDefault()


        if (input === "") return;
        try {
            //criar um Documento com ID aleatoria. Vai entrar dentro do db(Bando de dados) 
            //e criar uma campo no Bando de dados(db) chamada "tarefas"
            await addDoc(collection(db,"Tarefas"),{
                tarefas: input,
                created: new Date(),
                user: user?.email,
                public:  publicTask
            })
            setInput("")
            setPublicTask(false)
        } catch (error) {
            console.log(err)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Painel de tarefas</title>
            </Head>
            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Qual sua tarefa</h1>
                        <form onSubmit={HandleRegisterTask}>
                            <TextArea
                                value={input}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                                placeholder="Digite qual a sua tarefa" />
                            <div className={styles.chackboxArea}>
                                <input type="checkbox"
                                    className={styles.chackbox}
                                    checked={publicTask}
                                    onChange={handleChangePublic}
                                />
                                <label>Deixar tarefa publica</label>
                            </div>
                            <button className={styles.button} type="submit">
                                Registrar
                            </button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskContainer}>
                    <h1>Minhas tarefas</h1>
                    <article className={styles.task}>
                        <div className={styles.tagContainer}>
                            <label className={styles.tag}>PUBLICO</label>
                            <button className={styles.shareButton}>
                                <FaShare size={22}
                                    color="blue" />
                            </button>
                        </div>

                        <div className={styles.taskContent}>
                            <p>Minha primeira tarefa foi show</p>
                            <button className={styles.trashButton}>
                                <FaTrash size={24} color="red"
                                />
                            </button>
                        </div>
                    </article>

                </section>
            </main>
        </div>
    )
}
/**
 * This function checks if a user is logged in and redirects them to the homepage if they are not.
 * @param  - The above code is an implementation of the `getServerSideProps` function in Next.js. This
 * function is used to fetch data on the server side before rendering a page.
 * @returns The code is returning an object with either a "redirect" property or a "props" property. If
 * the session does not have a user, it returns a "redirect" object with the destination set to "/" and
 * permanent set to false. If the session has a user, it returns a "props" object with an empty object
 * as its value.
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
    //Retornar a informação de email como propriedade
    return {
        props: {
            user: {
                email: session?.user.email
            }
        },
    }
}