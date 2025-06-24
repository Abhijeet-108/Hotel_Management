import React from 'react';
import { useOtpData } from '../context/OtpContext';

const LOGGED_IN_ITEMS = [
    { 
        name: 'Wishlists',
        slug: "/wishlists",
        active: true,
        image:'/home.png',
    },
    { 
        name: 'Trips',
        slug: "/trips",
        active: true,
        image:'experience.jpeg',
    },
    { 
        name: 'Messages',
        slug: "/messages",
        active: true,
        image:'services.jpeg',
    },{ 
        name: 'Profile',
        slug: "/profile",
        active: true,
        image:'services.jpeg',
    },{ 
        name: 'Notifications',
        slug: "/notifications",
        active: true,
        image:'services.jpeg',
    },{ 
        name: 'Account settings',
        slug: "/settings",
        active: true,
        image:'services.jpeg',
    },{ 
        name: 'Help Centre',
        slug: "/help",
        active: true,
        image:'services.jpeg',
    },{ 
        name: 'Become a host',
        slug: "/become_host",
        active: true,
        image:'services.jpeg',
    },{ 
        name: 'Refer a host',
        slug: "/refer_host",
        active: true,
        image:'services.jpeg',
    },{ 
        name: 'Find a co‑host',
        slug: "/find",
        active: true,
        image:'services.jpeg',
    },
]

function LoggedInMenu() {
  const { logout } = useOtpData();

  return (
    <>
      {LOGGED_IN_ITEMS.map((item) => (
        <div
          key={item.name}
          className={`flex items-center mb-1 mt-1 p-1 duration-200 ${location.pathname === item.slug ? 'border-b-2 border-black font-semibold' : ''} hover:bg-gray-100 `}
        >
          <span className="flex text-sm font-medium text-gray-400 hover:bg-gray-100 ">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <img src={item.image} alt={`${item.name} icon`} />
            </div>
            {item.name}
            </span>
        </div>
      ))}

      <hr className="my-2" />

      <div
        onClick={logout}
        className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer font-medium"
      >
        Log out
      </div>
    </>
  );
}

export default LoggedInMenu;
