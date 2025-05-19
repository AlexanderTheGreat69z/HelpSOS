import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
    title: string
    content: React.ReactNode

    visible: boolean
    onXButton: React.MouseEventHandler<HTMLButtonElement>
}

const ModalSetup:React.FC<Props> = ({ title, content, visible, onXButton }) => {
    const styles = {
        overlay: "fixed inset-0 w-[100vh] h-screen flex items-center justify-center bg-[#00000050]",
        container: "transition-all bg-zinc-700 p-5 rounded-xl",
        modalTitle: "pb-2 mb-3 flex flex-row items-center gap-32 border-b-1 text-2xl",
        xButton: "bg-[rgba(100,0,0,0.25)] hover:bg-[rgba(100,0,0,1)] text-lg transition-colors py-1 px-2 rounded-lg"
    }

    if (visible) return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.modalTitle}>
                    <h1 className='flex-grow'>{title}</h1>
                    <button className={styles.xButton} onClick={onXButton}><FontAwesomeIcon icon={faX}/></button>
                </div>
                {content}
            </div>
        </div>
    )
}

export default ModalSetup