import { faExclamationCircle, faTrash, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface Props{
    task: string
    onButtonClick: () => void
    onCheckedClick: () => void
    onCheck: () => void
}

const ToDoItem:React.FC<Props> = ({ task, onCheck, onButtonClick, onCheckedClick }) => {

    const [checked, setChecked] = useState(false)
    const handleCheckboxChange = () => {setChecked((prevChecked) => !prevChecked);}

    const styles = {
        container: `flex flex-row items-center w-full transition-colors ${checked?"bg-[#00ff0020]":"hover:bg-[#00000050]"} border-b-1 p-5 gap-10`,
        task: "flex-grow text-2xl",
        checkbox: "w-10 h-10",
        trash: `transition-all text-3xl hover:text-4xl rounded-xl px-3 py-2 ${checked?"hover:bg-green-900":"hover:bg-red-900"}`,
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.task}><b><FontAwesomeIcon icon={faExclamationCircle}/> {task}</b></h1>
            <input className={styles.checkbox} type="checkbox" checked={checked} onChange={() => {
                handleCheckboxChange()
                onCheck()
            }} />
            <button className={styles.trash} onClick={checked? onCheckedClick : onButtonClick}>
                {checked ? <FontAwesomeIcon icon={faChevronRight} /> : <FontAwesomeIcon icon={faTrash} />}
            </button>
        </div>
    )
}

export default ToDoItem