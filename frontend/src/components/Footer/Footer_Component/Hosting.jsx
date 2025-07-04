import React from 'react'

function Hosting() {
    const Support_Items = [
        { 
            name: 'Stayfinder your home',
            slug: "/help",
            active: true,
        },
        { 
            name: 'StayFinder your experience',
            slug: "/airCover",
            active: true,
        },
        { 
            name: 'Stayfinder your service',
            slug: "/messages",
            active: true,
        },{ 
            name: 'StayCovers for Hosts',
            slug: "/profile",
            active: true,
        },{
            name: 'Community forum',
            slug: "/profile",
            active: true,
        },{
            name: 'Hosting responsibly',
            slug: "/profile",
            active: true,
        },{
            name: 'Join a free Hosting class',
            slug: "/profile",
            active: true,
        },{
            name: 'Find a co-host',
            slug: "/profile",
            active: true,
        }
    ]
    return (
        <>
            <p className='text-sm font-semibold text-black font-sans m-2'>Hosting</p>
            {Support_Items.map((item) => (
                <div
                key={item.name}
                className={`items-center p-2 duration-200 ${location.pathname === item.slug ? 'border-b-2 border-black font-semibold' : ''} hover:bg-gray-100 rounded-lg cursor-pointer`}
                >
                    <span className="text-sm font-normal text-black font-sans hover:underline ">
                    {item.name}
                    </span>
                </div>
            ))}
        </>
    )
}

export default Hosting
