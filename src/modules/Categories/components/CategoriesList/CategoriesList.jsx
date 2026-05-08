import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import header2 from "../../../../assets/header-imges/header2.png"
import { axiosClient } from '../../../../api/axiosClient';
import { AddCategories, deleteCategoriesById, getCategories, updateCategoriesById } from '../../../../api/modules/categories';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import Pagination from '../../../Shared/components/Pagenation/Pagination';

export default function CategoriesList() {
   const{loginData}=useContext(AuthContext);
   const navigate=useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const [cateygoriesList, setCateygoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
     const [totalPages, setTotalPages] = useState(1); 
const [currentPage, setCurrentPage] = useState(1);
  // delete category
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setCategoryId(item.id)
    setCategoryName(item.name)
    setShow(true)
  };
  //add category
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  let { register, formState: { errors }, handleSubmit,setValue } = useForm();
  const [searchName, setSearchName] = useState("");
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updateCategoriesById(categoryId, data);
         getList();
        handleCloseAdd();
        toast.success("Category Updated Successfully");
      } else {
        const response = await AddCategories(data);
        getList();
        handleCloseAdd()
        toast.success("Category Added Successfully");
      }
    } catch (error) {
      console.log(error)
      toast.error(isEditMode ? "Failed to category" : "Failed to added category");
    }
  

  }
  const getList = async (pageNo = 1, pageSize = 10, name = "") => {
    try {
      const response = await getCategories(pageNo, pageSize, name);
      setCateygoriesList(response.data.data)
      setTotalPages(response.data.totalNumberOfPages);
    setCurrentPage(pageNo);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      toast.error(msg);
    }
  }
  const deleteCategory = async () => {
    try {
      const response = await deleteCategoriesById(categoryId);
      setCateygoriesList(cateygoriesList.filter((item) => item.id != categoryId));
      toast.success("Category Deleted Successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  }
const [isEditMode, setIsEditMode] = useState(false);
  
  const handleOpenAdd = () => {
  setIsEditMode(false);
  setCategoryId(0);
  setValue("name", ""); 
  setShowAdd(true);
};

const handleOpenEdit = (category) => {
  setIsEditMode(true);
  setCategoryId(category.id); 
  setValue("name", category.name); 
  setShowAdd(true);
};

  useEffect(() => {
     if(loginData?.userGroup ==="SystemUser"){
        navigate("/login")
        return;

      }
    getList();
  }, [loginData, navigate])

  return (
    <>
      <Header title={"Categories Item"} descriotion={"You can now add your items that any user can order it from the Application and you can edit"}
        imgUrl={header2}
      />
      <div className='d-flex px-4 py-3 justify-content-between align-items-center'>
        <div >
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button onClick={handleOpenAdd} className='btn text-white px-5 py-2'>Add New  Category </button>
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
      <Modal show={showAdd} onHide={handleCloseAdd} >
        <Modal.Header className="border-0 d-flex px-4 my-2">
          <h4 className='text-muted'>{isEditMode ? 'Update Category' : 'Add Category'}</h4>
          <button type="button" className="btn-close rounded-4 p-1 ms-auto"
            onClick={handleCloseAdd} aria-label="Close" />
        </Modal.Header>
        <Modal.Body className=' px-3 my-2'>

          <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
            <input {...register('name', { required: "name is required" })} type="text" className="form-control border-0 my-1" placeholder="Category Name " aria-label="Category Name " aria-describedby="basic-addon1" />
            {errors.name && <span className='text-danger'>{errors.name?.message}</span>}
            <div className='d-flex justify-content-end w-100'>
              <button className='btn text-white px-5 py-2 border-0 my-3' >
                Save
              </button>
            </div>

          </form>
        </Modal.Body>
      </Modal>
      {/* // delete Model */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header className="border-0 d-flex">
          <button type="button" className="btn-close rounded-4 p-1 ms-auto"
            onClick={handleClose} aria-label="Close" />
        </Modal.Header>
        <Modal.Body className='text-center px-3 py-2'>
          <DeleteConfirmation deleteItem={"category"} itemName={categoryName} />

        </Modal.Body>
        <Modal.Footer className="border-0 my-2">
          <Button className='border border-danger text-danger bg-transparent' onClick={deleteCategory}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='px-4 py-3'>
        {cateygoriesList.length > 0 ? <table className="table table-responsive">
          <thead className='thead-custom'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cateygoriesList.map(item =>
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.creationDate}</td>
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
                      <li onClick={() => handleOpenEdit(item)} className=' my-2 cursor-pointer'><i className='fa fa-edit text-success'></i>Edit</li>
                      <li onClick={() => handleShow(item)} className=' my-2 cursor-pointer'><i className='fa fa-trash text-success '></i> Delete</li>
                    </ul>
                  </div>
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
