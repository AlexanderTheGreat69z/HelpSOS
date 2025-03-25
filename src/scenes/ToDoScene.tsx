import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SceneTitle from '../components/SceneTitle'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import ToDoItem from '../components/ToDoItem'

const ToDoScene = () => {

    const [toDos, setToDos] = useState([
        {task: "Wash the Dishes", completed: false},
        {task: "Sweep the Floors", completed: false},
        {task: "Do WADS Assignment", completed: false},
    ])

    const test = false

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
                        {toDos.map(({task, completed}) => <ToDoItem task={task} complete={completed}/>)}
                        <button className={styles.addBtn}>
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
        </section>
    )
}

export default ToDoScene