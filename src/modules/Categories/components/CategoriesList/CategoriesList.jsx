import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import header2 from "../../../../assets/header-imges/header2.png"
import { axiosClient } from '../../../../api/axiosClient';
import { AddCategories, deleteCategoriesById, getCategories } from '../../../../api/modules/categories';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import { useForm } from 'react-hook-form';

export default function CategoriesList() {
  const [cateygoriesList, setCateygoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
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
  const handleShowAdd = () => setShowAdd(true)
  let { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit =async (data) => {
     try {
      const response = await AddCategories(data);
      console.log(response);
      getList();
    handleCloseAdd()
      toast.success("Category Added Successfully");
      
    } catch (error) {
      toast.error("Failed to added category");
    }

  }
  const getList = async () => {
    try {
      const response = await getCategories();
      setCateygoriesList(response.data.data)
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

  useEffect(() => {
    getList();
  }, [])

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
        <button onClick={handleShowAdd} className='btn text-white px-5 py-2'>Add New  Category </button>
      </div>
      <Modal show={showAdd} onHide={handleCloseAdd} >
        <Modal.Header className="border-0 d-flex px-4 my-2">
          <h4 className='text-muted'>Add Category</h4>
          <button type="button" className="btn-close rounded-4 p-1 ms-auto"
            onClick={handleCloseAdd} aria-label="Close" />
        </Modal.Header>
        <Modal.Body className=' px-3 my-2'>

          <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
            <input {...register('name', { required: "name is required" })} type="text" className="form-control border-0 my-1" placeholder="Category Name " aria-label="Category Name " aria-describedby="basic-addon1" />
            {errors.name && <span className='text-danger'>{errors.name?.message}</span>}
            <div className='d-flex justify-content-end w-100'>
              <button  className='btn text-white px-5 py-2 border-0 my-3' >
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
        {cateygoriesList.length > 0 ? <table className="table">
          <thead>
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
                  <i className='fa fa-edit text-warning mx-2'></i>
                  <i onClick={() => handleShow(item)} className='fa fa-trash text-danger'></i>
                </td>
              </tr>
            )}


          </tbody>
        </table> : <NoData />}
      </div>
    </>
  )
}
