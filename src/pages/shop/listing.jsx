import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductFilter from "@/components/shop/filter"
import ProductCard from "@/components/shop/productCard"
import PaginationSection from '@/components/shop/pagination';
import { fetchAllFilteredProducts } from '@/store/shop/productSlice/index';
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
import { FilterIcon } from 'lucide-react';


function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
        const formatParam = key === "Price" ? "priceRange" : key.charAt(0).toLowerCase() + key.slice(1);
        
        if (Array.isArray(value) && value.length > 0) {
          const paramValue = value.join(",");

          queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }

    // console.log(queryParams, "queryParams");

    return queryParams.join("&");
}

const ShoppingListing = () => {
    const dispatch = useDispatch();
    const { productList, loading } = useSelector((state) => state.shopProducts);
    const [ sort, setSort ] = useState('price-desc');
    const [ filters, setFilters ] = useState({});
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ productsPerPage, setProductsPerPage ] = useState(8);
    const [ showFilter, setShowFilter ] = useState(false);

    useEffect(() => {
        const savedSort = sessionStorage.getItem('sort');
        if (savedSort) {
        setSort(savedSort);
        }
    }, []);
    
    
    function handleSort(value) {
        setSort(value);
        sessionStorage.setItem('sort', value);
    }
    
    function handleFilter(getSectionId, getCurrentOption) {
        let cpyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption],
            };
        } else {
            const indexOfCurrentOption =
                cpyFilters[getSectionId].indexOf(getCurrentOption);

            if (indexOfCurrentOption === -1)
                cpyFilters[getSectionId].push(getCurrentOption);
            else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
        
        // console.log(cpyFilters);
        setFilters(cpyFilters);
        setCurrentPage(1);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }
    // console.log(filters, searchParams, "filters");
    
    useEffect(() => {
        setSort(sessionStorage.getItem('sort') || 'price-desc');
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    }, []);
    
    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
        const createQueryString = createSearchParamsHelper(filters);
        setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters]);
    
    
    
    useEffect(() => {
        if (filters !== null && sort !== null) {
            dispatch(
                fetchAllFilteredProducts({ 
                    filterParams: filters, 
                    sortParams: sort,
                    page: currentPage,
                    rowsPerPage: productsPerPage 
                })
            );
        }
    }, [dispatch, filters, sort, currentPage]);
    
    
    const lastPostIndex = currentPage * productsPerPage;
    const firstPostIndex = lastPostIndex - productsPerPage;
    
    
    return (
        <div className='container mx-auto px-4'>
            <div className='flex flex-col lg:grid lg:grid-cols-[200px_1fr] gap-6 py-6'>
                <div className="lg:hidden">
                    <div className="bg-background rounded-lg shadow-sm mb-4">
                        <div className="p-4 border-b flex justify-between items-center">
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setShowFilter(!showFilter)}
                                className="flex items-center gap-2"
                            >
                                <FilterIcon className="h-4 w-4" />
                                {showFilter ? 'Hide Filters' : 'Show Filters'}
                            </Button>
                        </div>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out
                            ${showFilter ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-4">
                                <ProductFilter filters={filters} handleFilter={handleFilter}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block">
                    <ProductFilter filters={filters} handleFilter={handleFilter}/>
                </div>

                <div className="bg-background w-full rounded-lg shadow-sm">
                    <div className="p-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-bold">All products</h1>
                            <span className='text-muted-foreground text-sm'>
                                {productList?.totalProducts || 0} products
                            </span>
                        </div>
                        
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
                                            className="text-sm"
                                        >
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                        {loading ? (
                            <div className="col-span-full flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        ) : productList?.products?.length > 0 ? (
                            productList.products.map((productItem) => (
                                <ProductCard key={productItem._id} product={productItem}/>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-8">
                                No product found
                            </div>
                        )}
                    </div>

                    {!loading && productList?.totalProducts > 0 && (
                        <PaginationSection
                            totalProducts={productList.totalProducts}
                            productsPerPage={productsPerPage}
                            setCurrentPageNumber={setCurrentPage}
                            currentPage={currentPage}
                            filters={filters}
                            sortOption={sort}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShoppingListing;