import React from 'react'
import { useState, useRef } from 'react';
import useOutsideClick from './useOutsideClick';
import { use } from 'react';

function DropDownBtn() {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef();

    useOutsideClick(dropdownRef, () => setIsOpen(false));

    const toggleDropdown = () => {
    setIsOpen(!isOpen);
    };
      
    return (
        <div className='relative flex items-center justify-between'>
            <div >
                <button className='m-2 p-2 text-sm font-semibold'>Become a host</button>
            </div>
            <div className="relative flex items-center justify-between p-3 bg-gray-100 shadow-md rounded-3xl">
                <button onClick={toggleDropdown} className="focus:outline-none" ref={dropdownRef}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute top-14 right-0 w-64 bg-white rounded-lg shadow-lg p-4 z-10 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-3 p-2 hover:bg-gray-100  rounded-lg cursor-pointer">
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m-12 1h4m-4 4h4m-4 4h12m-4-4l4 4m-4-4l4-4"></path>
                        </svg>
                        </div>
                        <span className="text-lg font-semibold">Help Centre</span>
                    </div>
                    <div className="flex items-center mb-4 p-2 hover:bg-gray-100 cursor-pointer">
                        <div>
                            <p className="font-semibold">Become a host</p>
                            <p className="text-sm text-gray-500">It's easy to start hosting and earn extra income.</p>
                        </div>
                        <div className="ml-2">
                            <img src="../../public/host.jpg" width={'100px'} height={'10px'} alt="" />
                        </div>
                    </div>
                    <hr className="my-2" />
                    <p className="font-semibold p-2 hover:bg-gray-100  mb-2 cursor-pointer">Refer a host</p>

                    <p className="font-semibold mb-2 p-2 hover:bg-gray-100 cursor-pointer">Find a co-host</p>
                    <hr className="my-2" />
                    <p className="font-semibold p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={navigator('/login')}
                    >Log in or sign up</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropDownBtn