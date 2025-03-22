import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SceneTitle from '../components/SceneTitle'
import ExperienceContent from '../components/ExperienceContent'
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'
import ModalSetup from '../components/ModalSetup'

const ProfileScene = () => {

    const styles = {
        container       : "max-h-[80vh] 2xl:flex gap-10",

        personal_id     : "bg-neutral-900 flex flex-col md:flex-row 2xl:flex-col 2xl:w-1/4 items-center rounded-3xl shadow-xl justify-between gap-5 p-12",
        prof_pic        : "md:w-[38%] 2xl:w-full flex flex-col items-center",
        pic_img         : "rounded-[100%] object-cover",
        pic_edit_btn    : "transition-colors bg-zinc-800 px-5 py-2 mt-5 rounded-md text-2xl hover:bg-zinc-600",
        prof_desc       : "md:w-[55%] 2xl:w-full text-md flex flex-col justify-between gap-5",
        desc            : "",
        desc_header     : "border-b border-zinc-600 pb-1 mb-1 text-lg font-bold",

        exp_section     : "my-7 2xl:my-0 2xl:w-3/4",
        exp_header      : "border-b pb-3 mb-7 text-4xl font-bold",
        exp_container   : "grid grid-cols-1 px-5 md:grid-cols-2 2xl:grid-cols-1 gap-4 2xl:overflow-y-auto 2xl:h-[90%]",
        exp_addBtn      : "w-full p-5 bg-zinc-900 hover:bg-zinc-800 bg-opacity-50 rounded-xl transition-colors shadow-lg",
        exp_addBtnPlus  : "w-fit text-4xl bg-zinc-700 rounded-xl px-3 py-2 mx-auto mb-3",
    }
    const default_profIcon = "src/assets/default-profile.jpg"

    const [expData, setExpData] = useState<{title:string, content:string}[]>([
        {
            title: "Microsoft",
            content: "Worked as a Software Engineer specializing in cloud solutions.",
        },
        {
            title: "Tesla",
            content: "Developed embedded systems for autonomous driving technology.",
        },
        {
            title: "Amazon",
            content: "Led a team of developers in building scalable e-commerce platforms.",
        },
    ])

    const [addExpModalView, setAEMview] = useState(false)

    return (
        <section>
            <SceneTitle title='Your Profile' />
            <div className={styles.container}>
                <section className={styles.personal_id}>
                    <div className={styles.prof_pic}>
                        <img src={default_profIcon} className={styles.pic_img} />
                        {/* <button className={styles.pic_edit_btn}> Edit <FontAwesomeIcon icon={faPencil} className='ml-2'/></button> */}
                    </div>
                    <div className={styles.prof_desc}>
                        <div className={styles.desc}>
                            <h1 className={styles.desc_header}>Identification</h1>
                            <p>John Doe, Male, 20</p>
                        </div>
                        <div className={styles.desc}>
                            <h1 className={styles.desc_header}>Current Study</h1>
                            <p>Student at University of Timbuktu, Majoring in Computer Science</p>
                        </div>
                        <div className={styles.desc}>
                            <h1 className={styles.desc_header}>Professions</h1>
                            <p>Computer Scientist, System Analyst, Information Systems Specialist</p>
                        </div>
                        <div className={styles.desc}>
                            <h1 className={styles.desc_header}>Contact information</h1>
                            <ul>
                                <li>Whatsapp: 0123456789</li>
                                <li>Business Email: johndoe@business.org</li>
                                <li>Personal Email: johndoe@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className={styles.exp_section}>
                    <h1 className={styles.exp_header}>My Experiences</h1>
                    <div className={styles.exp_container}>
                        {expData.map(({title, content}, index) => <ExperienceContent key={index} title={title} content={content}/>)}
                        <button className={styles.exp_addBtn} onClick={() => setAEMview(true)}>
                            <div className={styles.exp_addBtnPlus}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <h1>Add more experiences to your profile!</h1>
                        </button>
                    </div>
                </section>
            </div>
            <ModalSetup visible={addExpModalView} onXButton={() => setAEMview(false)} content={<AddExpModal />} title="Add Experience"/>
        </section>
    )
}

const AddExpModal = () => {
    const ContributionInput = () => {
        return (
            <div>
                <button className={styles.btn}>-</button>
                <input className={styles.input} type="text" />
            </div>
        )
    }

    const [contributions, setContributions] = useState(1)
    const styles = {
        form: "flex flex-col",
        input: "bg-[#00000050] border-b-2 mt-2 w-[50vw] px-3 py-2",
        btn: "bg-zinc-600 hover:bg-zinc-500 text-lg transition-colors mx-2 px-2 rounded-md"
    }

    return (
        <div>
            <form className={styles.form}>
                <div className='mb-3'>
                    <label><b>Organization</b></label><br />
                    <input className={styles.input} type="text" />
                </div>
                <div>
                    <label><b>Contributions</b></label>
                    <button className={styles.btn} onClick={() => setContributions(contributions + 1)}>+</button>
                    <br />
                    <div>
                        {Array.from({length: contributions},(_, i) => <ContributionInput key={i}/>)}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileScene