import React, { useContext } from 'react'
import avatar from '../../../../assets/avatar.png'
import arrow from "../../../../assets/navbar-icons/down_arrow.png"
import notifi from "../../../../assets/navbar-icons/Notif-Icon.png"
import { AuthContext } from '../../../../context/AuthContext';

export default function Navbar() {
    const{loginData}=useContext(AuthContext);

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
   
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav  ms-auto mb-2 mb-lg-0 d-flex align-items-center ">
         <li className="nav-item mx-3">
          <img src={avatar} alt="my profile" />
        </li>
        <li className="nav-item mx-3">
          {loginData?.userName}
        </li>
        <li className="nav-item mx-3">
          <img src={arrow} alt="arrow" />
        </li>
        <li className="nav-item mx-3">
           <img src={notifi} alt="notifi" />
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
