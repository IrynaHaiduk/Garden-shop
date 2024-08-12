import React from 'react'
import { Link} from 'react-router-dom';
import logoImg from "../../images/logo.svg";
import "./Navbar.scss";
import MainMenu from '../MainMenu/MainMenu';
import UtilityBar from '../UtilityBar/UtilityBar';


const Navbar = () => {


    return (
        <nav className='navbar'>

            <Link to="/" className='navbar__logo'>
                <img src={logoImg} alt="logo" />
            </Link>

            <h5>Toggler</h5>

            <UtilityBar />

            <MainMenu />


        </nav>
    )
}

export default Navbar
