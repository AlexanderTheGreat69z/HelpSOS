import { faExclamationCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props{
    task: string
    complete: boolean
}

const ToDoItem:React.FC<Props> = ({ task }) => {

    const styles = {
        container: "flex flex-row items-center w-full transition-colors hover:bg-[#00000050] border-b-1 p-5 gap-10",
        task: "flex-grow text-2xl",
        checkbox: "w-10 h-10",
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.task}><b><FontAwesomeIcon icon={faExclamationCircle}/> {task}</b></h1>
            <input className={styles.checkbox} type="checkbox" />
            <button><FontAwesomeIcon icon={faTrash} /></button>
        </div>
    )
}

export default ToDoItem