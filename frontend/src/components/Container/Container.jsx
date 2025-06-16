import React from 'react'

function Container({children}) {
    return (
        <div className='w-full  mx-auto pr-4 pl-4'>
            {children}
        </div>
    )
}

export default Container
