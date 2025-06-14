import React from 'react'
import {userDispatch} from 'react-dom'
import { use } from 'react'

function LogoutBtn() {
    const dispatch = userDispatch()
    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button 
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
