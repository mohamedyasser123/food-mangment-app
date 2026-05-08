import React from 'react'
import logo1 from "../../../../assets/logo1.png"
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <>

      <div className='not-found-bg vh-100 w-100 px-5 '>
        <div className='d-flex flex-column vh-100'>

          <div className='mt-5 align-self-start'><img className=' mb-5' src={logo1} alt=" food recipe" /></div>
          <div className='flex-grow-1 d-flex flex-column justify-content-center'>
            <h2 className="fw-bold">Oops.</h2>
            <h2 className='text-success fw-bold'>Page not found</h2>
            <p>This Page doesn’t exist or was removed! We suggest you  back to home.</p>
            <button onClick={() => navigate('/dashboard')} className='btn fw-semibold px-3 py-3 text-white'> Back To Home <br /><i className=' fa fa-backward'> </i></button>
          </div>
        </div>
      </div>


    </>
  )
}
