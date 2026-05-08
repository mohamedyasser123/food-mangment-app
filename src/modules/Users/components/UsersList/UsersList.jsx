import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import header2 from "../../../../assets/header-imges/header2.png"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';
import { deleteUserById, getusers } from '../../../../api/modules/users';
import { imagePath } from '../../../../api';
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../Shared/components/Pagenation/Pagination';
export default function UserList() {
  const { loginData } = useContext(AuthContext);
  const navigate = useNavigate()
  const [usersList, setUsersList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(0);
  const [showView, setShowView] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchName, setSearchName] = useState("");
  const handleShowView = (user) => {
    setSelectedUser(user);
    setShowView(true);
  };
  const handleClose = () => {
    setShow(false);
    setShowView(false);
  };
  const handleShow = (user) => {
    setUserId(user.id)
    setUserName(user.userName)
    setShow(true)
  };
  const getList = async (pageNo = 1, size = 10, name = searchName) => {
    try {
      const response = await getusers(pageNo, size, name);
      setUsersList(response.data.data)
      setTotalPages(response.data.totalNumberOfPages);
      setCurrentPage(pageNo);

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
    if (loginData?.userGroup === "SystemUser") {
      navigate("/login")
      return;

    }
    getList(1, 10);
  }, [loginData, navigate])
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
      <div className="row my-4 px-4">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control bg-transparent py-2 px-3 rounded-3 border-light-subtle"
            placeholder="Search here ..."

            onChange={(e) => {
              setSearchName(e.target.value);
              getList(1, 10, e.target.value);
            }}
          />
        </div>
      </div>
      {/* --- User View Modal --- */}
      <Modal show={showView} onHide={handleClose} centered>
        <Modal.Header className="border-0">
          <h5 className="modal-title">User Details</h5>
        </Modal.Header>

        <Modal.Body className="text-center px-4 py-3">
          <div className="mb-3">
            <img
              src={selectedUser?.imagePath ? `${imagePath}${selectedUser.imagePath}` : 'default-avatar-url'}
              alt={selectedUser?.userName}
              className="rounded-circle border shadow-sm"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>

          <h3 className="fw-bold text-success mb-2">{selectedUser?.userName}</h3>
          <p className="text-muted mb-3">{selectedUser?.email}</p>

          <div className="text-start bg-light p-3 rounded-3">
            <p className="mb-2"><strong>Phone:</strong> {selectedUser?.phoneNumber || "N/A"}</p>
            <p className="mb-2"><strong>Role:</strong> {selectedUser?.group?.name || "User"}</p>
            <p className="mb-0"><strong>Country:</strong> {selectedUser?.country || "N/A"}</p>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* delete model */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header className="border-0 d-flex">
          <button type="button" className="btn-close rounded-4 p-1 ms-auto"
            onClick={handleClose} aria-label="Close" />
        </Modal.Header>
        <Modal.Body className='text-center px-3 py-2'>
          <DeleteConfirmation deleteItem={"User"} itemName={userName} />

        </Modal.Body>
        <Modal.Footer className="border-0 my-2">
          <Button className='border border-danger text-danger bg-transparent' onClick={deleteUser}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='px-4 py-3'>
        {usersList.length > 0 ? <table className='table table-responsive' >

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
                <td>{user.imagePath ? <img className='recipe-img' src={`${imagePath}${user.imagePath}`}
                  alt="user" /> : <span>no image Found</span>}</td>
                <td >{user.email}</td>
                <td>{user.country}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.country}</td>

                <td>
                  <div className="dropdown">
                    <button
                      className=" border-0  mx-3  bg-transparent"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-ellipsis fs-4"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end px-3 py-2 animate-menu " aria-labelledby="dropdownMenuButton">
                      <li onClick={() => handleShowView(user)} className=' my-2 cursor-pointer'><i className='fa fa-eye text-success'></i>View</li>
                      <li onClick={() => handleShow(user)} className=' my-2 cursor-pointer'><i className='fa fa-trash text-success'></i> Delete</li>
                    </ul>
                  </div>

                  {/*  */}
                </td>
              </tr>
            )}
          </tbody>
        </table> : <NoData />}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => getList(page, 10, searchName)}
        />
      </div>
    </>
  )
}
