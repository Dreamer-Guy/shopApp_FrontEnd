import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductFilter from "@/components/shopping-view/filter"
import ProductCard from "@/components/shopping-view/productCard"
import Pagination from '@/components/shopping-view/pagination';
import { fetchAllProducts } from '@/store/shop/productSlice';
import { sortOptions } from "@/config";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ArrowUpDownIcon } from 'lucide-react';

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector(
    (state) => state.shopProducts
  );
  const [ sort, setSort ] = useState(null);
  const [ searchParams, setSearchParams ] = useSearchParams();

  
  const categorySearchParam = searchParams.get('category');
  
  function handleSort(value) {
    setSort(value);
  }
  
  useEffect(() => {
    setSort('price-lowtohigh');
  }, [categorySearchParam]);
  
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  
  // paging
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  
  const lastPostIndex = currentPage * productsPerPage;
  const firstPostIndex = lastPostIndex - productsPerPage;
  const currentProducts = productList.slice(firstPostIndex, lastPostIndex);
  
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter/>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className='text-muted-foreground'>
              {productList.length} Products
              
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4"/>
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {currentProducts && currentProducts.length > 0
            ? currentProducts.map((productItem) => (
                <ProductCard product={productItem} />
              ))
            : null}
        </div>
        <Pagination
          totalProducts={productList.length}
          productsPerPage={productsPerPage}
          setCurrentPageNumber={setCurrentPage}
          currentPage={currentPage}
        />
      </div> 
    </div>
    
  )
}

export default ShoppingListing;