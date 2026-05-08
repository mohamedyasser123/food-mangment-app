import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { deleteFromFavourite, getFavList } from '../../../../api/modules/favs';
import { toast } from 'react-toastify';
import Header from '../../../Shared/components/Header/Header';
import header2 from "../../../../assets/header-imges/header2.png"
import NoData from '../../../Shared/components/NoData/NoData';
import { imagePath } from '../../../../api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import Pagination from '../../../Shared/components/Pagenation/Pagination';
export default function FavList() {
  const [favList, setFavList] = useState([]);
    const{loginData}=useContext(AuthContext);
     const [show, setShow] = useState(false);
     const [favId, setFavId] = useState(null);
     const [totalPages, setTotalPages] = useState(1);
     const [currentPage, setCurrentPage] = useState(1); 
const [favName, setFavName] = useState("");
const handleClose = () => setShow(false);

const handleShow = (id, name) => {
  setFavId(id);
  setFavName(name);
  setShow(true);
};
    const navigate=useNavigate()

     const getList = async (pageNo = 1, size = 10) => {
        try {
          const response = await getFavList(pageNo, size);          
          setFavList(response.data.data)
          setTotalPages(response.data.totalNumberOfPages); 
    setCurrentPage(pageNo);
    
        } catch (error) {
          const msg = error.response?.data?.message || "Something went wrong!";
          toast.error(msg);
        }
      }
        const deleteFav = async (id) => {
          try {
            const response = await deleteFromFavourite(favId);
            toast.success("favourite Deleted Successfully");
            getList();
            handleClose();
          } catch (error) {
            console.log(error)
            toast.error("Failed to delete favourite");
          }
        }
    useEffect(()=>{
      if(loginData?.userGroup !="SystemUser"){
        navigate("login")

      }
       getList(1, 10);

    },[])

  return (
    <div>
      <Header title={"Favorite Items"} descriotion={"You can now add your items that any user can order it from the Application and you can edit"}
              imgUrl={header2}
            />
             <Modal show={show} onHide={handleClose} >
        <Modal.Header className="border-0 d-flex">
          <button type="button" className="btn-close rounded-4 p-1 ms-auto"
            onClick={handleClose} aria-label="Close" />
        </Modal.Header>
        <Modal.Body className='text-center px-3 py-2'>
          <DeleteConfirmation deleteItem={"favourite"} itemName={favName} />

        </Modal.Body>
        <Modal.Footer className="border-0 my-2">
          <Button className='border border-danger text-danger bg-transparent' onClick={deleteFav}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
     {favList.length>0?<div className="container">
        <div className="row">
          <div  className="row g-4">
            {favList.map((fav)=>
          <div key={fav.id} className="col-md-4 col-lg-3">
      
        <div className="card h-100 border-0 shadow-sm rounded-4 position-relative overflow-hidden">
          
          <div className="position-absolute" style={{ top: '15px', right: '15px', zIndex: '10' }}>
            <div className="bg-white rounded-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '30px', height: '30px' }}>
              <i onClick={() => handleShow(fav.id, fav.recipe.name)} className='fa fa-trash text-danger '></i>
            </div>
          </div>
          <div className="p-2">
             {fav.recipe?.imagePath ? (
                <img 
                  src={`${imagePath}/${fav.recipe.imagePath}`} 
                  className="card-img-top rounded-4" 
                  alt={fav.recipe.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              ) : (
                <div className="bg-light rounded-4 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                  <span className="text-muted small">No Image</span>
                </div>
              )}
          </div>
          <div className="card-body pt-0 text-start">
            <h5 className="card-title fw-bold h6 mb-1">{fav.recipe?.name || "Pasta"}</h5>
            <p className="card-text text-muted small mb-0" style={{ fontSize: '12px' }}>
              {fav.recipe?.description || "Lorem ipsum dolor, sit Lorem ipsum dolor, sit"}
            </p>
          </div>
          
        </div>

      </div>)}
          </div>
        </div>
      </div>:<NoData/>}
       <Pagination 
                      totalPages={totalPages} 
                      currentPage={currentPage} 
                      onPageChange={(page) => getList(page, 10)} 
                    />
    </div>
  )
}
