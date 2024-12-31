import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductFilter from "@/components/shop/filter"
import ProductCard from "@/components/shop/productCard"
import PaginationSection from '@/components/shop/pagination'
import { sortOptions } from "@/config"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDownIcon } from 'lucide-react'

const ShoppingHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('price-lowtohigh');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: Number.MAX_VALUE,
    sortBy: 'createdAt-desc'
  });
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/products/all`, {
          params: {
            page: currentPage,
            rowPerPage: 2,
            sort: filters.sortBy,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            category: filters.category
          },
          withCredentials: true
        });
        
        if (response.data.products) {
          setProducts(response.data.products);
          setTotalProducts(response.data.totalProducts || response.data.products.length);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, filters]);

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
      ))}
    </div>
  );

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter/>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Best Products</h2>
          <div className="flex items-center gap-3">
            <span className='text-muted-foreground'>
              {totalProducts} Products
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
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
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
          {products.map((product) => (
            <ProductCard product={product} key={product._id}/>
          ))}
        </div>
        <PaginationSection
          totalProducts={totalProducts}
          productsPerPage={8}
          setCurrentPageNumber={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default ShoppingHome