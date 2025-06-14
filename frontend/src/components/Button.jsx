import React from 'react'

function Button({ children, onClick }) {
    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
