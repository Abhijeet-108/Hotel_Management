import React from 'react'
import Support from './Support'
import Hosting from './Hosting'
import StayFinder from './StayFinder'

function FooterSection() {
    return (
        <>
            <div className='flex flex-wrap p-3 mt-4 gap-48'>
                <div>
                    <Support />
                </div>
                <div>
                    <Hosting />
                </div>
                <div>
                    <StayFinder />
                </div>
            </div>
        </>
    )
}

export default FooterSection
