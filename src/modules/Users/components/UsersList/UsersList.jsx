import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import header2 from "../../../../assets/header-imges/header2.png"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';
import { deleteUserById, getusers } from '../../../../api/modules/users';
import { imagePath } from '../../../../api';
export default function UserList() {
  const [usersList, setUsersList] = useState([]);
    const [show, setShow] = useState(false);
      const [userName, setUserName] = useState("");
        const [userId, setUserId] = useState(0);
      
    const handleClose = () => setShow(false);
    const handleShow = (user) => {
      setUserId(user.id)
      setUserName(user.userName)
      setShow(true)
    };
    const getList = async () => {
        try {
          const response = await getusers();
          console.log(response)
         setUsersList(response.data.data)
    
        } catch (error) {
           const msg = error.response?.data?.message || "Something went wrong!";
              toast.error(msg);
        }
      }
       const deleteUser = async () => {
          try {
            const response = await deleteUserById(userId);
            setUsersList(usersList.filter((user) => user.id != userId));
            toast.success("User Deleted Successfully");
            handleClose();
          } catch (error) {
            toast.error("Failed to delete User");
          }
        }
      useEffect(() => {
        getList();
      },[])
  return (
    <>
     <Header title={"Users List"} descriotion={"You can now add your items that any user can order it from the Application and you can edit"}
            imgUrl={header2}
          />
          <div className='d-flex px-4 py-3 justify-content-between align-items-center'>
        <div >
          <h4>Users Table Details</h4>
          <span>You can check all details</span>
        </div>
      </div>
        <Modal show={show} onHide={handleClose} >
           <Modal.Header  className="border-0 d-flex">
            <button type="button" className="btn-close rounded-4 p-1 ms-auto" 
            onClick={handleClose} aria-label="Close" />
           </Modal.Header>
        <Modal.Body className='text-center px-3 py-2'>
          <DeleteConfirmation deleteItem={"User"} itemName={userName}/>
          
        </Modal.Body>
        <Modal.Footer className="border-0 my-2">
          <Button className='border border-danger text-danger bg-transparent' onClick={deleteUser}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='px-4 py-3'>
             {usersList.length>0? <table className='table' >
      
                <thead className='thead-custom'>
                  
                  <tr>
                    <th scope="col">UserID</th>
                    <th scope="col">UserName</th>
                    <th scope="col">imagePath</th>
                    <th scope="col">email</th>
                    <th scope="col">country</th>
                    <th scope="col">phoneNumber</th>
                    <th scope="col">country</th>
                    <th scope="col">Actions</th>
                  </tr>
               
                </thead>
                
                <tbody className=' border-0'>
                  {usersList.map(user =>
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td  >{user.userName}</td>
                       <td>{user.imagePath?<img className='recipe-img' src={`${imagePath}${user.imagePath}`}
                        alt="user" />:<span>no image Found</span>}</td>
                      <td >{user.email}</td>
                      <td>{user.country}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.country}</td>
                     
                      <td>
                         <i onClick={()=>handleShow(user)} className='fa fa-trash text-danger'></i>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>:<NoData/>}
            </div>
    </>
  )
}
