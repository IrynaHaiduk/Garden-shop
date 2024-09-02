import React, { createContext, useState, useEffect } from 'react';


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem("dark-mode")) || false;
    });

    useEffect(() => {
        localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
    }, [isDarkMode]); 

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};





