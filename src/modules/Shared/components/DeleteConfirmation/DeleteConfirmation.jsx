import React from 'react'
import noData from "../../../../assets/no-data.png"

export default function ({deleteItem,itemName}) {
  return (
    <>
      <div className="w-25 mx-auto my-3">
            <img className='img-fluid' src={noData} alt="noData" />
          </div>
          <h5 className="text-muted">Delete This {deleteItem} ?</h5>
          <span className="text-secondary opacity-75">are you sure you want to delete this {itemName} ? if you are sure just click on delete it</span>
    </>
  )
}
