import React, { useState, useEffect } from 'react';
import './ThemeToggle.scss';
import SunIcon from '@/images/icons/icon-sun.svg'; 
import MoonIcon from '@/images/icons/icon-moon.svg';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext); 

    return (
        <div className="theme-toggle" onClick={toggleTheme}>
            <div className={`toggle ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="slider"></div>
                <div className="icons">
                    <img src={SunIcon} alt="Switch to light mode" className={`icon sun ${isDarkMode ? 'visible' : ''}`} />
                    <img src={MoonIcon} alt="Switch to dark mode" className={`icon moon ${!isDarkMode ? 'visible' : ''}`} />
                </div>
            </div>
        </div>
    );
};

export default ThemeToggle;



