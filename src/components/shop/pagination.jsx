import React from 'react'
import { Button } from '../ui/button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { fetchAllFilteredProducts } from '@/store/shop/productSlice/index';

const PaginationSection = ({totalProducts, productsPerPage, setCurrentPageNumber, currentPage, filters, sortOption}) => {
    let pages = [];
    const [inputPage, setInputPage] = useState(currentPage);
    const [isInputVisible, setIsInputVisible] = useState(false);
    const dispatch = useDispatch();
    
    for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); ++i){
        pages.push(i);
    }
    
    
    const handleNextPage = () => {
        if(currentPage < pages.length){
            setCurrentPageNumber(currentPage + 1);
            dispatch(fetchAllFilteredProducts({ 
                filterParams: filters,
                sortParams: sortOption, 
                page: currentPage + 1, 
                rowsPerPage: productsPerPage
            }));
        }
    };
    
    const handlePrevPage = () => {
        if(currentPage > 1){
            setCurrentPageNumber(currentPage - 1);
            dispatch(fetchAllFilteredProducts({ 
                filterParams: filters,
                sortParams: sortOption, 
                page: currentPage - 1, 
                rowsPerPage: productsPerPage
            }));
        }
    };
    
    const handleGoToPage = () => {
        if (inputPage >= 1 && inputPage <= pages.length) {
            setCurrentPageNumber(inputPage);
            setIsInputVisible(false);
            dispatch(fetchAllFilteredProducts({ 
                filterParams: filters,
                sortParams: sortOption, 
                page: inputPage, 
                rowsPerPage: productsPerPage
            }));
        }
    };
    
    const handlePageChange = (event) => {
        const page = parseInt(event.target.value);
        if (page >= 1 && page <= pages.length) {
            setInputPage(page);
        }
    };

    
    const handleInputFocus = () => {
        setIsInputVisible(true); 
    };
    
    return (
        <Pagination className="flex justify-center">
            <PaginationContent className="cursor-pointer">
                <PaginationItem>
                    <PaginationPrevious onClick={handlePrevPage}/>
                </PaginationItem>
                
                <div className="flex items-center space-x-2">
                    <span>Page</span>
                    <span
                    className="cursor-pointer"
                    onClick={handleInputFocus}
                    >
                    {isInputVisible ? (
                        <input
                        type="number"
                        min="1"
                        max={pages.length}
                        value={inputPage}
                        onChange={handlePageChange}
                        onFocus={handleInputFocus}
                        className="w-16 text-center"
                        />
                    ) : (
                        `${currentPage} of ${pages.length}`
                    )}
                    </span>

                    {isInputVisible && (
                    <Button onClick={handleGoToPage}>Go</Button>
                    )}
                </div>
                
                <PaginationItem>
                    <PaginationNext onClick={handleNextPage}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    
    )
}


export default PaginationSection;