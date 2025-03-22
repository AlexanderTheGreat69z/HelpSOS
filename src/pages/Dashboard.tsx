import Sidebar from '../components/Sidebar'

import ProfileScene from '../scenes/ProfileScene'
import HelpieScene from '../scenes/HelpieScene'
import FoldersScene from '../scenes/FoldersScene'
import ReminderScene from '../scenes/ReminderScene'
import SchedulerScene from '../scenes/SchedulerScene'
import ToDoScene from '../scenes/ToDoScene'

import { faCalendar, faClock, faFolder, faLightbulb, faRobot } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function Dashboard() {
    type MenuSelection = "profile" | "todo" | "reminder" | "scheduler" | "folders" | "helpie"
    const [currMenu , setMenu] = useState<MenuSelection>("profile")

    const openMenu = () => {
        switch (currMenu) {
            case 'profile'  : return <ProfileScene />
            case 'todo'     : return <ToDoScene />
            case 'reminder' : return <ReminderScene />
            case 'scheduler': return <SchedulerScene />
            case 'folders'  : return <FoldersScene />
            case 'helpie'   : return <HelpieScene />
        }
    }

    const styles = {
        main: "p-16 w-1/1 ml-36"
    }
    const menus = [
        {name: "To-do",         icon: faLightbulb,  onClick: () => setMenu("todo")},
        {name: "Reminder",      icon: faClock,      onClick: () => setMenu("reminder")},
        {name: "Scheduler",     icon: faCalendar,   onClick: () => setMenu("scheduler")},
        {name: "File Manager",  icon: faFolder,     onClick: () => setMenu("folders")},
        {name: "Helpie AI",     icon: faRobot,      onClick: () => setMenu("helpie")}
    ]

    return (
        <div className='flex'>
            <Sidebar menus={menus} onMainButton={() => setMenu("profile")} onExitButton={() => console.log("Logout")}/>
            <main className={styles.main}>
                {openMenu()}
            </main>
        </div>
    )
}

export default Dashboard