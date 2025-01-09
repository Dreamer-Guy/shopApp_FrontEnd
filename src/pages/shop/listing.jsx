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
import ProductCardSkeleton from "@/components/shop/productCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";


function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    
    for (const [key, value] of Object.entries(filterParams)) {
        if (value) {
            if (Array.isArray(value) && value.length > 0) {
                queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
            } else if (typeof value === 'string' || typeof value === 'number') {
                queryParams.push(`${key}=${encodeURIComponent(value)}`);
            }
        }
    }
    
    return queryParams.join("&");
}

const ShoppingListing = () => {
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.shopProducts);
    const [ sort, setSort ] = useState(() => sessionStorage.getItem('sort') || 'price-desc');
    const [ filters, setFilters ] = useState(() => {
        const savedFilters = sessionStorage.getItem("filters");
        return savedFilters ? JSON.parse(savedFilters) : {};
    });
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ currentPage, setCurrentPage ] = useState(() => {
        const pageFromUrl = searchParams.get('page');
        if (pageFromUrl) {
            return parseInt(pageFromUrl);
        }
        const savedState = sessionStorage.getItem('listingState');
        if (savedState) {
            const { page } = JSON.parse(savedState);
            return page || 1;
        }
        return 1;
    });
    const [ productsPerPage, setProductsPerPage ] = useState(8);
    const [ showFilter, setShowFilter ] = useState(false);
    const [ loading, setLoading ] = useState(true);

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
        const searchTerm = searchParams.get('search');
        if (searchTerm !== null) {
            setFilters(prev => ({
                ...prev,
                search: searchTerm
            }));
            sessionStorage.setItem('filters', JSON.stringify({
                ...filters,
                search: searchTerm
            }));
            
            setCurrentPage(1);
        } else {
            const { search, ...restFilters } = filters;
            setFilters(restFilters);
            sessionStorage.setItem('filters', JSON.stringify(restFilters));
        }
    }, [searchParams]);
    
    
    useEffect(() => {
        const savedFilters = sessionStorage.getItem('filters');
        if (savedFilters) {
            const parsedFilters = JSON.parse(savedFilters);
            setFilters(parsedFilters);
            if (parsedFilters.search) {
                setSearchParams(prev => {
                    prev.set('search', parsedFilters.search);
                    return prev;
                });
            }
        }
    }, []);
    
    
    useEffect(() => {
        setSearchParams(prev => {
            prev.set('page', currentPage);
            return prev;
        });
    }, [currentPage]);
    
    
    useEffect(() => {
        const queryString = createSearchParamsHelper({
            ...filters,
            sort,
            page: currentPage,
            limit: productsPerPage,
        });
        
        // Lưu lại state hiện tại vào sessionStorage
        const currentState = {
            filters,
            sort,
            page: currentPage,
            limit: productsPerPage
        };
        sessionStorage.setItem('listingState', JSON.stringify(currentState));
        
        dispatch(fetchAllFilteredProducts(queryString));
        setLoading(false);
    }, [filters, sort, currentPage]);
    
    
    useEffect(() => {
        const savedState = sessionStorage.getItem('listingState');
        if (savedState) {
            const { filters: savedFilters, sort: savedSort, page: savedPage } = JSON.parse(savedState);
            setFilters(savedFilters);
            setSort(savedSort);
            setCurrentPage(savedPage);
        }
    }, []);
    
    
    const lastPostIndex = currentPage * productsPerPage;
    const firstPostIndex = lastPostIndex - productsPerPage;
    
    
    if (loading) {
        return (
            <div className='container mx-auto px-4'>
                <div className='flex flex-col lg:grid lg:grid-cols-[200px_1fr] gap-6 py-6'>
                    <div className="hidden lg:block">
                        <div className="bg-background rounded-lg shadow-sm p-4">
                            <Skeleton className="h-8 w-3/4 mb-4" />
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-6 w-1/2" />
                                        <div className="space-y-2">
                                            {[1, 2, 3].map((j) => (
                                                <Skeleton key={j} className="h-4 w-3/4" />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-background w-full rounded-lg shadow-sm">
                        <div className="p-4 border-b flex items-center justify-between">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {Array(8).fill(null).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
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
                            Array(8).fill(null).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))
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