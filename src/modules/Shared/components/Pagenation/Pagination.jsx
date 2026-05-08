import React from 'react'

export default function Pagination({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav aria-label="Page navigation" className="my-4 d-flex justify-content-center">
      <ul className="pagination pagination-md border rounded-3 shadow-sm overflow-hidden">
        
       <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
  <button 
    type="button"
    className="page-link border-0 text-dark bg-light px-3 py-2" 
    onClick={() => { if(currentPage > 1) onPageChange(currentPage - 1) }}
  >
    Previous
  </button>
</li>
       {pages.filter(page => page === currentPage).map((page) => (
  <li key={page} className="page-item active">
    <button 
      type="button"
      className="page-link bg-success text-white border-success px-3 py-2"
      onClick={() => onPageChange(page)}
    >
      {page}
    </button>
  </li>
))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
  <button 
    type="button"
    className="page-link border-start border-0 text-dark bg-light px-3 py-2" 
    onClick={() => { if(currentPage < totalPages) onPageChange(currentPage + 1) }}
  >
    Next
  </button>
</li>
      </ul>
    </nav>
  )
}
