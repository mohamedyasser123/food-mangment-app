import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Sidebar( ) {
  let navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <div>Sidebar
       <button className='btn btn-primary' onClick={()=>logout()} > Logout</button>
    </div>
   
  )
}
