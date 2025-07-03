import React from 'react';



function Categories() {
  const categoryGroups = [
      ['Amazing pools', 'Countryside', 'OMG!'],
      ['Arctic', 'Design', 'Tiny homes'],
      ['Camping', 'Earth homes', 'Towers'],
      ['Camper vans', 'Farms', 'Windmills'],
      ['Castles', 'National parks', 'Luxe'],
      ['Containers', 'Vineyards'],
  ];

  return (
    <div className='flex gap-36 p-2 '>
      {categoryGroups.map((group, idx) => (
        <div key={idx} className='flex flex-col space-y-7'>
          {group.map((item, subIdx) => (
            <p key={subIdx} className='text-sm font-sans font-semibold cursor-pointer text-gray-800 '>
              {item}
            </p>
            
          ))}
        </div>
      ))}
    </div>
  );
}

export default Categories;
