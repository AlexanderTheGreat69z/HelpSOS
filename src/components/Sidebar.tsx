import { faDoorOpen, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Menu = {
    name: string,
    icon: IconDefinition,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

interface Props{
    menus: Menu[]
    onMainButton: React.MouseEventHandler<HTMLButtonElement>,
    onExitButton: React.MouseEventHandler<HTMLButtonElement>,
}

const Sidebar:React.FC<Props> = ({menus, onMainButton, onExitButton}) => {
    const styles = {
        sidebar: "flex fixed flex-col items-center w-40 h-screen px-5 bg-zinc-800 border-r-5 border-zinc-900",
        breakline: "w-full border-t-2 border-zinc-600 my-3",
    }
    return (
        <nav className={styles.sidebar}>
                <div className='mt-7'>
                    <SB_Btn onclick={onMainButton} text="Profile" label={<b>SOS</b>}/>
                </div>
                <div className={styles.breakline}></div>
                <div>
                    {menus.map(({name, icon, onClick}, index) => <SB_Btn key={index} onclick={onClick} text={name} label={<FontAwesomeIcon icon={icon} />}/>)}
                </div>
                <hr className={styles.breakline} />
                <div className='mt-auto'>
                    <SB_Btn onclick={onExitButton} text="Log Out" label={<FontAwesomeIcon icon={faDoorOpen} />}/>
                </div>
        </nav>
    )
}

interface BtnProps {
    label: React.ReactNode,
    text: string,
    onclick: React.MouseEventHandler<HTMLButtonElement>
}
const SB_Btn:React.FC<BtnProps> = ({text, label, onclick}) => {
    const styles = {
        container: "text-center w-1/1 my-3",
        button: "peer transition-colors w-24 h-24 text-4xl hover:text-indigo-400 bg-zinc-900 rounded-[100%] shadow-xl hover:bg-zinc-600 active:bg-indigo-400 active:text-zinc-600",
        text: "transition-all h-0 peer-hover:h-[20px] top-full peer-hover:mt-2 scale-0 opacity-0 peer-hover:opacity-100 peer-hover:scale-100"
    }

    return(
        <div className={styles.container}>
            <button onClick={onclick} className={styles.button}>{label}</button>
            <h1 className={styles.text}>{text}</h1>
        </div>
    )
}

export default Sidebar