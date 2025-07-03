import React from 'react'

function UniqueStays() {
    const categoryGroups = [
        ['Yurt Rentals', 'Farm Houses', 'Cottage Rentals'],
        ['Yurt Rentals', 'Farm Cottage', 'Holiday Cottages'],
        ['Castle Rentals', 'Cabin Rentals', 'Mansion Rentals'],
        ['HouseBoats', 'Luxury Cabins', 'Villa Rentals'],
        ['Holiday Caravans', 'Luxury Cabins', 'Holiday Bungalows'],
        ['Private Island Rentals', 'Holiday Chalets'],
    ];
    return (
     <>
        <div className='flex gap-28 p-2'>
        {categoryGroups.map((group, idx) => (
            <div key={idx} className='flex flex-col space-y-7 '>
            {group.map((item, subIdx) => (
                <div className=''>
                    <p key={subIdx} className='text-sm font-sans font-semibold cursor-pointer text-gray-800 '>
                    {item}
                    </p>
                </div>      
            ))}
            </div>
        ))}
        </div>
     </>   
    )
}

export default UniqueStays
