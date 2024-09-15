import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from "@/images/logo.svg";
import "./Navbar.scss";
import MainMenu from '@/components/MainMenu/MainMenu';
import UtilityBar from '@/components/UtilityBar/UtilityBar';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';


const Navbar = () => {

    return (
        <nav className='navbar'>
            <Link to="/" className='navbar__logo'>
                <img src={logoImg} alt="logo" />
            </Link>
            <ThemeToggle />
            <UtilityBar />
            <MainMenu />
        </nav>
    )
}

export default Navbar
