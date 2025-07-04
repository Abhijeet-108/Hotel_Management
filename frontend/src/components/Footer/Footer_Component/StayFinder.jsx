import React from 'react'

function StayFinder() {
    const Support_Items = [
        { 
            name: '2025 Summer Release',
            slug: "/help",
            active: true,
        },
        { 
            name: 'Newsroom',
            slug: "/airCover",
            active: true,
        },
        { 
            name: 'Careers',
            slug: "/careers",
            active: true,
        },{ 
            name: 'Investors',
            slug: "/investors",
            active: true,
        },{
            name: 'Stayfinder.org emergency stays',
            slug: "/profile",
            active: true,
        }
    ]
    return (
        <>
            <p className='text-sm font-semibold text-black font-sans m-2'>StayFinder</p>
            {Support_Items.map((item) => (
                <div
                key={item.name}
                className={`items-center p-2 duration-200 ${location.pathname === item.slug ? 'border-b-2 border-black font-semibold' : ''} rounded-lg cursor-pointer`}
                >
                    <span className="text-sm font-normal text-black font-sans hover:underline">
                    {item.name}
                    </span>
                </div>
            ))}
        </>
    )
}

export default StayFinder
