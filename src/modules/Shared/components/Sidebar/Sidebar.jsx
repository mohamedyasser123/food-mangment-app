import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../../../../assets/sidebar-icon/logo.png"
import category from "../../../../assets/sidebar-icon/catogry-icon.png"
import changePassWord from "../../../../assets/sidebar-icon/change-pass-icon.png"
import logoutIcon from "../../../../assets/sidebar-icon/logout-icon.png"
import recipe from "../../../../assets/sidebar-icon/recpies-icon.png"
import user from "../../../../assets/sidebar-icon/user-icon.png"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noData from "../../../../assets/no-data.png"
import { AuthContext } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { changePassword } from '../../../../api/modules/auth';



export default function SideBar( ) {
  const [showLogout, setShowLogout] = useState(false);
    const{loginData}=useContext(AuthContext);
const handleLogoutShow = () => setShowLogout(true);
const handleLogoutClose = () => setShowLogout(false);
  const [isCollapsed,setIsCollapsed]=useState(false)
  const toggleCollapse=()=>{
    setIsCollapsed(!isCollapsed)
  }
  let navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  const [showChangePass, setShowChangePass] = useState(false);
const handleCloseChangePass = () => setShowChangePass(false);

const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

const onSubmitChangePass = async (data) => {
  try {
     await changePassword(data);
    toast.success("Password changed successfully");
    reset(); 
    handleCloseChangePass();
  } catch (error) {
    toast.error(error.response?.data?.message || "Error changing password");
  }
};
  return (
    <>
    {/* changePassword model */}
<Modal show={showChangePass} onHide={handleCloseChangePass} centered size="md">
      <Modal.Header className="border-0 pb-0">
        <button type="button" className="btn-close ms-auto" onClick={handleCloseChangePass} />
      </Modal.Header>

      <Modal.Body className='px-5 pb-4'>
        <div className="text-center mb-4">
          <img className='img-fluid w-50 mb-3' src={logo} alt="logo" />
          <h4 className="fw-bold mb-1 text-start">Change Your Password</h4>
          <p className="text-muted small text-start">Enter your details below</p>
        </div>
        <form onSubmit={handleSubmit(onSubmitChangePass)}>
          <div className="mb-3 bg-light rounded-3 d-flex align-items-center px-3 border">
            <i className="fa-solid fa-lock text-muted me-2"></i>
            <input 
              type="password"
              {...register("oldPassword", { required: "Old password is required" })}
              className="form-control border-0 bg-transparent py-2 shadow-none" 
              placeholder="Old Password" 
            />
            <i className="fa-regular fa-eye text-muted"></i>
          </div>
          <div className="mb-3 bg-light rounded-3 d-flex align-items-center px-3 border">
            <i className="fa-solid fa-lock text-muted me-2"></i>
            <input 
              type="password"
              {...register("newPassword", { required: "New password is required" })}
              className="form-control border-0 bg-transparent py-2 shadow-none" 
              placeholder="New Password" 
            />
            <i className="fa-regular fa-eye text-muted"></i>
          </div>
          <div className="mb-4 bg-light rounded-3 d-flex align-items-center px-3 border">
            <i className="fa-solid fa-lock text-muted me-2"></i>
            <input 
              type="password"
              {...register("confirmNewPassword", { 
                required: "Please confirm password",
                validate: (value) => value === watch('newPassword') || "Passwords do not match"
              })}
              className="form-control border-0 bg-transparent py-2 shadow-none" 
              placeholder="Confirm New Password" 
            />
            <i className="fa-regular fa-eye text-muted"></i>
          </div>

          <button type="submit" className="btn btn-success w-100 py-2 fw-bold rounded-3 shadow-none" style={{ backgroundColor: '#4CAF50', border: 'none' }}>
            Change Password
          </button>
        </form>
      </Modal.Body>
    </Modal>

     {/* Logout Modal */}
<Modal show={showLogout} onHide={handleLogoutClose} centered>
  <Modal.Header className="border-0 d-flex">
    <button type="button" className="btn-close rounded-4 p-1 ms-auto" 
      onClick={handleLogoutClose} aria-label="Close" />
  </Modal.Header>
  
  <Modal.Body className='text-center px-3 py-4'>
    <div className="mb-3">
       <img className='img-fluid' src={noData} alt="noData" />
    </div>
    <h4>Logout?</h4>
    <p className="text-muted">Are you sure you want to log out?</p>
  </Modal.Body>

  <Modal.Footer className="border-0 my-2 d-flex justify-content-center">
    <Button className='btn border-0 px-5' onClick={() => logout()}>
      Yes, Logout
    </Button>
    <Button className='border border-secondary text-secondary bg-transparent px-3' onClick={handleLogoutClose}>
      Cancel
    </Button>
  </Modal.Footer>
</Modal>
    <div className='sidebar-container'>
      <ProSidebar collapsed={isCollapsed}>
        <div onClick={()=>toggleCollapse()} className="text-center my-4">
           <img className='img-fluid' src={logo} alt='logo' />
        </div>
      {loginData?.userGroup !="SystemUser"?
       <Menu>
    <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
    <MenuItem icon={<img src={user} alt='user-icon'/>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
    <MenuItem icon={<img src={recipe} alt='user-icon'/>} component={<Link to="/dashboard/recipes" />}> Resipes </MenuItem>
    <MenuItem icon={<img src={category} alt='user-icon'/>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
    <MenuItem icon={<img src={changePassWord} alt='user-icon'/>} onClick={() => setShowChangePass(true)}> Change Password </MenuItem>
    <MenuItem icon={<img src={logoutIcon} alt='user-icon'/>} onClick={handleLogoutShow}> Logout </MenuItem>
  </Menu>
      
      :<Menu>
        <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
        <MenuItem icon={<img src={recipe} alt='user-icon'/>} component={<Link to="/dashboard/recipes" />}> Resipes </MenuItem>
        <MenuItem icon={<i className="fa-regular fa-heart"></i>} component={<Link to="/dashboard/favourites" />}> Favourite </MenuItem>
        <MenuItem icon={<img src={changePassWord} alt='user-icon'/>}onClick={() => setShowChangePass(true)}> Change Password </MenuItem>
        <MenuItem icon={<img src={logoutIcon} alt='user-icon'/>} onClick={handleLogoutShow}> Logout </MenuItem>



        </Menu>}
</ProSidebar>
</div>
</>
   
  )
}
