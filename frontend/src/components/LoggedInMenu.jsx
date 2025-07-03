import React from 'react';
import { useOtpData } from '../context/OtpContext';

const LOGGED_IN_ITEMS = [
    { 
        name: 'Wishlists',
        slug: "/wishlists",
        active: true,
        image:'/wishlist.png',
    },
    { 
        name: 'Trips',
        slug: "/trips",
        active: true,
        image:'/trips.png',
    },
    { 
        name: 'Messages',
        slug: "/messages",
        active: true,
        image:'/message.png',
    },{ 
        name: 'Profile',
        slug: "/profile",
        active: true,
        image:'/profile.png',
    },
]

const LOGGED_IN_ITEMS1 = [
    { 
        name: 'Notifications',
        slug: "/notifications",
        active: true,
        image:'notification.png',
    },{ 
        name: 'Account settings',
        slug: "/settings",
        active: true,
        image:'setting.png',
    },
    { 
        name: 'Language & currency',
        slug: "/language",
        active: true,
        image:'language.png',
    },
    { 
        name: 'Help Centre',
        slug: "/help",
        active: true,
        image:'help.png',
    },
]

function LoggedInMenu() {
  const { logout } = useOtpData();

  return (
    <>
      {LOGGED_IN_ITEMS.map((item) => (
        <div
          key={item.name}
          className={`flex items-center p-2 duration-200 ${location.pathname === item.slug ? 'border-b-2 border-black font-semibold' : ''} hover:bg-gray-100 rounded-lg cursor-pointer`}
        >
          <span className="flex text-sm font-semibold text-black font-sans hover:bg-gray-100 ">
            <div className="rounded-full flex items-center justify-center mr-2">
                <img src={item.image} alt={`${item.name} icon`} style={{ width: '15px', height: '15px' }} />
            </div>
            {item.name}
            </span>
        </div>
      ))}

      <hr className="my-2" />

      {LOGGED_IN_ITEMS1.map((item) => (
        <div
          key={item.name}
          className={`flex items-center p-2 duration-200 ${location.pathname === item.slug ? 'border-b-2 border-black font-semibold' : ''} hover:bg-gray-100 rounded-lg cursor-pointer`}
        >
          <span className="flex text-sm font-semibold text-black font-sans hover:bg-gray-100  ">
            <div className="rounded-full flex items-center justify-center mr-2">
                <img src={item.image} alt={`${item.name} icon`} style={{ width: '15px', height: '15px' }} />
            </div>
            {item.name}
            </span>
        </div>
      ))}

      <hr className="my-2" />

      <div className="flex  items-center mb-4 p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
        <div>
            <p className=" dtext-sm font-semibold text-black font-sans">Become a host</p>
            <p className="text-sm text-gray-500 font-sans">
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
        <p className="text-sm font-semibold text-black font-sans p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
        Find a co-host
        </p>
        <hr className="my-2" />

      <div
        onClick={logout}
        className="flex items-center p-2 text-sm font-semibold text-black font-sans hover:bg-gray-100 rounded-lg cursor-pointer"
      >
        Log out
      </div>
    </>
  );
}

export default LoggedInMenu;
