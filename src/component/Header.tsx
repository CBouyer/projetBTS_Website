import {useNavigate} from "react-router";
import { motion } from "framer-motion";
import logoSite from "./../assets/Logo_Enerdis3-removebg-preview.png"

export const Header = () => {
    const navigate = useNavigate();
    const goToAbout = () => {
        navigate("/about");
    };
    const goToContact = () => {
        navigate("/contact");
    };
    const goToHome = () => {
        navigate("/home");
    };
    return (
        <header>
            <img src={logoSite} className="logo"/>
            <ul className="navlist">
                <motion.li
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 0.8}}
                >
                    <a onClick={goToHome} className="active" >Home</a>
                </motion.li>
                <motion.li
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 0.8}}
                >
                    <a onClick={goToAbout}>About</a>
                </motion.li>
                <motion.li
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 0.8}}
                >
                    <a onClick={goToContact}>Contact</a>
                </motion.li>
                <motion.li
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 0.8}}
                >
                    <a href="/">Déconnexion</a>
                </motion.li>
            </ul>
        </header>
    );
};