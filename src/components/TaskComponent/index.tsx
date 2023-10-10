import {FaShare, FaTrash} from 'react-icons/fa'

import styles from './styles.module.css'


export function TeskComponent() {
    return (
        <div>
            <article className={styles.task}>
                <div className={styles.tagContainer}>
                    <label className={styles.tag}>PUBLICO</label>
                    <button className={styles.shareButton}>
                        <FaShare size={22}
                            color="blue" />
                    </button>
                </div>

                <div className={styles.taskContent}>
                    <div>
                        <p></p>
                        
                    </div>
                    
                    <button className={styles.trashButton}>
                        <FaTrash size={24} color="red"
                        />
                    </button>
                </div>
            </article>
        </div>
    )
}