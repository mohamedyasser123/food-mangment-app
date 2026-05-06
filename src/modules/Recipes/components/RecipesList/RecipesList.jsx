import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import header2 from "../../../../assets/header-imges/header2.png"
import { deleteResipesById, getResipes } from '../../../../api/modules/resipes';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import { imagePath } from '../../../../api';
import { useNavigate } from 'react-router-dom';
export default function RecipesList() {
  const navigate=useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [recipId, setRecipId] = useState(0);
  const [recipyName, setRecipName] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (item) => {
      setRecipId(item.id)
      setRecipName(item.name)
      setShow(true)
    };
  const getList = async () => {
    try {
      const response = await getResipes();
      setRecipesList(response.data.data)

    } catch (error) {
       const msg = error.response?.data?.message || "Something went wrong!";
          toast.error(msg);
    }
  }
   const deleteRecipe = async () => {
      try {
        const response = await deleteResipesById(recipId);
        setRecipesList(recipesList.filter((item) => item.id != recipId));
        toast.success("Recipe Deleted Successfully");
        handleClose();
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  useEffect(() => {
    getList();
  },[])
  return (
    <>
      <Header title={"Recipes Items"} descriotion={"You can now add your items that any user can order it from the Application and you can edit"}
        imgUrl={header2}
      />
      <div className='d-flex px-4 py-3 justify-content-between align-items-center'>
        <div >
          <h4>Recipe Table Details</h4>
          <span>You can check all details</span>
        </div>
        <button onClick={()=>navigate('/dashboard/recipe-data')} className='btn text-white px-5 py-2'>Add New Item </button>
      </div>
      {/* // delete Model */}
      <Modal show={show} onHide={handleClose} >
           <Modal.Header  className="border-0 d-flex">
            <button type="button" className="btn-close rounded-4 p-1 ms-auto" 
            onClick={handleClose} aria-label="Close" />
           </Modal.Header>
        <Modal.Body className='text-center px-3 py-2'>
          <DeleteConfirmation deleteItem={"recipe"} itemName={recipyName}/>
          
        </Modal.Body>
        <Modal.Footer className="border-0 my-2">
          <Button className='border border-danger text-danger bg-transparent' onClick={deleteRecipe}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='px-4 py-3'>
       {recipesList.length>0? <table className="table">
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">tag</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipesList.map(item =>
              <tr key={item.id}>
                <th scope="row">{item.name}</th>
                <td>{item.imagePath?<img className='recipe-img' src={`${imagePath}${item.imagePath}`}
                  alt="Recipe" />:<span>no image Found</span>}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.tag?.name}</td>
                <td>
                  {item.category[0]?.name}
                </td>
                <td>
                  <i onClick={() => navigate(`/dashboard/recipe-data/${item.id}`)}className='fa fa-edit text-warning mx-2'></i>
                   <i onClick={()=>handleShow(item)} className='fa fa-trash text-danger'></i>
                </td>
              </tr>
            )}
          </tbody>
        </table>:<NoData/>}
      </div>
    </>
  )
}
