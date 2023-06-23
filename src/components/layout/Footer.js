/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Footer = () => {
    const currentDate = new Date().getFullYear();
    return (
        <div>
            <footer className="fixed bottom-0 footer footer-center p-5 bg-slate-700 text-primary-content mt-8">
                <p>Copyright © {currentDate} - All right reserved</p>
            </footer>
        </div>
    );
}

export default Footer;
