import React, { useState, useRef } from 'react';
import useOutsideClick from './useOutsideClick';
import { useOtpData } from '../context/OtpContext';
import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';

function DropDownBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isLoggedIn, user } = useOtpData();
  // console.log(isLoggedIn, user)

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
        className="relative flex items-center justify-between p-3  rounded-full"
      >
        <button
          onClick={toggleDropdown}
          className="focus:outline-none rounded-full"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-2 ">
            {isLoggedIn && (
              user?.profilePicture ? (
                <img src={user.profilePicture} alt={user.fullName || "Profile"} className="w-8 h-8 rounded-full" />
              ) : (
                <span className="font-medium text-black bg-gray-100 p-2 rounded-full">{user?.fullName}</span>
              )
            )}
            <div className=' bg-gray-100 p-2 rounded-full'>
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
          </div>
        </button>
        {isOpen && (
          <div className="absolute top-14 right-5 w-64 bg-white rounded-xl shadow-lg p-4 z-10 hover:shadow-lg transition-shadow duration-300">
            {isLoggedIn ? <LoggedInMenu /> : <LoggedOutMenu />}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDownBtn;
