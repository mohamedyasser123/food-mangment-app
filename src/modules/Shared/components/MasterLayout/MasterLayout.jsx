import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'

export default function MasterLayout() {

  return (
    <div className='d-flex vh-100 overflow-hidden'>
        <div className='sidebar-wrapper'>
          <SideBar/>
      </div>
      <div className="w-100 overflow-auto">
        <Navbar />
        <Outlet/>
      </div>

    </div>
  )
}
