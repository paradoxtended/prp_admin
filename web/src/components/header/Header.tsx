import React, { useState } from "react";
import './header.scss';
import { Navbar } from "../../App";

const Header: React.FC<{ setSearchQuery: Function, navbar: Navbar[], setNavbar: Function }> = ({ setSearchQuery, navbar, setNavbar }) => {
    return (
        <div className="header">
            <div className="logo">
                <p className="title">Administrator Panel</p>
                <p className="description">All Commands</p>
            </div>
            <div className="navbar">
                {navbar.map((nav, index) => (
                    <p 
                    onClick={() => setNavbar((prev: Navbar[]) => prev.map((n) => n.name === nav.name ? { ...n, isActive: true } : { ...n, isActive: false }))} 
                    className={`nav-item ${nav.isActive && `nav-active`}`} key={`nav-${index}`}
                    >
                        {nav?.label || nav.name.toUpperCase()}
                    </p>
                ))}
            </div>
            <div className="search-wrapper">
                <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search"/>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="exit">
                <p>Exit</p>
                <p>ESC</p>
            </div>
        </div>
    )
};

export default Header