import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../../../../assets/sidebar-icon/logo.png"
import category from "../../../../assets/sidebar-icon/catogry-icon.png"
import changePassWord from "../../../../assets/sidebar-icon/change-pass-icon.png"
import logoutIcon from "../../../../assets/sidebar-icon/logout-icon.png"
import recipe from "../../../../assets/sidebar-icon/recpies-icon.png"
import user from "../../../../assets/sidebar-icon/user-icon.png"


export default function SideBar( ) {
  const [isCollapsed,setIsCollapsed]=useState(false)
  const toggleCollapse=()=>{
    setIsCollapsed(!isCollapsed)
  }
  let navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <div className='sidebar-container vh-100 sticky-top'>
      <ProSidebar collapsed={isCollapsed}>
        <div onClick={()=>toggleCollapse()} className="text-center my-4">
           <img className='img-fluid' src={logo} alt='logo' />
        </div>
       
  <Menu>
    <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
    <MenuItem icon={<img src={user} alt='user-icon'/>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
    <MenuItem icon={<img src={recipe} alt='user-icon'/>} component={<Link to="/dashboard/recipes" />}> Resipes </MenuItem>
    <MenuItem icon={<img src={category} alt='user-icon'/>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
    <MenuItem icon={<img src={changePassWord} alt='user-icon'/>} component={<Link to="/documentation" />}> Change Password </MenuItem>
    <MenuItem icon={<img src={logoutIcon} alt='user-icon'/>} onClick={()=>logout()}> Logout </MenuItem>
  </Menu>
</ProSidebar>
</div>
   
  )
}
