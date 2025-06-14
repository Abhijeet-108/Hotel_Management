import React from 'react'

function Input() {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded-md w-full"
        />  
    )
}

export default Input
    