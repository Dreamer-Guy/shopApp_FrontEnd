import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearchParams, useLocation } from 'react-router-dom';

const SearchBar = ({ isOpen, onSearch }) => {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    
    useEffect(() => {
        if (!location.pathname.includes('/shop/listing')) {
            setSearchTerm('');
            return;
        }
        
        const searchFromUrl = searchParams.get('search');
        if (searchFromUrl) {
            setSearchTerm(searchFromUrl);
        } else {
            setSearchTerm('');
        }
    }, [searchParams, location.pathname]);
    
    if (!isOpen) return null;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            setSearchTerm('');
            onSearch('');
            return;
        }
        onSearch(searchTerm.trim());
    };
    
    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };
    
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        if (value.trim() === '' && value === '') {
            onSearch('');
        }
    };
    
    return (
        <div className="w-full bg-transparent mx-auto transition-all duration-300">
            <div className="container mx-auto px-4 py-3">
                <form onSubmit={handleSubmit} className="flex h-8 w-1/2 items-center mx-auto space-x-2 bg-gray-100 rounded-full px-4
                    focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-300">
                    <button type="submit">
                        <FaSearch className="text-gray-400" />
                    </button>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search product..."
                        className="flex-1 bg-transparent border-none focus:outline-none h-full"
                        autoFocus
                    />
                    {searchTerm && (
                        <button 
                            type="button"
                            onClick={handleClear}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SearchBar;
