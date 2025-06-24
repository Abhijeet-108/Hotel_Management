import React, { useState, useRef } from 'react';
import useOutsideClick from './useOutsideClick';
import { useOtpData } from '../context/OtpContext';
import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';

function DropDownBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isLoggedIn, user } = useOtpData();

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <div className="relative flex items-center justify-between">
      <div>
        <button className="m-2 p-2 text-sm font-semibold">Become a host</button>
      </div>
      <div
        ref={dropdownRef}
        className="relative flex items-center justify-between p-3 bg-gray-100 shadow-md rounded-3xl"
      >
        <button
          onClick={toggleDropdown}
          className="focus:outline-none"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-2">
            {isLoggedIn && <span className="font-medium">{user?.name}</span>}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </button>
        {isOpen && (
          <div className="absolute top-14 right-0 w-64 bg-white rounded-lg shadow-lg p-4 z-10 hover:shadow-lg transition-shadow duration-300">
            {isLoggedIn ? <LoggedInMenu /> : <LoggedOutMenu />}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDownBtn;
