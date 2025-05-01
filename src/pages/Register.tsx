import { faG } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Register() {
    const styles = {
        page: "bg-[url(src/assets/home-img1.jpg)] bg-no-repeat bg-cover bg-left h-screen",
        content: "bg-white md:w-2/3 lg:w-1/2 h-full p-10 flex flex-col space-y-10",

        logo: "md:w-1/3 mx-10 md:mx-0",
        text: "text-xl md:text-3xl",
        heading: "text-3xl md:text-5xl font-bold border-b-2 pb-4 mb-3",

        form: "bg-neutral-100 md:bg-transparent w-5/6 m-auto p-5 rounded-xl flex flex-col justify-around",
        input_field: "flex flex-col my-4 w-full",
        label: "font-semibold md:text-xl mb-1",
        input: "border-b-2 border-neutral-400 bg-neutral-200 p-1 md:p-3",

        btn: "transition-colors rounded-xl my-2 text-white w-full py-2 md:text-xl font-semibold ",
        submit: "bg-black hover:bg-neutral-800",
        google: "bg-blue-500"
    }
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <img src="src/assets/logo.png" alt="" />
                </div>
                <form className={styles.form}>
                    <div className={styles.text}>
                        <h1 className={styles.heading}>Welcome to HelpSOS</h1>
                        <p>Please enter your credentials</p>
                    </div>
                    <div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input id="email" type="email" className={styles.input}/>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input id="password" type="password" className={styles.input}/>
                        </div>
                        <div className={styles.input_field}>
                            <label className={styles.label} htmlFor="pass_conf">Confirm Password</label>
                            <input id="pass_conf" type="password" className={styles.input}/>
                        </div>
                    </div>
                    <div>
                        <input type="submit" value="Sign in with Email" className={styles.btn + styles.submit}/>
                        <button className={styles.btn + styles.google}>Sign in with Google <FontAwesomeIcon icon={faG}/></button>
                    </div>
                    <div className='mx-auto my-3'>
                        <p>Already have an account? Log in here!</p>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Register