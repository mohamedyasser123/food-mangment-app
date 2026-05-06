import React from 'react'
import noData from "../../../../assets/no-data.png"
export default function NoData() {
  return (
    <>
      <div className='text-center  p-5'>
        <div className="w-25 mx-auto my-3">
          <img className='img-fluid' src={noData} alt="noData" />
        </div>
        <h3 className="text-muted">No Data !</h3>
        <span className="text-secondary opacity-75">are you sure you want to delete this item ? if you are sure just click on delete it</span>
      </div>

    </>
  )
}
