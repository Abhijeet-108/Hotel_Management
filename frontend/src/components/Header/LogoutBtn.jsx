import React from 'react'
import { useDispatch } from 'react-redux'
import { use } from 'react'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button 
        className='font-semibold p-2 hover:bg-gray-100 rounded-lg cursor-pointer'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
