import { Anchor, UnstyledButton } from '@mantine/core'
import styles from '../styles/sass/nav.module.scss'
import { BsGithub,BsLinkedin } from 'react-icons/bs'
import { BiMenu } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { useEffect, useState } from 'react'

export const Nav = ({awayFromTop}:{awayFromTop:boolean}) => {

    const [menuOpen,setMenuOpen] = useState(false)

    const openMenu = () => setMenuOpen(!menuOpen)



    return (
        <div className={`${styles.nav} ${menuOpen && styles.open} ${awayFromTop && styles.navBorder}`}>
            <UnstyledButton aria-label="menu button" onClick={openMenu} className={styles.hamburger}>{menuOpen ? <IoMdClose color={'grey'} size={24}/> :<BiMenu color={'gray'} size={24}/>}</UnstyledButton>
            <div className={`${styles.section} ${menuOpen && styles.show}`}>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </div>
            <div className={`${styles.section} ${menuOpen && `${styles.show} ${styles.icons}`}`}>
                <Anchor href="https://github.com/callummclu">
                    <BsGithub aria-label="github" color={'gray'} size={18}/>
                </Anchor>
                <Anchor href="https://www.linkedin.com/in/callummclu/">
                    <BsLinkedin aria-label="linkedin" color={'gray'} size={18}/>
                </Anchor>
            </div>
        </div>
    )
}