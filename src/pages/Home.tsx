import { useNavigate } from 'react-router-dom'
import HomeHeader from '../components/HomeHeader'


function Home() {
    const navigate = useNavigate()
    const styles = {
        page: "bg-no-repeat bg-cover bg-center h-screen",
        content: "mx-auto sm:w-4/5 h-9/10",
        
        header: "flex justify-center h-24 sm:h-1/10",
        section: "flex flex-col justify-center items-center md:items-start px-10 items md:w-1/2 h-9/10",

        text: "text-center md:text-left",
        heading: "text-3xl md:text-7xl/20 font-semibold",
        desc : "text-xl my-5 sm:my-10",

        buttons: "flex flex-row gap-2 sm:gap-5 w-fit",
        btn: "text-sm sm:text-lg px-5 py-2 rounded-xl transition-all cursor-pointer shadow-xl",
        signUp: "bg-green-600 hover:bg-green-500 text-white font-bold ",
        aboutUs: "bg-black hover:bg-neutral-700 text-white font-bold ",
    }
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <HomeHeader />
                </header>
                <section className={styles.section}>
                    <div className={styles.text}>
                        <h1 className={styles.heading}>Organize your study<br/>and learn comfortably</h1>
                        <p className={styles.desc}>Don't miss on any important stuff on your study by organizing your environment with <b>HelpSOS</b></p>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.signUp + styles.btn} onClick={() => navigate('/register')}>Sign Up for HelpSOS</button>
                        <button className={styles.aboutUs + styles.btn}>Know more about HelpSOS</button>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Home