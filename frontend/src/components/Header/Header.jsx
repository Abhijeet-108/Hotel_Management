import React, { useState } from 'react';
import { Container, LogoutBtn, Logo, DropDownBtn, SearchBtn } from '../index';
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
            slug: "/",
            active: true,
            image:'/home.png',
        },
        { 
            name: 'Experience',
            slug: "/experience",
            active: true,
            image:'experience.jpeg',
        },
        { 
            name: 'Services',
            slug: "/services",
            active: true,
            image:'services.jpeg',
        },
    ]

    return (
        <header className="bg-gray-50 text-black py-2 shadow">
            <Container>
                <nav className="flex  items-center">
                    <div className="mr-2">
                        <Link to="/">
                            <Logo width="120px" />
                        </Link>
                    </div>
                    <ul className='flex gap-4 items-center justify-center flex-1  text-2xl'>
                        {navItems.map((item)=>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                    onClick={() => navigate(item.slug)}
                                    className={`flex items-center px-6 py-2 duration-200 ${location.pathname === item.slug ? 'border-b-2 border-black font-semibold' : ''}`}
                                    >
                                        <img src={item.image} alt={`${item.name} icon`} style={{ width: '30px', height: '30px' , marginRight: '8px' }} />
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                    </ul>
                    <div className="relative flex items-center">
                        <DropDownBtn />
                    </div>
                    
                </nav>
                <div className="flex items-center justify-center mt-2">
                    <SearchBtn />   
                </div>
            </Container>
            
        </header>
    );
}

export default Header;