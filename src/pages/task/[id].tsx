import Head from 'next/head'
import styles from './styles.module.css'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { db } from '@/services/firebaseConnection'
import { doc, collection, query, where, getDoc, addDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { TextArea } from '@/components/textarea'
import { ChangeEvent, FormEvent, cloneElement, useState } from 'react'
import { FaTrash } from 'react-icons/fa'


interface TaskProps {
    item: {
        tarefas: string,
        created: Date,
        public: boolean,
        user: string
        taskid: string
    };
    allComments: CommentsProps[]
}
interface CommentsProps {
    id: string,
    comments: string,
    taskId: string,
    user: string,
    name: string
}
export default function Task({ item, allComments }: TaskProps) {

    const { data: session } = useSession()
    const [input, setInput] = useState("")
    const [comments, setComments] = useState<CommentsProps[]>(allComments || [])

    async function handleComement(event: FormEvent) {
        event.preventDefault()
        if (input === "") return;

        if (!session?.user?.email || !session?.user.name) return;

        try {
            //Criar uma coleção no banco de dados e tambem adicionar os 5 Parametros
            //comentario: input, created: new Date(), user: session?.user?.email, name: session?.user?.name, taskId: item?.taskid
            const docRef = await addDoc(collection(db, "comments"), {
                comentario: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskid
            });

            const data = {
                id: docRef.id,
                comments: input,
                user: session?.user?.email,
                name: session?.user.name,
                taskId: item?.taskid
            }
            setComments((oldItems) => [...oldItems, data])
            setInput("")
        } catch (error) {
            console.log(error)
        }
    }
    async function HandleDeleteComment(id:string) {
        //Deletar comentario
        try {
            const docRef = doc(db, "comments", id)
            await deleteDoc(docRef)
            const deleteComment = comments.filter((item)=> item.id !== id )
            setComments(deleteComment)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Tarefas </title>
            </Head>
            <main className={styles.main}>
                <h1>tarefas</h1>
                <article className={styles.task}>
                    <p>
                        {item.tarefas}
                    </p>
                </article>
            </main>
            <section className={styles.commentsContainer}>
                <h2>Deixar comentario</h2>

                <form onSubmit={handleComement}>
                    <TextArea
                        value={input}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                        placeholder='Digite seu comentario' />
                    <button className={styles.button} disabled={!session?.user}>Enviar comentario</button>

                </form>
            </section>
            <section className={styles.commentsContainer} >
                <h2>Comentarios:</h2>
                {comments.length === 0 && (
                    <span>Nenhum comentario encontrado...</span>
                )}
                {comments.map((item) => (
                    <article className={styles.comment}>
                        <div className={styles.headComment}>
                            <label className={styles.commentsLabel}>{item.name}</label>
                            {item.user === session?.user?.email && (
                                <button className={styles.buttonTrash} onClick={() => HandleDeleteComment(item.id)}>
                                    <FaTrash size={20} color="red" />
                                </button>
                            )}
                        </div>
                        <p>{item.comments}</p>
                    </article>
                ))}
            </section>
        </div>

    )
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    //referencia do banco de dados
    const id = params?.id as string
    const docRef = doc(db, "tarefas", id)
    //Entra na coleção "Coments" e pega o TaskId com um ID
    const q = query(collection(db, "comments"), where("taskId", "==", id))
    const snapshotComments = await getDocs(q)

    let allComments: CommentsProps[] = []
    snapshotComments.forEach((doc) => {
        allComments.push({
            id: doc.id,
            comments: doc.data().comentario,
            taskId: doc.data().taskId,
            user: doc.data().user,
            name: doc.data().name
        })
    })
    console.log(allComments)

    //validar se o usuario está logado/autenticado
    const snapshot = await getDoc(docRef)
    if (snapshot.data() === undefined) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    if (!snapshot.data()?.public) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    //converter data em data formatada 00/0/0000
    const miliseconds = snapshot.data()?.created?.seconds * 1000
    const task = {
        tarefas: snapshot.data()?.tarefas,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleString(),
        user: snapshot.data()?.user,
        taskid: id,
    }
    console.log(task)
    return {
        props: {
            item: task,
            allComments: allComments,
        },
    }
}