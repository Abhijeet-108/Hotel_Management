import React, { useState, useRef } from 'react';
import useOutsideClick from './useOutsideClick';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Uncomment when Auth is ready

function DropDownBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const { isLoggedIn, login, logout } = useAuth(); // Use when Auth available
  const isLoggedIn = false; // Temporary placeholder
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <div className="relative flex items-center justify-between">
      <div>
        <button className="m-2 p-2 text-sm font-semibold">
          Become a host
        </button>
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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-14 right-0 w-64 bg-white rounded-lg shadow-lg p-4 z-10 animate-slideDown">
            {isLoggedIn ? (
              <>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Wishlists</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Trips</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Messages</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Profile</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Notifications</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Account settings</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Help Centre</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Become a host</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Refer a host</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Find a co‑host</span>
                </div>
                <div
                  className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500 font-bold"
                  // onClick={logout}
                >
                  Log out
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Help Centre</span>
                </div>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="font-semibold">Become a host</span>
                  <span className="text-sm text-gray-500 ml-2">
                    It's easy to start hosting and earn extra income.
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-lg font-semibold">Find a co‑host</span>
                </div>
                <hr className="my-2" />
                <Link
                  to="/login"
                  className="font-semibold p-2 hover:bg-gray-100 rounded-lg block cursor-pointer"
                >
                  Log in or sign up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDownBtn;

