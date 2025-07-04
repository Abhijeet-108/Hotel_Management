import React from 'react'
import { FiGlobe } from "react-icons/fi";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";

function LastFooterSection() {
    const stayFooter = [
        {
            name : "Privacy",
            slug: "./privacy",
            active: true
        },
        {
            name : "Terms",
            slug: "./terms",
            active: true
        },
        {
            name: "Sitemap",
            slug: "./sitemap",
            active: true
        },
        {
            name: "Company details",
            slug: "./details",
            active: true
        }
    ]
    return (
        <>
            <div className='flex '>
                <div className='text-sm font-medium text-black font-sans p-2 '>&copy; 2025 StayFinder,Inc.</div>
                <div className='flex flex-row flex-wrap'>
                    {stayFooter.map((items) => (
                        <div
                        key={items.name}
                        className={`items-center p-2 duration-200 ${location.pathname === items.slug ? 'border-b-2 border-black font-semibold' : ''} rounded-lg cursor-pointer`}
                        >
                            <span
                            className='text-sm font-medium text-black font-sans hover:underline'
                            >
                                . {items.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div className='absolute right-1 p-2 flex flex-row flex-wrap'>
                    <div className='flex items-center font-sans text-sm font-medium'><FiGlobe className='mx-1' />English(IN)</div>
                    <div className='flex items-center font-sans text-sm font-medium mx-2'><LiaRupeeSignSolid className='mx-1' />INR</div>
                    <div className='flex items-center font-sans text-sm font-medium gap-3 mx-6'>
                        <FaFacebook />
                        <FaXTwitter />
                        <IoLogoInstagram />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LastFooterSection
