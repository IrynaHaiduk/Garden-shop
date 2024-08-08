import React from 'react';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
    return (
        <>
        <div className="wrapper">
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
