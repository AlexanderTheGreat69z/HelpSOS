import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.png'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const HomeHeader = () => {
    const navigate = useNavigate()
    const nav_routes = [
        {
            name: 'Home',
            route: '/'
        },
        {
            name: 'About',
            route: '/'
        },
        {
            name: 'Services',
            route: '/'
        },
    ]
    const styles = {
        container   : "flex flex-row w-full",

        nav         : "flex flex-1 flex-grow justify-around sm:justify-center items-center sm:space-x-10 2xl:space-x-15",
        navItem     : "h-10 px-5 text-sm sm:text-xl 2xl:text-2xl hover:bg-gray-200 rounded-xl transition-all cursor-pointer",

        logo        : "flex justify-center items-center p-5 w-1/2 xl:w-1/4",
        logo_img    : "object-contain h-20",

        buttons     : "hidden xl:flex flex-row flex-shrink-0 w-1/4 justify-center items-center gap-2",
        btn         : "px-3 h-12 border border-black rounded-2xl shadow-xl transition-all cursor-pointer ",
        signIn      : "bg-black text-white hover:bg-gray-800",
        getPrem     : "text-black hover:bg-gray-200"
    }
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt=""  className={styles.logo_img}/>
            </div>
            <nav className={styles.nav}>
                {nav_routes.map(({name, route}) => <button className={styles.navItem} onClick={() => navigate(route)}>{name}</button>)}
            </nav>
            <div className={styles.buttons}>
                <button className={styles.btn + styles.signIn} onClick={() => navigate('/register')}>Sign Up</button>
                <button className={styles.btn + styles.getPrem}>Get Premium! <span className='text-amber-400'><FontAwesomeIcon icon={faCrown} /></span></button>
            </div>
        </div>
    )
}

export default HomeHeader