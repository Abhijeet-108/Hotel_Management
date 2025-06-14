import React, { useState } from 'react';
import { Container, LogoutBtn, Logo, DropDownBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { 
            name: 'Home',
            slug: "/home",
            active: true,
            image:'../../../public/home.png',
        },
        { 
            name: 'Experience',
            slug: "/experience",
            active: true,
            image:'../../../public/experience.jpeg',
        },
        { 
            name: 'Services',
            slug: "/services",
            active: true,
            image:'../../../public/services.jpeg',
        },
    ]

    return (
        <header className="bg-white text-black py-2 shadow">
            <Container>
                <nav className="flex items-center ">
                    <div className="mr-2">
                        <Link to="/">
                            <Logo width="120px" />
                        </Link>
                    </div>
                    <ul className='flex gap-4 items-center justify-center flex-1'>
                        {navItems.map((item)=>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                    onClick={() => navigate(item.slug)}
                                    className={`flex items-center px-6 py-2 duration-200 ${location.pathname === item.slug ? 'border-b-2 border-black' : ''}`}
                                    >
                                        <img src={item.image} alt={`${item.name} icon`} style={{ width: '20px', marginRight: '8px' }} />
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                    <div className="relative flex items-center">
                        <DropDownBtn />
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Header;