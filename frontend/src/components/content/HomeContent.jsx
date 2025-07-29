import React from 'react'

function HomeContent() {
    const Rooms = [
        {
            name: "Home 1",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: 1000,
            rating: 4.5,
            reviews: 100,
            location: "North24 Parganas",
            type: "House",
            capacity: 4,
        },
        {
            name: "Home 2",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: 1000,
            rating: 4,
            reviews: 100,
            location: "North24 Parganas",
            type: "House",
            capacity: 4,
        },
        {
            name: "Home 3",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: 1000,
            rating: 3.5,
            reviews: 100,
            location: "North24 Parganas",
            type: "House",
            capacity: 4,
        },
        {
            name: "Home 4",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: 1000,
            rating: 4.2,
            reviews: 100,
            location: "North24 Parganas",
            type: "House",
            capacity: 4,
        }
    ]
    return (
        <>
            <div className='m-8 '>
                <h1 className='text-xl font-semibold'>Popular homes in {Rooms[0].location}> </h1>
                <div className='flex flex-wrap gap-4 mt-2'>
                    {Rooms.map(room => (
                        <div key={room.name}>
                            <img width={200} height={300} className='rounded-lg' src={room.image} alt={room.name} />
                            <h3 className='text-sm font-semibold'>{room.name}</h3>
                            <p className='text-xs font-semibold text-gray-500'>₹{room.price} for 2 nights.★ {room.rating}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='m-8 '>
                <h1 className='text-xl font-semibold'>Available next month in Darjeeling > </h1>
                <div className='flex flex-wrap gap-4 mt-2'>
                    {Rooms.map(room => (
                        <div key={room.name}>
                            <img width={200} height={300} className='rounded-lg' src={room.image} alt={room.name} />
                            <h3 className='text-sm font-semibold'>{room.name}</h3>
                            <p className='text-xs font-semibold text-gray-500'>₹{room.price} for 2 nights.★ {room.rating}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='m-8 '>
                <h1 className='text-xl font-semibold'>Stay in Bengaluru> </h1>
                <div className='flex flex-wrap gap-4 mt-2'>
                    {Rooms.map(room => (
                        <div key={room.name}>
                            <img width={200} height={300} className='rounded-lg' src={room.image} alt={room.name} />
                            <h3 className='text-sm font-semibold'>{room.name}</h3>
                            <p className='text-xs font-semibold text-gray-500'>₹{room.price} for 2 nights.★ {room.rating}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='m-8 '>
                <h1 className='text-xl font-semibold'>Available in Puri this weekend > </h1>
                <div className='flex flex-wrap gap-4 mt-2'>
                    {Rooms.map(room => (
                        <div key={room.name}>
                            <img width={200} height={300} className='rounded-lg' src={room.image} alt={room.name} />
                            <h3 className='text-sm font-semibold'>{room.name}</h3>
                            <p className='text-xs font-semibold text-gray-500'>₹{room.price} for 2 nights.★ {room.rating}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomeContent
