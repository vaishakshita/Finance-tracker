"use client"

import React from 'react'
import Sidebar from '../components/Sidebar'
import BottomNavbar from '../components/BottomNavbar'
import MobileNavbar from '../components/MobileNavbar'

const layout = ({ children }) => {

  return (
    <>
      <div className='hidden lg:block'>
        <Sidebar />
      </div>
      <div className='lg:hidden'>
        <BottomNavbar />
        <MobileNavbar />
      </div>


      <div className="px-3 ml-0 lg:ml-60 pt-20 pb-24 lg:pt-6 lg:pb-6">
        {children}
      </div>
    </>


  )
}

export default layout
