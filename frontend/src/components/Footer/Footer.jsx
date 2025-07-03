import React, { useState } from 'react'
import UniqueStays from './Footer_Component/UniqueStays'
import Categories from './Footer_Component/Categories'
import FooterSection from './Footer_Component/FooterSection'

function Footer() {
    const [activeTab, setActiveTab] = useState("unique stay")

    return (
        <footer className='bg-[#f1f1f1] p-6'>
            <h1 className='font-sans font-medium text-2xl mb-3'>Inspiration for future gateways</h1>
            <div>
                <div className="flex items-center space-x-4 mb-6 cursor-pointer border-b-2 ">
                    <div
                    onClick={() => setActiveTab("unique stay")}
                    className={`font-semibold font-sans text-sm transition p-2 ${
                        activeTab === "unique stay"
                        ? " text-black border-b-2 border-black "
                        : " text-gray-400"
                    }`}
                    >
                    Unique Stays
                    </div>
                    <div
                    onClick={() => setActiveTab("categories")}
                    className={`font-semibold font-sans text-sm transition p-2 ${
                        activeTab === "categories"
                        ? " text-black border-b-2 border-black"
                        : " text-gray-400"
                    }`}
                    >
                    Categories
                    </div>
                </div>

                <div className="p-2 rounded-lg mb-4">
                    {activeTab === "unique stay" && (
                    <div>
                        <UniqueStays />
                    </div>
                    )}
                    {activeTab === "categories" && (
                    <div>
                        <Categories />
                    </div>
                    )}
                </div>
            </div>
            <div className='mt-6 pt-3 mb-2 border-b-2'>
                <FooterSection />
            </div>
            <div>

            </div>
        </footer>
    )
}

export default Footer
