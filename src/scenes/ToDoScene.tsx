import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { getToDo, addToDo, deleteToDo } from '../api/api.ts';

import SceneTitle from '../components/SceneTitle.tsx'
import ToDoItem from '../components/ToDoItem'
import ModalSetup from '../components/ModalSetup';

const ToDoScene = () => {

    const [toDos, setToDos] = useState([])
    const renderToDo = async () => {
        const data = await getToDo()
        if (data) setToDos(data)
    }
    useEffect(() => {
        renderToDo()
    }, []);
    console.log(toDos)

    const test = true

    const [viewToDoModal, setViewToDoModal] = useState(false)

    const [viewDeleteModal, setViewDeleteModal] = useState(false)
    const [QFD_todoID, setQFD_ID] = useState("")

    const styles = {
        container: "h-[80vh] 2xl:flex xl:flex-row gap-10",

        history: "bg-zinc-900 rounded-2xl 2xl:w-1/4 p-5",
        histTitle: "text-3xl border-b-1 px-2 pb-3",

        todoList: "flex-grow",
        todoItems: "",
        addBtn: "transition-colors w-full bg-zinc-900 hover:bg-zinc-800 py-2 rounded-xl my-5",
    }
    
    return (
        <section>
            <SceneTitle title='Your To-Do List' />
            <div className={styles.container}>
                <div className={styles.todoList}>
                    <div className={styles.todoItems}>
                        {toDos.map(({_id, todo_task}) => <ToDoItem key={_id} task={todo_task} 
                        onCheck = {() => {
                            console.log("Checkedd!")
                        }}
                        onButtonClick={() => {
                            setViewDeleteModal(true)
                            setQFD_ID(_id)
                        }} 
                        onCheckedClick={async () => {
                            await deleteToDo(_id)
                            renderToDo()
                        }}/>)}
                        <button className={styles.addBtn} onClick={() => setViewToDoModal(true)}>
                            <FontAwesomeIcon icon = {faPlus} />
                            <h1>Add a task</h1>
                        </button>
                    </div>
                </div>
                <div className={styles.history}>
                    <h1 className={styles.histTitle}>History</h1>
                    {test ? <p>Nice</p> : <p>Whoops, You haven't submitted any To-do's yet</p>}
                </div>
            </div>
            <ModalSetup title='Add To-do' content={<AddToDoModal onSubmit={() => {
                setViewToDoModal(false)
                renderToDo()
                }}/>} visible={viewToDoModal} onXButton={() => setViewToDoModal(false)}/>
            <ModalSetup title='Confirm Delete To-Do?' content={<ConfirmDeleteModal todoID={QFD_todoID} onConfirm={() => {
                setViewDeleteModal(false)
                renderToDo()
            }} onCancel={() => setViewDeleteModal(false)}/>} visible={viewDeleteModal} onXButton={() => setViewDeleteModal(false)}/>
        </section>
    )
}

const AddToDoModal:React.FC<{ onSubmit?: () => void }> = ({onSubmit}) => {
    const [task, setTask] = useState("")
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        
        if (!task.trim()) return;
        await addToDo(task)
        setTask("")

        if (onSubmit) onSubmit()
    }

    const styles = {
        form: "flex flex-col",
        input: "bg-[#00000050] border-b-2 my-2 w-[50vw] px-3 py-2",
        btn: "bg-zinc-600 hover:bg-zinc-500 text-lg transition-colors mt-2 p-2 rounded-md"
    }
    return (
        <div>
            <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
                <label><b>Task:</b></label>
                <input required className={styles.input} type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='Your task here (e.g. Wash the dishes)'/>
                <input type="submit" className={styles.btn} value="Add"/>
            </form>
        </div>
    )
}

const ConfirmDeleteModal:React.FC<{todoID:string, onConfirm:()=>void, onCancel:()=>void}> = ({todoID, onConfirm, onCancel}) => {
    const confirmDeletion = async () => {
        await deleteToDo(todoID)
        onConfirm()
    }
    
    const styles = {
        form: "flex flex-col text-center",
        input: "bg-[#00000050] border-b-2 my-2 w-[50vw] px-3 py-2",
        btnRow: "flex flex-row gap-4",
        btn: "bg-zinc-600 flex-grow hover:bg-zinc-500 text-lg transition-colors mt-2 p-2 rounded-md"
    }
    return (
        <div>
            <div className={styles.form} >
                <h1>Are you sure you want to delete this task?</h1>
                <h1>(Task will be removed and will be marked as 'dismissed')</h1>
                <div className={styles.btnRow}>
                    <button className={styles.btn} onClick={confirmDeletion}>Confirm</button>
                    <button className={styles.btn} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ToDoScene