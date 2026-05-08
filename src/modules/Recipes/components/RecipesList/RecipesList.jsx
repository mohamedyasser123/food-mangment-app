import React, { useContext, useEffect, useState } from 'react'
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
import { AuthContext } from '../../../../context/AuthContext';
import { AddToFavourite, getFavList } from '../../../../api/modules/favs';
import Pagination from '../../../Shared/components/Pagenation/Pagination';
export default function RecipesList() {
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [recipId, setRecipId] = useState(0);
  const [recipyName, setRecipName] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showView, setShowView] = useState(false);
  const { loginData } = useContext(AuthContext);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");

  const handleShow = (item) => {
    setRecipId(item.id)
    setRecipName(item.name)
    setShow(true)
  };
  const handleShowView = (item) => {
    setSelectedRecipe(item);
    setShowView(true);
  };
  const handleClose = () => {
    setShowView(false);
    setShow(false);
  };
  const getList = async (pageNo, name, size) => {
    try {
      const response = await getResipes(pageNo, name, size);
      console.log(response.data)
      setRecipesList(response.data.data)
      setArrayOfPages(response.data.totalNumberOfPages);
      setCurrentPage(pageNo);

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
  const AddToFavs = async (id) => {
    try {
      const favResponse = await getFavList();
      const currentFavs = favResponse.data.data;
      const isExist = currentFavs.some(fav => fav.recipe.id === id);

      if (isExist) {
        toast.info("favourite is Alreadt exist");
        return;
      }
      const response = await AddToFavourite({

        "recipeId": id

      });
      toast.success("favourite Add Successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to Add favourite");
    }


  }
  useEffect(() => {
    getList(1, searchName, 10);
  }, [])
  return (
    <>
      {loginData?.userGroup != "SystemUser" ? <>
        <Header title={"Recipes Items"} descriotion={"You can now add your items that any user can order it from the Application and you can edit"}
          imgUrl={header2}
        />
        <div className='d-flex px-4 py-3 justify-content-between align-items-center'>
          <div >
            <h4>Recipe Table Details</h4>
            <span>You can check all details</span>
          </div>
          <button onClick={() => navigate('/dashboard/recipe-data')} className='btn text-white px-5 py-2'>Add New Item </button>
        </div></> : <></>}
      <div className="row my-4 px-4">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control bg-transparent py-2 px-3 rounded-3 border-light-subtle"
            placeholder="Search here ..."

            onChange={(e) => {
              setSearchName(e.target.value);
              getList(1, e.target.value, 10);
            }}
          />
        </div>
      </div>
      {/* ///view model  */}
      <Modal show={showView} onHide={handleClose} centered>
        <Modal.Header className="border-0">
          <h5 className="modal-title">Recipe Details</h5>
        </Modal.Header>

        <Modal.Body className="text-center px-4 py-3">
          <div className="mb-3">
            <img
              src={`${imagePath}${selectedRecipe?.imagePath}`}
              alt={recipyName}
              className="rounded-circle border shadow-sm"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
          <h3 className="fw-bold text-success mb-2">{recipyName}</h3>
          <p className="text-muted mb-3">{selectedRecipe?.description}</p>

          <div className="text-start bg-light p-3 rounded-3">
            <p><strong>Category:</strong> {selectedRecipe?.category?.[0]?.name}</p>
            <p><strong>Tag:</strong> {selectedRecipe?.tag?.name}</p>
            <p><strong>Price:</strong> {selectedRecipe?.price} EGP</p>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <button onClick={() => AddToFavs(selectedRecipe.id)} className=' border-secondary bg-transparent  border-1 px-3 py-2 rounded-3 '><i className=' fa-regular fa-heart mx-2'></i>Add To Favorite</button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* // delete Model */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header className="border-0 d-flex">
          <button type="button" className="btn-close rounded-4 p-1 ms-auto"
            onClick={handleClose} aria-label="Close" />
        </Modal.Header>
        <Modal.Body className='text-center px-3 py-2'>
          <DeleteConfirmation deleteItem={"recipe"} itemName={recipyName} />

        </Modal.Body>
        <Modal.Footer className="border-0 my-2">
          <Button className='border border-danger text-danger bg-transparent' onClick={deleteRecipe}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='px-4 py-3'>
        {recipesList.length > 0 ? <table className="table table-responsive">
          <thead className='thead-custom'>
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
                <td>{item.imagePath ? <img className='recipe-img' src={`${imagePath}${item.imagePath}`}
                  alt="Recipe" /> : <span>no image Found</span>}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.tag?.name}</td>
                <td>
                  {item.category[0]?.name}
                </td>
                <td>
                  {loginData?.userGroup != "SystemUser" ? <div className="dropdown">
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
                      <li onClick={() => handleShowView(item)} className=' my-2 cursor-pointer'><i className='fa fa-eye text-success'></i>View</li>
                      <li onClick={() => navigate(`/dashboard/recipe-data/${item.id}`)} className=' my-2 cursor-pointer'><i className='fa fa-edit text-success'></i>Edit</li>
                      <li onClick={() => handleShow(item)} className=' my-2 cursor-pointer'><i className='fa fa-trash text-success '></i> Delete</li>
                    </ul>
                  </div> : <i onClick={() => handleShowView(item)} className='fa fa-eye text-success'></i>}
                </td>
              </tr>
            )}
          </tbody>
        </table> : <NoData />}
        <Pagination
          totalPages={arrayOfPages}
          currentPage={currentPage}
          onPageChange={(page) => getList(page, searchName, 10)}
        />
      </div>
    </>
  )
}
