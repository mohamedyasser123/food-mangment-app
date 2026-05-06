import React from 'react'

export default function Header({title,descriotion,imgUrl}) {
  return (
    <div className='header-bg pt-3 px-5 rounded-5 text-white mx-1 '>
      <div className="container-fluid ">
        <div className="row align-items-center ">
          <div className="col-md-8 flex-column justify-content-center">
            <h3>{title}</h3>
            <p className='py-2 w-75'>{descriotion}</p>
            </div>
            <div className="col-md-4 text-end">
              <img className='w-75' src={imgUrl} alt="header1"   />
            </div>
        </div>
      </div>


    </div>
  )
}
