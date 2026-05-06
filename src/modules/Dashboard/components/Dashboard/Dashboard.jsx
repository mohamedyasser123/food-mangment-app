import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import header1 from "../../../../assets/header-imges/header-girl.png"

export default function Dashboard({loginData}) {
  return (
    <>
    
            <Header title={`Hello ${loginData?.userName}`} descriotion={"This is a welcoming screen for the entry of the application , you can now see the options"}
            imgUrl={header1}
            />
        <div className="container-fluid">
      <div className="row recipe-header rounded-3 justify-content-between align-items-center px-5 py-4 m-3">
        <div className="col-md-5 my-2">
          <h5>Fill the <span className=' text-success' >Recipes !</span></h5>
          <p className=' my-2'>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>

        </div>
        <div className="col-md-4  text-end ">
          <button onClick={()=>navigate('/dashboard/recipes')} className='btn text-white px-5 py-2'>Fill Recipes <i className='fa fa-arrow-right'></i></button>
        </div>
      </div>
       
    </div>
            
            

    </>
  )
}
