import React from 'react';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import "./Layout.scss";
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const Layout = () => {

    const { isDarkMode, toggleTheme } = useContext(ThemeContext); 

    return (
        <>
            <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout
