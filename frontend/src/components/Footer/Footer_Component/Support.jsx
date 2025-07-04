import React from 'react'

function Support() {
    const Support_Items = [
        { 
            name: 'Help Centre',
            slug: "/help",
            active: true,
        },
        { 
            name: 'AirCover',
            slug: "/airCover",
            active: true,
        },
        { 
            name: 'Anti-discrimination',
            slug: "/messages",
            active: true,
        },{ 
            name: 'Disability Support',
            slug: "/profile",
            active: true,
        },{
            name: 'Cancellation Options',
            slug: "/profile",
            active: true,
        },{
            name: 'Report neighbourhood concern',
            slug: "/profile",
            active: true,
        }
    ]
    return (
        <>
            <p className='text-sm font-semibold text-black font-sans m-2'>Support</p>
            {Support_Items.map((item) => (
                <div
                key={item.name}
                className={`items-center p-2 duration-200 ${location.pathname === item.slug ? 'border-b-2 border-black font-semibold' : ''} hover:bg-gray-100 rounded-lg cursor-pointer`}
                >
                    <span className="text-sm font-normal text-black font-san hover:underline">
                    {item.name}
                    </span>
                </div>
            ))}
        </>
    )
}

export default Support
