import React from 'react'
import Header  from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import HomeContent from '../components/content/HomeContent'

function Home() {
    return (
        <>
            <Header />
            <main>
                <HomeContent />
            </main>
            <Footer />
        </>
    )
}

export default Home
