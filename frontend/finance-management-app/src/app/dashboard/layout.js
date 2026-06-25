"use client"

import React from 'react'

const layout = ({children}) => {

  return (
    <div className="flex">
      {/* main content */}
      <div className="p-6 w-full h-screen transition-all ml-60">{children}</div>
    </div>
  )
}

export default layout
