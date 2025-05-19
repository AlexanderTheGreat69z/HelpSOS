import React from 'react'

interface Props{
    title: string
}
const SceneTitle:React.FC<Props> = ({ title }) => {
    const styles = {
        container: "text-6xl border-b-2 pb-5 mb-10"
    }
    
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
        </div>
    )
}

export default SceneTitle