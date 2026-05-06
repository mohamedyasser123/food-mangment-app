import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'

export default function MasterLayout({loginData}) {
  return (
    <div className='d-flex min-vh-100'>
      <div>
        <div className='sidebar-wrapper flex-shrink-0'>
          <SideBar/>
        </div>
      
      </div>
      <div className="w-100">
        <Navbar loginData={loginData}/>
        <Outlet/>
      </div>

    </div>
  )
}
