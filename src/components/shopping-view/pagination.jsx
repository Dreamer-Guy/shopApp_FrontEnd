import React from 'react'
import { Button } from '../ui/button';

const Pagination = ({totalProducts, productsPerPage, setCurrentPageNumber, currentPage}) => {
  let pages = [];
  
  for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); ++i){
    pages.push(i);
  }
  
  
  
  return (
    <div className="flex justify-center gap-2">
      {pages.map((page, index) => (
        <Button 
          key={index} 
          variant="outline" 
          size="sm" 
          onClick={() => setCurrentPageNumber(page)}
          className={page === currentPage ? "bg-blue-500 text-white" : ""}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}

export default Pagination;