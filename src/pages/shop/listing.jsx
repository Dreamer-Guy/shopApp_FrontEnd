import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useLocation } from 'react-router-dom';
import ProductFilter from "@/components/shop/filter"
import ProductCard from "@/components/shop/productCard"
import PaginationSection from '@/components/shop/pagination';
import { fetchAllFilteredProducts } from '@/store/shop/product/index';
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

const LoadingSkeletonView = () => {
    return (
        <div className='container mx-auto px-4'>
            <div className='flex flex-col lg:grid lg:grid-cols-[200px_1fr] gap-6 py-6'>
                {/* Filter Skeleton */}
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

                {/* Products Grid Skeleton */}
                <div className="bg-background w-full rounded-lg shadow-sm">
                    <div className="p-4 border-b">
                        <Skeleton className="h-8 w-32" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-48 w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ShoppingListing = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.shopProducts);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [queryState, setQueryState] = useState(() => {
        const savedState = sessionStorage.getItem('listingState');
        const initialState = savedState ? JSON.parse(savedState) : {
            filters: location.state?.initialFilters || {},
            sort: sessionStorage.getItem('sort') || 'salePrice-desc',
            currentPage: parseInt(searchParams.get('page')) || 1,
            productsPerPage: 8,
            loading: true
        };
        return initialState;
    });

    // Search
    useEffect(() => {
        const searchTerm = searchParams.get('search');
        setQueryState(prev => ({
            ...prev,
            filters: {
                ...prev.filters,
                search: searchTerm || ''
            },
            currentPage: 1,
            loading: true
        }));
    }, [searchParams.get('search')]);

    // Filter
    const handleFilter = (sectionId, option) => {
        setQueryState(prev => {
            const newFilters = { ...prev.filters };
            if (!newFilters[sectionId]) {
                newFilters[sectionId] = [option];
            } else {
                const index = newFilters[sectionId].indexOf(option);
                if (index === -1) {
                    newFilters[sectionId].push(option);
                } else {
                    newFilters[sectionId].splice(index, 1);
                }
                if (newFilters[sectionId].length === 0) {
                    delete newFilters[sectionId];
                }
            }
            return {
                ...prev,
                filters: newFilters,
                currentPage: 1,
                loading: true
            };
        });
    };

    // Sort
    const handleSort = (value) => {
        setQueryState(prev => ({
            ...prev,
            sort: value,
            loading: true
        }));
        sessionStorage.setItem('sort', value);
    };

    // Pagination
    const handlePageChange = (newPage) => {
        setQueryState(prev => ({
            ...prev,
            currentPage: newPage,
            loading: true
        }));
    };

    // Fetch data
    useEffect(() => {
        const timer = setTimeout(() => {
            const queryString = createSearchParamsHelper({
                ...queryState.filters,
                ...(queryState.filters.search && { search: queryState.filters.search }),
                sort: queryState.sort,
                page: queryState.currentPage,
                limit: queryState.productsPerPage
            });
            
            setSearchParams(prev => {
                prev.set('page', queryState.currentPage);
                if (queryState.filters.search) {
                    prev.set('search', queryState.filters.search);
                } else {
                    prev.delete('search');
                }
                return prev;
            });
            
            sessionStorage.setItem('listingState', JSON.stringify(queryState));
            
            dispatch(fetchAllFilteredProducts(queryString))
                .then(() => {
                    setQueryState(prev => ({
                        ...prev,
                        loading: false
                    }));
                });
        }, 300);

        return () => clearTimeout(timer);
    }, [queryState.filters, queryState.sort, queryState.currentPage]);

    useEffect(() => {
        return () => {
            if (!location.state?.keepFilters) {
                sessionStorage.removeItem('listingState');
            }
        };
    }, []);

    const handleClearFilter = () => {
        setQueryState(prev => ({
            ...prev,
            filters: {},
            currentPage: 1,
            loading: true
        }));
    };

    const [showMobileFilter, setShowMobileFilter] = useState(false);

    if (queryState.loading) {
        return <LoadingSkeletonView />;
    }

    return (
        <div className='container mx-auto px-4'>
            <div className='flex flex-col lg:grid lg:grid-cols-[200px_1fr] gap-6 py-6'>
                {/* Mobile */}
                <div className={`lg:hidden ${showMobileFilter ? 'block' : 'hidden'} mb-4`}>
                    <ProductFilter 
                        filters={queryState.filters} 
                        handleFilter={handleFilter}
                        handleClearFilter={handleClearFilter}
                    />
                </div>

                {/* Desktop */}
                <div className="hidden lg:block">
                    <ProductFilter 
                        filters={queryState.filters} 
                        handleFilter={handleFilter}
                        handleClearFilter={handleClearFilter}
                    />
                </div>

                <div className="bg-background w-full rounded-lg shadow-sm">
                    <div className="p-4 border-b">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold">All products</h1>
                                <span className='text-muted-foreground text-sm'>
                                    {productList?.totalProducts || 0} products
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                                    className="lg:hidden"
                                >
                                    <FilterIcon className="w-4 h-4 mr-2"/>
                                    Filters
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <ArrowUpDownIcon className="w-4 h-4 mr-2"/>
                                            Sort by
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuRadioGroup 
                                            value={queryState.sort} 
                                            onValueChange={handleSort}
                                        >
                                            {sortOptions.map((option) => (
                                                <DropdownMenuRadioItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.label}
                                                </DropdownMenuRadioItem>
                                            ))}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                        {productList?.products?.length > 0 ? (
                            productList.products.map((product) => (
                                <ProductCard 
                                    key={product._id} 
                                    product={product}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-8">
                                No products found
                            </div>
                        )}
                    </div>

                    {productList?.totalProducts > 0 && (
                        <PaginationSection
                            totalProducts={productList.totalProducts}
                            productsPerPage={queryState.productsPerPage}
                            setCurrentPageNumber={handlePageChange}
                            currentPage={queryState.currentPage}
                            filters={queryState.filters}
                            sortOption={queryState.sort}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingListing;