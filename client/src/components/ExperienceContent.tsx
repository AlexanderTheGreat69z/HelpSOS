import React from 'react'

interface Props{
    title: string;
    content: string;
}
const ExperienceContent:React.FC<Props> = ({ title, content  }) => {
    const styles = {
        container: "w-full p-5 border rounded-xl shadow-lg bg-zinc-800",
        title: "text-2xl font-bold border-b pb-2 mb-3",
        content: "text-md",
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <ul>
                <li className={styles.content}>{content}</li>
            </ul>
        </div>
    )
}

export default ExperienceContent