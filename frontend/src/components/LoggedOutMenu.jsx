import React from 'react';
import { Link } from 'react-router-dom';

function LoggedOutMenu() {
  return (
    <>
        <div className="flex items-center mb-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"> 
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-2">
                <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m-12 1h4m-4 4h4m-4 4h12m-4-4l4 4m-4-4l4-4"
                />
                </svg>
            </div>
            <span className="text-lg font-semibold">Help Centre</span>
        </div>

        <div className="flex items-center mb-4 p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
        <div>
            <p className="font-semibold">Become a host</p>
            <p className="text-sm text-gray-500">
            It's easy to start hosting and earn extra income.
            </p>
        </div>
        <div className="ml-2">
            <img
            src="/host.jpg"
            alt="Host"
            className="w-24 h-auto rounded"
            />
        </div>
        </div>

        <hr className="my-2" />
        <p className="font-semibold p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
        Find a co-host
        </p>
        <hr className="my-2" />
        <Link
        to="/login"
        className="font-semibold p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
        Log in or sign up
        </Link>
    </>
  );
}

export default LoggedOutMenu;
